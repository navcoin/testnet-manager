package digitalocean

import (
	"golang.org/x/oauth2"
	"github.com/digitalocean/godo"
	"fmt"
	"github.com/digitalocean/godo/context"
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
