import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { TripService } from './../../../../shared/services/trip.services';
import { Trip } from './../../../../shared/dto';

//declare var ol: any;

declare var $: any;

@Component({
  selector: 'app-timeline-stops',
  templateUrl: './timeline-stops.component.html',
  styleUrls: ['./timeline-stops.component.scss'],
  providers: [TripService]
})
export class TimelineStopsComponent implements OnInit, OnChanges {

  //@Input()
  trip: Trip;

  @Input('trip')
  set value(val: Trip) {
    this.trip = val;
    console.log('new value:', val); // <-- do your logic here!
  }


  @Output() delete: EventEmitter<string> = new EventEmitter();

  mapOpened: boolean = false;

  private base64Images = [[]];

  constructor(private services: TripService) { }

  ngOnInit() {


  }

  ngOnChanges() {
    var self = this;
    var trip = this.trip;
    if (trip != null && trip.stops != null) {

      var features = [];
      trip.stops.forEach(stop => {
        var coords: [number, number] = stop.coordinates;
        if (coords) {
          this.mapOpened = true;
        }

        if (stop.images != null && stop.images.length > 0) {
          stop.images.forEach(image => {
            this.services.getImage(image, 'small').subscribe(data => {
              var tmp = self.base64Images[stop.id];
              if(!tmp) self.base64Images[stop.id] = [];
              self.base64Images[stop.id].push(data);
              });
          });
        }
      });
    }
  }
  deleteTrip(id) {
    this.delete.emit(id);
  }

}