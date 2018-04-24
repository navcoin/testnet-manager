package nodes

import (
	"io/ioutil"
	"encoding/json"
	"log"
	"bytes"
)

var ActiveDropletsData = []DropletData{}



type DropletData struct {
	Name               string      `json:"name"`
	InitialData        interface{} `json:"initialData"`
	CurrentDropletData interface{} `json:"currentDropletData"`
	Logs               []string    `json:"logs"`
	ReporBranch        string      `json:"currentBranch"`
	RepoURL            string      `json:"gitURL"`
	CallBackURL        string      `json:"callBackURL"`
}


func InitData () {
	loadDropletData()
}



func writeDropletData () {

	rankingsJson, _ := json.Marshal(ActiveDropletsData)
	err := ioutil.WriteFile("dropletData.json", rankingsJson, 0644)

	if err != nil {
 		log.Println(err)
	}
}

func loadDropletData()  {
	readData, _ := ioutil.ReadFile("dropletData.json")

	r := bytes.NewReader(readData)
	json.NewDecoder(r).Decode(&ActiveDropletsData)

}

func getDataByDropletName(name string) (DropletData)  {

	dd := DropletData{}

	for _, dropletData := range ActiveDropletsData {

		if dropletData.Name == name {
			dd = dropletData
		}
	}

	return dd

}

// this updates the droplet data based on name
// if it cant find the info it adds it to the data
// and the saves it to disk
func updateDropletData(drpltData DropletData)  {

	foundAt := -1

	for i, dd := range ActiveDropletsData {
		if dd.Name == drpltData.Name {
			foundAt = i
		}
 	}

 	// check if we have found it
	if foundAt == -1 {
		// if its new we append it to the data
		ActiveDropletsData = append(ActiveDropletsData, drpltData)
	} else {
		ActiveDropletsData[foundAt] = drpltData
	}

	writeDropletData()

}
