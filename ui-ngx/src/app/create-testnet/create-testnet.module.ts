import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateTestnetComponent} from './create-testnet.component';
import {CreateTestnetRoutingModule} from './create-testnet-routing.module';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {SharedMaterialModule} from "../shared/components/material/shared-material.module";
import {MatHorizontalStepper} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import { DropletListComponent } from './droplet-list/droplet-list.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    SharedMaterialModule,

    // Third Pary


    CreateTestnetRoutingModule
  ],
  declarations: [
    CreateTestnetComponent,
    DropletListComponent
  ],
  exports: [CreateTestnetComponent]
})
export class CreateTestnetModule { }
