import { Injectable } from '@angular/core';
import {ServerVO} from "./server.vo";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ServerService {

  constructor(
    private _http: HttpClient
  ) { }


  createServers(serverVO: ServerVO) {


    let namesArr: string[] = [];
    for (let i:number = 0; i < serverVO.servers; i++) {

      if( namesArr.length == 9) {
        this.sendRequest(namesArr.slice(), serverVO);
        namesArr.length = 0;
      }else {
        namesArr.push(`${serverVO.name}-${i+1}`);
      }

    }

    this.sendRequest(namesArr.slice(), serverVO);

  }

  sendRequest(names: string[], serverVO: ServerVO) {

    let d = {
      "names": names,
      "region": "nyc3",
      "size": "s-1vcpu-2gb",
      "image": "ubuntu-16-04-x64",
      "ssh_keys": null,
      "backups": false,
      "ipv6": true,
      "user_data": this.getStartScript(serverVO),
      "private_networking": null,
      "volumes": null,
      "tags": [
        "devnet"
      ]
    };


    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${serverVO.token}`);

    this._http.post("https://api.digitalocean.com/v2/droplets", d, {headers}).toPromise()
      .catch((e) => {
        debugger
        console.log(e);

      });

  }




  getStartScript(serverVO:ServerVO): string {


    let startScript: string = `#!/bin/bash

curl -X POST -H 'Content-Type: application/json' -d 'CALL START' https://webhook.site/eeb8307f-67ce-460b-9a87-24f9f7575d48
#--------------------------------------------------------------------------------
# Add user and group first to make sure their IDs get assigned consistently,
# regardless of whatever dependencies get added
#--------------------------------------------------------------------------------

groupadd -g 1000 navcoin
useradd -u 1000 -g navcoin -s /bin/bash -m -d /navcoin navcoin

#--------------------------------------------------------------------------------
# Installing packages
#--------------------------------------------------------------------------------
apt-get update
apt-get install -yq --no-install-recommends build-essential
apt-get install -yq --no-install-recommends libcurl3-dev
apt-get install -yq --no-install-recommends libtool
apt-get install -yq --no-install-recommends autotools-dev
apt-get install -yq --no-install-recommends automake
apt-get install -yq --no-install-recommends pkg-config
apt-get install -yq --no-install-recommends libssl-dev
apt-get install -yq --no-install-recommends libevent-dev
apt-get install -yq --no-install-recommends bsdmainutils
apt-get install -yq --no-install-recommends libzmq3-dev
apt-get install -yq --no-install-recommends libqrencode-dev
apt-get install -yq --no-install-recommends qrencode
apt-get install -yq --no-install-recommends wget
apt-get install -yq --no-install-recommends curl
apt-get install -yq --no-install-recommends libboost-system-dev
apt-get install -yq --no-install-recommends libboost-filesystem-dev
apt-get install -yq --no-install-recommends libboost-chrono-dev
apt-get install -yq --no-install-recommends libboost-program-options-dev
apt-get install -yq --no-install-recommends libboost-test-dev
apt-get install -yq --no-install-recommends libboost-thread-dev
apt-get install -yq --no-install-recommends libminiupnpc-dev
apt-get install -yq --no-install-recommends ca-certificates	
apt-get install -yq --no-install-recommends libunbound-dev
apt-get install -yq --no-install-recommends git
apt-get install -yq --no-install-recommends  dos2unix
apt-get clean
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


ufw allow 22
ufw allow 44444
ufw allow 44445
ufw allow 44446

sleep 5

#--------------------------------------------------------------------------------
# Install gosu
#--------------------------------------------------------------------------------
GOSU_URL= "https://github.com/tianon/gosu/releases/download/"
GOSU_VER= "1.9"

gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
curl -o /usr/local/bin/gosu -fSL https://github.com/tianon/gosu/releases/download/1.9/gosu-$(dpkg --print-architecture)
curl -o /usr/local/bin/gosu.asc -fSL https://github.com/tianon/gosu/releases/download/1.9/gosu-$(dpkg --print-architecture).asc
gpg --verify /usr/local/bin/gosu.asc
rm /usr/local/bin/gosu.asc
chmod +x /usr/local/bin/gosu

#--------------------------------------------------------------------------------
# Build + install Berkeley DB
#--------------------------------------------------------------------------------
BDB_URL="http://download.oracle.com/berkeley-db"
BDB_VER="db-4.8.30.NC"
BDB_PKG="db-4.8.30.NC.tar.gz"
BDB_CHK="12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef"
BDB_DIR="/usr/local/berkeley-db-4.8"
CONFIGURE_FLAGS



mkdir temp
cd temp

mkdir -p /usr/local/berkeley-db-4.8
wget "http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz" -q
echo "12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef  db-4.8.30.NC.tar.gz}" | sha256sum -c
tar -xzf db-4.8.30.NC.tar.gz

cd db-4.8.30.NC/build_unix/
../dist/configure --enable-cxx \\
                      --disable-shared \\
                      --with-pic \\
                      --prefix=/usr/local/berkeley-db-4.8
make install


#--------------------------------------------------------------------------------
# Copy files
#--------------------------------------------------------------------------------
#ADD ./conf/apache2.conf /etc/apache2/
#ADD ./conf/navpi.conf /etc/apache2/sites-available/
#ADD ./bin /usr/local/bin
#ADD docker-entrypoint.sh /usr/local/bin/docker-entrypoint

#--------------------------------------------------------------------------------
## Create ssl certificate
#--------------------------------------------------------------------------------
#mkdir /etc/apache2/ssl && cd /etc/apache2/ssl
#openssl genrsa -des3 -passout pass:x -out tmp-navpi-ssl.key 2048
#openssl rsa -passin pass:x -in tmp-navpi-ssl.key -out navpi-ssl.key
#openssl req -new -key navpi-ssl.key -out navpi-ssl.csr -subj "/C=NZ/ST=Auckland/L=Auckland/O=Nav Coin/OU=Nav Pi/CN=my.navpi.org"
#openssl x509 -req -days 365 -in navpi-ssl.csr -signkey navpi-ssl.key -out navpi-ssl.crt
#rm tmp-navpi-ssl.key navpi-ssl.csr

#--------------------------------------------------------------------------------
## Enable apache modules and site
#--------------------------------------------------------------------------------
#a2enmod rewrite && a2enmod php5 && a2enmod ssl
#a2ensite navpi.conf && a2dissite 000-default.conf
  
  `;

    return startScript;
  }



}
