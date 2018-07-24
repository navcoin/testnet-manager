package digitalocean

import (
	"golang.org/x/oauth2"
	"github.com/digitalocean/godo"
	"fmt"
	"log"
	"io/ioutil"
	"context"
)




func getClient(token string) (*godo.Client) {

	c := client

	if currTokenSource.AccessToken != token {

		currTokenSource = TokenSource{}
		currTokenSource.AccessToken = token

		tokenSource := &TokenSource{
			AccessToken: token,
		}

		oauthClient := oauth2.NewClient(context.Background(), tokenSource)
		client = godo.NewClient(oauthClient)
		c = client
	}

	return c

}

func RestartDroplet(token string, dropletID int)  {

	ctx := context.TODO()

	// get the the godo client
	client := getClient(token)


	_, resp, err := client.DropletActions.Reboot(ctx, dropletID)



	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	bodyString := string(bodyBytes)

	log.Println(bodyString)
	log.Println(resp.Status)

	if err != nil {
		fmt.Printf("Something bad happened: %s\n\n", err)

	}



}



func CreateDroplet (token string, dropletReq *godo.DropletMultiCreateRequest) ([]godo.Droplet, error)  {

	ctx := context.TODO()

	// get the the godo client
	client := getClient(token)

	newDroplets, _, err := client.Droplets.CreateMultiple(ctx, dropletReq)

	if err != nil {
		fmt.Printf("Something bad happened: %s\n\n", err)
		return nil, err
	}

	return newDroplets, nil
}


func DeleteDroplet(token string, id int) {

	ctx := context.TODO()

	// get the the godo client
	client := getClient(token)

	_, err := client.Droplets.Delete(ctx, id)

	if err != nil {
		fmt.Printf("Something bad happened: %s\n\n", err)

	}


}
