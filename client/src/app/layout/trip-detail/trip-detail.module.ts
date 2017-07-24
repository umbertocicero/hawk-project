import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripDetailComponent } from './trip-detail.component';
import { TripDetailRoutingModule } from './trip-detail-routing.module';
import { PageHeaderModule } from './../../shared';
import {
    TimelineStopsComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        TripDetailRoutingModule,
        PageHeaderModule
    ],
    declarations: [TripDetailComponent, TimelineStopsComponent]
})
export class TripDetailModule { }
