import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTripRoutingModule } from './add-trip-routing.module';
import { AddTripComponent } from './add-trip.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        AddTripRoutingModule,
        PageHeaderModule
    ],
    declarations: [AddTripComponent]
})
export class AddTripModule { }
