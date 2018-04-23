package main

import (
	"log"
	"fmt"
	"runtime"
	"os"
	"github.com/gorilla/mux"
	"net/http"
	"github.com/patrickmn/go-cache"
	"time"
)

func main() {
	// log out server runtime OS and Architecture
	log.Println(fmt.Sprintf("Server running in %s:%s", runtime.GOOS, runtime.GOARCH))
	log.Println(fmt.Sprintf("App pid : %d.", os.Getpid()))

	// setup the router and the api
	router := mux.NewRouter()

	// load up the cache system
	c := cache.New(cache.NoExpiration, 10*time.Minute)


	// Start http server
	port := fmt.Sprintf(":%d", 9000)
	http.ListenAndServe(port, router)
}
