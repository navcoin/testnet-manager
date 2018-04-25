import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {SharedMaterialModule} from './shared/components/material/shared-material.module';
import {AppRoutingModule} from "./app-routing.module";
import {CreateTestnetModule} from "./create-testnet/create-testnet.module";
import {ServerService} from "./services/server/server.service";
import {LocalStorageService} from "./services/local-storage/local-storage.service";
import {DataService} from "./services/data/data.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    CreateTestnetModule,

    SharedMaterialModule,
    AppRoutingModule
  ],
  providers: [
    ServerService,
    LocalStorageService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
