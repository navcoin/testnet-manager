package nodes

import (
	"math/rand"
	"strings"
)



	// Seed should be set once, better spot is func init()



func randInt(min int, max int) int {
	return min + rand.Intn(max-min)
}


func Shuffle(slc []NodeAddressInfo) {
	N := len(slc)
	for i := 0; i < N; i++ {
		// choose index uniformly in [i, N-1]
		r := i + rand.Intn(N-i)
		slc[r], slc[i] = slc[i], slc[r]
	}
}

func buildDistCoinBash() string {


	n := getAllAddresses()
	Shuffle(n)

	arrs := `while :
do


`

	for _, naim := range n {
		//if i == 0 {
		//	arrs = arrs +  `"`+ naim.Address + `"`
		//} else {
		//	arrs = arrs +  `, "` + naim.Address + `"`
		//}

		if ! strings.Contains(naim.Name, "stake") {

			arrs = arrs + `
navcoin-cli -devnet -rpcuser=hi -rpcpassword=pass sendtoaddress "`+ naim.Address + `" 10000
sleep 1

`
			
		}



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