package nodes

import (
	"github.com/gorilla/mux"
	"net/http"
	"log"
	"encoding/json"
	"github.com/NAVCoin/testnet-manager-api/digitalocean"
	"github.com/digitalocean/godo"
)


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


// DropletMultiCreateRequest is a request to create multiple Droplets.
type DropletMultiCreateRequest struct {
	Names             []string              `json:"names"`
	Region            string                `json:"region"`
	Size              string                `json:"size"`
	Image             string    `json:"image"`
	Backups           bool                  `json:"backups"`
	IPv6              bool                  `json:"ipv6"`
	PrivateNetworking bool                  `json:"private_networking"`
	Monitoring        bool                  `json:"monitoring"`
	UserData          string                `json:"user_data,omitempty"`
	Tags              []string              `json:"tags"`
}



func createDroplets() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		token := r.Header.Get("token")

		createDroplet := DropletMultiCreateRequest{}

		// get the json from the post data
		err := json.NewDecoder(r.Body).Decode(&createDroplet)



		dropReq := godo.DropletMultiCreateRequest{}

		dropReq.Names = createDroplet.Names
		dropReq.UserData = createDroplet.UserData
		dropReq.Region = createDroplet.Region
		dropReq.Size = createDroplet.Size
		dropReq.Backups = createDroplet.Backups
		dropReq.IPv6 = createDroplet.IPv6
		dropReq.PrivateNetworking = createDroplet.PrivateNetworking
		dropReq.Tags = createDroplet.Tags
		dropReq.UserData = createDroplet.UserData

		dropReq.Image = godo.DropletCreateImage{}
		dropReq.Image.Slug = createDroplet.Image


		if err != nil {
			log.Println(err.Error())
		}





		digitalocean.CreateDroplet(token, &dropReq)


	})
}



// protectUIHandler takes the api response and checks username and password
func nodeCallBackHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		log.Println("here")

	})
}

