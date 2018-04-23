package nodes

import (
	"fmt"
	"log"
	"github.com/gorilla/mux"
	"net/http"
	"github.com/NAVCoin/testnet-manager-api/middleware"
)

func RouteBuilder(prefix string, namespace string, version string, method string) string {
route := fmt.Sprintf("/%s/%s/%s/%s", prefix, namespace, version, method)
log.Println(route)
return route
}

func OpenRouteHandler(path string, r *mux.Router,  f http.Handler) {
r.Handle(path, middleware.Adapt(f, middleware.CORSHandler()))
}
