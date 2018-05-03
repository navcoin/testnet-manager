package nodes

import (
	"io/ioutil"
	"encoding/json"
	"log"
	"bytes"
	"github.com/digitalocean/godo"
)

var ActiveDropletsData = []DropletData{}




type NodeAddressInfo struct {
	Name string `json:"name"`
	Address string `json:"address"`
	DropletID int `json:"dropletId"`
}


type DropletData struct {
	Name               string         `json:"name"`
	InitialData        godo.Droplet   `json:"initialData"`
	CurrentDropletData interface{}    `json:"currentDropletData"`
	Logs               []string       `json:"logs"`
	RepoBranch         string         `json:"repoBranch"`
	RepoURL            string         `json:"repoURL"`
	CallBackURL        string         `json:"callBackURL"`
	Addresses			[]ReceiveAdd `json:"addresses"`
}



type ReceiveAdd struct {

	Account       string        `json:"account"`
	Address       string        `json:"address"`
	Amount        float64           `json:"amount"`
	Confirmations int           `json:"confirmations"`
	Label         string        `json:"label"`
	Txids         []interface{} `json:"txids"`

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

func remove(numbers []int, search int) []int {
	result := []int{}
	for _, num := range numbers {
		if num != search {
			result = append(result, num)
		}
	}
	return result
}

func removeDropletById(id int) {


	arr := []DropletData{}

	for _, dd := range ActiveDropletsData {
		if dd.InitialData.ID != id {
			arr = append(arr, dd)
		}
	}

	ActiveDropletsData = arr


}


func getDataByDropletId(id int) (DropletData)  {

	dd := DropletData{}

	for _, dropletData := range ActiveDropletsData {

		if dropletData.InitialData.ID == id {
			dd = dropletData
		}
	}

	return dd

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


func  getAllAddresses() []NodeAddressInfo {

	otherNodes := []NodeAddressInfo{}

	for _, dd := range ActiveDropletsData {

		if len(dd.Addresses) != 0 {
			n := NodeAddressInfo{}
			n.DropletID = dd.InitialData.ID
			n.Name = dd.Name
			n.Address = string(dd.Addresses[0].Address)

			otherNodes = append(otherNodes, n)
		}

	}

	return otherNodes

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
