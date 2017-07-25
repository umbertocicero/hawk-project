import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';

@Component({
    selector: 'app-trip-detail',
    templateUrl: './trip-detail.component.html',
    styleUrls: ['./trip-detail.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class TripDetailComponent implements OnInit {
    constructor(
         private services: TripService
    ){ }
    ngOnInit() { 

         this.services.getTripById(1).subscribe(data => {console.log(data);});

    }
}
