import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {SharedMaterialModule} from './shared/components/material/shared-material.module';
import {AppRoutingModule} from "./app-routing.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {CreateTestnetModule} from "./create-testnet/create-testnet.module";
import {ServerService} from "./services/server.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    DashboardModule,
    CreateTestnetModule,

    SharedMaterialModule,
    AppRoutingModule
  ],
  providers: [
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
