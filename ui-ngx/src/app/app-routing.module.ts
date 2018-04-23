import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([

      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
      /* define app module routes here, e.g., to lazily load a module
       (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      // { path: '', component: HomeComponent },
      // { path: 'callback', component: CallbackComponent },
      // { path: '**', redirectTo: '' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
