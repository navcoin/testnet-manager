import { Injectable } from '@angular/core';
import {DropletModel} from "../server/droplet-model";

@Injectable()
export class DataService {

  Droplets: DropletModel[] = [];


  constructor() { }



}
