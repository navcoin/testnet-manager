package nodes

import (
	"github.com/gorilla/mux"
	"net/http"
	"log"
	"encoding/json"
	"github.com/NAVCoin/testnet-manager-api/digitalocean"
	"github.com/digitalocean/godo"
)

type DropletCreateRequest struct {
	Token			  string 				`json:"token"`
	Name              string                `json:"name"`
	Region            string                `json:"region"`
	Size              string                `json:"size"`
	Image             godo.DropletCreateImage    `json:"image"`
	SSHKeys           []godo.DropletCreateSSHKey `json:"ssh_keys"`
	Backups           bool                  `json:"backups"`
	IPv6              bool                  `json:"ipv6"`
	PrivateNetworking bool                  `json:"private_networking"`
	Monitoring        bool                  `json:"monitoring"`
	UserData          string                `json:"user_data,omitempty"`
	Volumes           []godo.DropletCreateVolume `json:"volumes,omitempty"`
	Tags              []string              `json:"tags"`
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

}




func createDroplets() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		var createDroplet DropletCreateRequest

		// get the json from the post data
		err := json.NewDecoder(r.Body).Decode(&createDroplet)

		if err != nil {

		}

		createDroplet.UserData = "curl -X POST -H 'Content-Type: application/json' -d \"Run From Manager\" https://webhook.site/eeb8307f-67ce-460b-9a87-24f9f7575d48"




		digitalocean.CreateDroplet(createDroplet.Token)


	})
}



// protectUIHandler takes the api response and checks username and password
func nodeCallBackHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		log.Println("here")

	})
}

