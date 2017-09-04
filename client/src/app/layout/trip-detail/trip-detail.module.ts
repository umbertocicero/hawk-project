import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TripDetailComponent } from './trip-detail.component';
import { TripDetailRoutingModule } from './trip-detail-routing.module';
import { PageHeaderModule } from './../../shared';
import {
    TimelineStopsComponent
} from './components';
import {
    MapLandscapeComponent,
} from './../../shared/components/map';

@NgModule({
    imports: [
        CommonModule,
        TripDetailRoutingModule,
        PageHeaderModule
    ],
    declarations: [TripDetailComponent, TimelineStopsComponent, MapLandscapeComponent]
})
export class TripDetailModule { }
