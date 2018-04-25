import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CreateTestnetComponent} from './create-testnet.component';


@NgModule({
  imports: [
    RouterModule.forChild([

      {
        path: 'testnet',
        component: CreateTestnetComponent,

      },



    ])
  ],
  exports: [RouterModule]
})
export class CreateTestnetRoutingModule { }
