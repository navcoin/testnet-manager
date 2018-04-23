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
      "user_data": "#!/bin/bash \n curl -X POST -H 'Content-Type: application/json' -d 'CALL from api build' https://webhook.site/eeb8307f-67ce-460b-9a87-24f9f7575d48",
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



}
