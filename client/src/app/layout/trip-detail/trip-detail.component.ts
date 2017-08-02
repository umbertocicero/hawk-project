import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-trip-detail',
    templateUrl: './trip-detail.component.html',
    styleUrls: ['./trip-detail.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class TripDetailComponent implements OnInit {
    constructor(
         private services: TripService,
         private route: ActivatedRoute,
    ){ }
    ngOnInit() { 
        this.route.params.subscribe(params => {
            var id = params['id'];
            this.services.getTrip(id).subscribe(data => {console.log(data);});
        })
         

    }
}
