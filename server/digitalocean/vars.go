package digitalocean

import (
	"golang.org/x/oauth2"

	"github.com/digitalocean/godo"
)

type TokenSource struct {
	AccessToken string
}

func (t *TokenSource) Token() (*oauth2.Token, error) {
	token := &oauth2.Token{
		AccessToken: t.AccessToken,
	}
	return token, nil
}

var currTokenSource TokenSource

var client *godo.Client
