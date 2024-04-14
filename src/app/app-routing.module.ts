import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallComponent } from './call/call.component';
import { LiveComponent } from './live/live.component';

const routes: Routes = [
  {
    path: 'user/:id',
    component: CallComponent,
  },
  {
    path: 'live',
    component: LiveComponent,
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
