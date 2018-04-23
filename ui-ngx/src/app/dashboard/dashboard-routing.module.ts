import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from "../../shared/services/guards/auth.guard";


@NgModule({
  imports: [
    RouterModule.forChild([

      {
        path: 'dashboard',
        component: DashboardComponent,
        // resolve: {
        //   authResolve: AuthResolver
        // }
        canActivate: [AuthGuard]
      },



    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
