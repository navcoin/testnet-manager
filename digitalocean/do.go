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



func CreateDroplet (token string) (*godo.Droplet, error)  {
	dropletName := "super-cool-droplet"

	createRequest := &godo.DropletCreateRequest{
		Name:   dropletName,
		Region: "nyc3",
		Size:   "s-1vcpu-1gb",
		Image: godo.DropletCreateImage{
			Slug: "ubuntu-14-04-x64",
		},
	}

	ctx := context.TODO()

	// get the the godo client
	client := getClient(token)

	newDroplet, _, err := client.Droplets.Create(ctx, createRequest)

	if err != nil {
		fmt.Printf("Something bad happened: %s\n\n", err)
		return nil, err
	}

	return newDroplet, nil
}
