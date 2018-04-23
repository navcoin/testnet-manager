package server

import (
	"log"
	"fmt"
	"runtime"
	"os"
	"github.com/gorilla/mux"
	"net/http"
	"github.com/NAVCoin/testnet-manager-api/server/nodes"
)

func main() {
	// log out server runtime OS and Architecture
	log.Println(fmt.Sprintf("Server running in %s:%s", runtime.GOOS, runtime.GOARCH))
	log.Println(fmt.Sprintf("App pid : %d.", os.Getpid()))

	// setup the router and the api
	router := mux.NewRouter()

	// load up the cache system
	//c := cache.New(cache.NoExpiration, 10*time.Minute)

	nodes.InitSetupHandlers(router, "api")

	// Start http server
	port := fmt.Sprintf(":%d", 5000)
	log.Fatal(http.ListenAndServe(port, router))
}
