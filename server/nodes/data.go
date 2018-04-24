package nodes

import (
	"io/ioutil"
	"encoding/json"
	"log"
)

var ActiveDropletsData = []DropletData{}

type DropletData struct {
	Name string `json:"name"`
	InitialData interface{} `json:"initialData"`
	Logs []string `json:"logs"`
	CurrentBranch string `json:"currentBranch"`
	CallBackURL string `json:"callBackURL"`
}



func writeDropletData () {

	rankingsJson, _ := json.Marshal(ActiveDropletsData)
	err := ioutil.WriteFile("dropletData.json", rankingsJson, 0644)

	if err != nil {
 		log.Println(err)
	}
}

