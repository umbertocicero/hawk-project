import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTripComponent } from './add-trip.component';

const routes: Routes = [
    { path: '', component: AddTripComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTripRoutingModule { }
