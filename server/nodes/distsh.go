package nodes

import (
	"math/rand"
	"strconv"
)



	// Seed should be set once, better spot is func init()



func randInt(min int, max int) int {
	return min + rand.Intn(max-min)
}


func buildDistCoinBash() string {


	n := getAllAddresses()


	arrs := `while :
do


`

	for _, naim := range n {
		//if i == 0 {
		//	arrs = arrs +  `"`+ naim.Address + `"`
		//} else {
		//	arrs = arrs +  `, "` + naim.Address + `"`
		//}

		arrs = arrs + `
navcoin-cli -devnet -rpcuser=hi -rpcpassword=pass sendtoaddress "`+ naim.Address + `" `+ strconv.Itoa(randInt(1, 50)) +`
sleep 1

`

	}


	arrs = arrs + `
echo "all sent"
done`

	//
	//distshStr := distsh
	//
	//distshStr = strings.Replace(distshStr, "%arrEL%", arrs, -1)
	//
	//
	//log.Println(arrs)


	return arrs

}

var distsh = ``


//var distsh = `
//
//## declare an array variable
//arr=(%arrEL%)
//
//## now loop through the above array
//for i in "${arr[@]}"
//do
//
//
// 	navcoin-cli -devnet -rpcuser=hi -rpcpassword=pass sendtoaddress "${i}" 1000
//	sleep 5
//   # or do whatever with individual element of the array
//done
//
//exit 0
//
//`