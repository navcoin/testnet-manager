package nodes

import (
	"github.com/gorilla/mux"
	"net/http"
	"log"
	"encoding/json"
	"github.com/NAVCoin/testnet-manager/server/digitalocean"
	"github.com/digitalocean/godo"
	"time"
	"bytes"

	"io/ioutil"
	"strings"
	"fmt"
)



// Response is the generic resp that will be used for the api
type Response struct {
	Data   interface{} `json:"data,omitempty"`
	Meta   interface{} `json:"meta,omitempty"`
	Errors []errorCode `json:"errors,omitempty"`
}

// Send marshal the response and write value
func (i *Response) Send(w http.ResponseWriter) {
	jsonValue, _ := json.Marshal(i)
	w.Write(jsonValue)
}

type errorCode struct {
	Code         string `json:"code,omitempty"`
	ErrorMessage string `json:"errorMessage,omitempty"`
}



type createDroplet struct {
	Names []string `json:"names"`
	RepoURL string `json:"repoURL"`
	RepoBranch string `json:"repoBranch"`
	CallBackURL string `json:"callBackURL"`
	Token string `json:"token"`
	UserData string `json:"userData"`
}


// InitSetupHandlers sets the api
func InitSetupHandlers(r *mux.Router, prefix string) {

	// setup namespace
	namespace := "node"

	// login route - takes the username, password and retruns a jwt
	callbackPath := RouteBuilder(prefix, namespace, "v1", "log")
	OpenRouteHandler(callbackPath, r, nodeCallBackHandler())

	createDroplet := RouteBuilder(prefix, namespace, "v1", "create")
	OpenRouteHandler(createDroplet, r, createDroplets())

	getRunSh := RouteBuilder(prefix, namespace, "v1", "{dropletname}/runfile")
	OpenRouteHandler(getRunSh, r, getRunFileHandler())

	getActiveNodesPath := RouteBuilder(prefix, namespace, "v1", "all/data")
	OpenRouteHandler(getActiveNodesPath, r, getActiveNodesHandler())

}

func getActiveNodesHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		appResp := Response{}
		appResp.Data = ActiveDropletsData
		appResp.Send(w)
	})
}

func getRunFileHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		vars := mux.Vars(r)

		dropletName := vars["dropletname"]

		dropletData := getDataByDropletName(dropletName)

		// build the runfile for the box
		runsh := runFile
		runsh = strings.Replace(runsh, "%dropletname%", dropletName, -1)
		runsh = strings.Replace(runsh, "%callback%", dropletData.CallBackURL, -1)
		runsh = strings.Replace(runsh, "%repoURL%", dropletData.RepoURL, -1)
		runsh = strings.Replace(runsh, "%repoBranch%", dropletData.RepoBranch, -1)


		// ServeContent uses the name for mime detection
		const name = "run"
		modtime := time.Now()

		// tell the browser the returned content should be downloaded
		w.Header().Set("Content-Disposition", "Attachment; filename=run.sh")
		http.ServeContent(w, r, name, modtime, bytes.NewReader([]byte(runsh)))


	})


}


func createDroplets() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {



		createDroplet := createDroplet{}

		// get the json from the post data
		err := json.NewDecoder(r.Body).Decode(&createDroplet)

		token := createDroplet.Token

		dropReq := godo.DropletMultiCreateRequest{}

		dropReq.Names = createDroplet.Names
		dropReq.UserData = createDroplet.UserData
		dropReq.Region = "nyc3"
		dropReq.Size = "s-1vcpu-2gb"
		dropReq.Backups = false
		dropReq.IPv6 = true
		dropReq.UserData = createDroplet.UserData

		dropReq.Image = godo.DropletCreateImage{}
		dropReq.Image.Slug = "ubuntu-16-04-x64"


		if err != nil {
			log.Println(err.Error())
		}


		newDroplets, _ := digitalocean.CreateDroplet(token, &dropReq)


		// Store all the current droplet info
		newDropletData := DropletData{}
		newDropletData.CallBackURL = createDroplet.CallBackURL
		newDropletData.Name = createDroplet.Names[0]
		newDropletData.InitialData = newDroplets[0]
		newDropletData.RepoURL = createDroplet.RepoURL
		newDropletData.RepoBranch = createDroplet.RepoBranch

		newDropletData.Logs = []string{}

		updateDropletData(newDropletData)



	})
}



// protectUIHandler takes the api response and checks username and password
func nodeCallBackHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		bodyBytes, _ := ioutil.ReadAll(r.Body)
		bodyString := string(bodyBytes)

		logData := strings.Split(bodyString, ":")

		dropletData := getDataByDropletName(logData[0])

		logStr := fmt.Sprintf("%s %s", time.Now().Format("2006/01/01 15:04:05"), logData[1])

		dropletData.Logs = append(dropletData.Logs, logStr )

		updateDropletData(dropletData)


		log.Println(bodyString)

	})
}

