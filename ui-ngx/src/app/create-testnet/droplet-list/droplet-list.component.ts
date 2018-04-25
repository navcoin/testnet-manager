import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../services/server/server.service";
import {DropletModel} from "../../services/server/droplet-model";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-droplet-list',
  templateUrl: './droplet-list.component.html',
  styleUrls: ['./droplet-list.component.scss']
})
export class DropletListComponent implements OnInit {

  constructor(
    private _serverService: ServerService,
    private _dataService: DataService

  ) { }

  ngOnInit() {
    this._serverService.dropletData();
  }


  get dropletsData(): DropletModel[] {
    return this._dataService.Droplets;
  }

  onDeleteDropletHandler($event, dropletId: number) {
    this._serverService.deleteDroplet(dropletId);
  }

}
