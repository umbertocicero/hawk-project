import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';
import { Trip, Stop } from './../../shared/dto';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class AddTripComponent implements OnInit {
    constructor(private services: TripService) { }

    ngOnInit() { }

    trip: Trip = new Trip();
    stop: Stop = new Stop();

    postTrip() {
        this.services.addTrip(this.trip).subscribe(data => { console.log(data); });
    }
    addStop(event){
        console.log(event);
        if(this.trip.stops == undefined){
            this.trip.stops = [] as [Stop];
        }
        this.trip.stops.push(Object.assign({},this.stop));
        this.stop = new Stop();
    }

}
