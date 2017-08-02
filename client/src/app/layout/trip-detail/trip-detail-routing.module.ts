import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripDetailComponent } from './trip-detail.component';

const routes: Routes = [
    { path: '', component: TripDetailComponent },
    // { path: ':id', component: TripDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TripDetailRoutingModule { }
