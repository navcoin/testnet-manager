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
)




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


	getRunSh := RouteBuilder(prefix, namespace, "v1", "runfile")
	OpenRouteHandler(getRunSh, r, getRunFileHandler())

}

func getRunFileHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// ServeContent uses the name for mime detection
		const name = "run"
		modtime := time.Now()

		// tell the browser the returned content should be downloaded
		w.Header().Set("Content-Disposition", "Attachment; filename=run.sh")
		http.ServeContent(w, r, name, modtime, bytes.NewReader([]byte(runFile)))


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


		newDropletData := DropletData{}
		newDropletData.CallBackURL = createDroplet.CallBackURL
		newDropletData.Name = createDroplet.Names[0]
		newDropletData.InitialData = newDroplets[0]

		log.Println(newDropletData.Name)

		ActiveDropletsData = append(ActiveDropletsData, newDropletData)

		rankingsJson, _ := json.Marshal(newDropletData)

		log.Println(rankingsJson)

		writeDropletData()


	})
}



// protectUIHandler takes the api response and checks username and password
func nodeCallBackHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		bodyBytes, _ := ioutil.ReadAll(r.Body)
		bodyString := string(bodyBytes)

		log.Println(bodyString)

	})
}

