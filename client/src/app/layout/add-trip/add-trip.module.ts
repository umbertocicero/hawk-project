import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddTripRoutingModule } from './add-trip-routing.module';
import { AddTripComponent } from './add-trip.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';
import {
    ModalComponent,
} from './components';

@NgModule({
    imports: [
        CommonModule,
        AddTripRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot(),
        FormsModule
    ],
    declarations: [AddTripComponent, ModalComponent]
})
export class AddTripModule { }
