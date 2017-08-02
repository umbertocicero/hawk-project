import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        PageHeaderModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
