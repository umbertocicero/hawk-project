import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from './../../shared/dto';

@Component({
    selector: 'app-trip-detail',
    templateUrl: './trip-detail.component.html',
    styleUrls: ['./trip-detail.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class TripDetailComponent implements OnInit {

    trip: Trip = new Trip();

    //es;
    constructor(
        private services: TripService,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    ngOnInit() {
        this.route.params.subscribe(params => {
            var id = params['id'];
            
            if (id) {

                var __this = this;
                
               // setTimeout(function(){ __this.trip = __this.es }, 3000);


                this.services.getTrip(id).subscribe(data => {
                    //this.es=data;
                    this.trip = data 
                    });
            }
        })
    }

   

    deleteTrip(event) {
        this.services.deleteTrip(event).subscribe(data => {
            console.log(data);
            this.router.navigate(['/home']);
        });
    }
}
