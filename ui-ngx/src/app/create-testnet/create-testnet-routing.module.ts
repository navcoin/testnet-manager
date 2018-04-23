import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CreateTestnetComponent} from './create-testnet.component';


@NgModule({
  imports: [
    RouterModule.forChild([

      {
        path: 'testnet/create',
        component: CreateTestnetComponent,

      },



    ])
  ],
  exports: [RouterModule]
})
export class CreateTestnetRoutingModule { }
