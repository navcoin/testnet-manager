package nodes

import (
	"io/ioutil"
	"encoding/json"
	"log"
)

type ActiveDroplets struct {

	droplets []DropletData `json:"ActiveDroplets"`
}

type DropletData struct {
	Name string `json:"name"`
	InitialData interface{} `json:"initialData"`
	Logs []string `json:"logs"`
	CurrentBranch string `json:"currentBranch"`
	CallBackURL string `json:"callBackURL"`
}


var ActiveDropletsData ActiveDroplets


func writeDropletData () {

	rankingsJson, _ := json.Marshal(ActiveDropletsData)
	err := ioutil.WriteFile("dropletData.json", rankingsJson, 0644)

	if err != nil {
 		log.Println(err)
	}
}

