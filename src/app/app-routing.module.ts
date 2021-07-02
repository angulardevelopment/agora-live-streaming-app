import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { LiveComponent } from './live/live.component';

const routes: Routes = [
  {
    path: 'user/:id',
    component: BasicComponent,
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
