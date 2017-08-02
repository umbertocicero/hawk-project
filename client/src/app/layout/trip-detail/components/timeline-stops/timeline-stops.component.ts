import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { TripService } from './../../../../shared/services/trip.services';
import { Trip } from './../../../../shared/dto';

@Component({
  selector: 'app-timeline-stops',
  templateUrl: './timeline-stops.component.html',
  styleUrls: ['./timeline-stops.component.scss'],
  providers: [TripService]
})
export class TimelineStopsComponent implements OnInit {

  @Input() trip: Trip;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  deleteTrip(id){
     this.delete.emit(id);
  }
}
