import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {SharedMaterialModule} from './shared/components/material/shared-material.module';
import {AppRoutingModule} from "./app-routing.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {CreateTestnetModule} from "./create-testnet/create-testnet.module";


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
