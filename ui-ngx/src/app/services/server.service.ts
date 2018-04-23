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

      // if( namesArr.length == 9) {
      //   this.sendRequest(namesArr.slice(), serverVO);
      //   namesArr.length = 0;
      // }else {
      //   namesArr.push(`${serverVO.name}-${i+1}`);
      // }

      namesArr.push(`${serverVO.name}-${i+1}`);
      this.sendRequest(namesArr.slice(), serverVO);
      namesArr.length = 0;

    }



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
      "user_data": this.getStartScript(serverVO, names[0]),
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




  getStartScript(serverVO:ServerVO, serverName: String): string {


    let startScript: string = `#!/bin/bash

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Starting setup' ${serverVO.callbackUrl}/api/node/v1/log

#--------------------------------------------------------------------------------
# Add user and group first to make sure their IDs get assigned consistently,
# regardless of whatever dependencies get added
#--------------------------------------------------------------------------------

groupadd -g 1000 navcoin
useradd -u 1000 -g navcoin -s /bin/bash -m -d /navcoin navcoin

#--------------------------------------------------------------------------------
# Installing packages
#--------------------------------------------------------------------------------
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Installing packages' ${serverVO.callbackUrl}/api/node/v1/log

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

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Package install complete' ${serverVO.callbackUrl}/api/node/v1/log

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Enabling ports' ${serverVO.callbackUrl}/api/node/v1/log
ufw allow 22
ufw allow 44444
ufw allow 44445
ufw allow 44446
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Ports enabled' ${serverVO.callbackUrl}/api/node/v1/log


#--------------------------------------------------------------------------------
# Install gosu
#--------------------------------------------------------------------------------
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Install gosu' ${serverVO.callbackUrl}/api/node/v1/log

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

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Build + install Berkeley DB' ${serverVO.callbackUrl}/api/node/v1/log

BDB_URL="http://download.oracle.com/berkeley-db"
BDB_VER="db-4.8.30.NC"
BDB_PKG="db-4.8.30.NC.tar.gz"
BDB_CHK="12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef"
BDB_DIR="/usr/local/berkeley-db-4.8"
CONFIGURE_FLAGS

mkdir temp
cd temp

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Downloading db-4.8.30.NC' ${serverVO.callbackUrl}/api/node/v1/log

mkdir -p /usr/local/berkeley-db-4.8
wget "http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz" -q

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Downloaded db-4.8.30.NC' ${serverVO.callbackUrl}/api/node/v1/log

echo "12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz" | sha256sum -c
tar -xzf db-4.8.30.NC.tar.gz

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Configuring db-4.8.30.NC' ${serverVO.callbackUrl}/api/node/v1/log

cd db-4.8.30.NC/build_unix/
../dist/configure --enable-cxx \\
                      --disable-shared \\
                      --with-pic \\
                      --prefix=/usr/local/berkeley-db-4.8
                      
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Installing db-4.8.30.NC' ${serverVO.callbackUrl}/api/node/v1/log
make install
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Berkeley DB Install complete' ${serverVO.callbackUrl}/api/node/v1/log



# -----------------------------------------------
# Build the run.sh file
#------------------------------------------------
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Generating run.sh' ${serverVO.callbackUrl}/api/node/v1/log

cd /
cat <<EOT >> run.sh

cd /

sleep 120
curl -X POST -H 'Content-Type: application/json' -d "${serverName}: About to clone" ${serverVO.callbackUrl}/api/node/v1/log

git clone -b v4.1.2-devnet https://github.com/NAVCoin/navcoin-core.git

curl -X POST -H 'Content-Type: application/json' -d "${serverName}: Clone complete" ${serverVO.callbackUrl}/api/node/v1/log

cd /navcoin-core

curl -X POST -H 'Content-Type: application/json' -d "${serverName}: cd to navcoin-core" ${serverVO.callbackUrl}/api/node/v1/log

./autogen.sh
curl -X POST -H 'Content-Type: application/json' -d "${serverName} Ran navcoin autogen" ${serverVO.callbackUrl}/api/node/v1/log

./configure LDFLAGS="-L/usr/local/berkeley-db-4.8/lib/" \\
                CPPFLAGS="-I /usr/local/berkeley-db-4.8/include/" \\
                --enable-hardening \\
                --without-gui \\
                --enable-upnp-default

sleep 120
curl -X POST -H 'Content-Type: application/json' -d "${serverName}: About to Make" ${serverVO.callbackUrl}/api/node/v1/log

ls
make

curl -X POST -H 'Content-Type: application/json' -d "${serverName}: Make Complete" ${serverVO.callbackUrl}/api/node/v1/log
make install
curl -X POST -H 'Content-Type: application/json' -d "${serverName}: Install Complete" ${serverVO.callbackUrl}/api/node/v1/log

ls
cd ..

rm -fr /navcoin-core/*
rm -r /navcoin-core/

curl -X POST -H 'Content-Type: application/json' -d "${serverName}: rm navcoin-src Complete" ${serverVO.callbackUrl}/api/node/v1/log


navcoind -devnet -rpcuser=hi -rpcpassword=pass &
curl -X POST -H 'Content-Type: application/json' -d "${serverName}: Start navcoin core Complete" ${serverVO.callbackUrl}/api/node/v1/log


#curl -X POST -H 'Content-Type: application/json' -d "${serverName}: Sleeping" ${serverVO.callbackUrl}/api/node/v1/log
#sleep 5
#curl -X POST -H 'Content-Type: application/json' -d "${serverName}: awake" ${serverVO.callbackUrl}/api/node/v1/log

#navcoin-cli -testnet -rpcuser=hi -rpcpassword=pass addnode "176.9.19.245" "add"
#navcoin-cli -testnet -rpcuser=hi -rpcpassword=pass addnode "46.4.24.136" "add"

#curl -X POST -H 'Content-Type: application/json' -d "${serverName}: Add nodes complete" ${serverVO.callbackUrl}/api/node/v1/log


OUTPUT="$(navcoin-cli -testnet -staking -rpcuser=hi -rpcpassword=pass listreceivedbyaddress 0 true)"
echo "%OUTPUT%"

sleep 120
curl -X POST -H 'Content-Type: application/json' -d "${serverName}:%OUTPUT%" ${serverVO.callbackUrl}/api/node/v1/log

sleep 9999999999
EOT


chmod +x run.sh
./run.sh

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Server setup complete' ${serverVO.callbackUrl}/api/node/v1/log


  `;

    return startScript.replace('%OUTPUT%', '${OUTPUT}');
  }



}
