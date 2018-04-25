import { Injectable } from '@angular/core';
import {ServerVO} from "./server.vo";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {dropletDataParser} from "./droplet-data.parser";
import {DataService} from "../data/data.service";
import {DropletModel} from "./droplet-model";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {LocalStorageService} from "../local-storage/local-storage.service";

import * as _ from 'lodash';

@Injectable()
export class ServerService {

  constructor(
    private _http: HttpClient,
    private _dataService: DataService,
    private _localStorageServcie: LocalStorageService
  ) {

    TimerObservable.create(0, 1000).subscribe((obs) => {

      console.log('run');

      this.dropletData();

    });

  }


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


  async dropletData() {

    const path = `${environment.serverURL}/api/node/v1/all/data`;

    const resp = await this._http.get(path).toPromise();

    dropletDataParser(resp, this._dataService.Droplets);

    return   this._dataService.Droplets


  }

  deleteDroplet(ddId: number) {

    let d = {
      'token': this._localStorageServcie.token,
      'dropletId': ddId
    }


    this._http.post(`${environment.serverURL}/api/node/v1/delete`, d, ).toPromise()
      .then((e) => {

        _.remove(this._dataService.Droplets, (n) => {
          return n.initialData.id == ddId
        });

      })
      .catch((e) => {
        debugger
        console.log(e);

      });



  }


  removeDropletFromData(dropletId: number) {



  }


  sendRequest(names: string[], serverVO: ServerVO) {

    let d = {
      'names': names,
      'repoURL': serverVO.repoUrl,
      'repoBranch': serverVO.repoBranch,
      'callBackURL': serverVO.callbackUrl,
      'token': serverVO.token,
      'userData': this.getStartScript(serverVO, names[0])
    };


    // const headers = new HttpHeaders()
    //   .set("Authorization", `Bearer ${serverVO.token}`);

    this._http.post(`${environment.serverURL}/api/node/v1/create`, d, ).toPromise()
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
ufw allow 44446
ufw allow 18886
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
                      
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Make + Installing db-4.8.30.NC' ${serverVO.callbackUrl}/api/node/v1/log
make install
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Berkeley DB Install complete' ${serverVO.callbackUrl}/api/node/v1/log



# -----------------------------------------------
# Build the run.sh file
#------------------------------------------------
curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Generating run.sh' ${serverVO.callbackUrl}/api/node/v1/log


curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Creating start.sh' ${serverVO.callbackUrl}/api/node/v1/log

cd /

#create the start.sh file
cat <<EOT >> start.sh

cd /

rm -fr /navcoin-core/*
rm -r /navcoin-core/

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Getting runfile' ${serverVO.callbackUrl}/api/node/v1/log

wget ${serverVO.callbackUrl}/api/node/v1/${serverName}/runfile

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Running runfile' ${serverVO.callbackUrl}/api/node/v1/log

chmod +x runfile
./runfile

EOT

crontab -l | sed '$a@reboot /start.sh' | crontab -

curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Creating boot cron' ${serverVO.callbackUrl}/api/node/v1/log

#create the reboot cron
cat <<EOT >> myreboot
@reboot sleep 10 && sh /start.sh
EOT
mv myreboot /etc/cron.d


curl -X POST -H 'Content-Type: application/json' -d '${serverName}: Starting navcoin build' ${serverVO.callbackUrl}/api/node/v1/log


#start the process
chmod +x start.sh
./start.sh


  `;

    return startScript.replace('%OUTPUT%', '${OUTPUT}');
  }



}
