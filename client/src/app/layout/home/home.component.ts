import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class HomeComponent implements OnInit {
    constructor(
        private services: TripService
    ) { }

    trips = new Array();

    ngOnInit() {
        this.services.getTrip(null).subscribe(data => { this.trips = data });
    }
}
