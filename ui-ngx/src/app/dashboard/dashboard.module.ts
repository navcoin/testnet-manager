import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {SharedMaterialModule} from "../shared/components/material/shared-material.module";
import { DeployComponent } from './components/deploy/deploy.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,

    SharedMaterialModule,

    // Third Pary


    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    DeployComponent,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
