import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Stop, Image, Trip } from './../dto';

@Injectable()
export class UtilService {
  // Resolve HTTP using the constructor
  constructor(private http: Http) { }
  // private instance variable to hold base url
  private baseUrl = 'http://localhost:3000';



  frorEachImageIntoStops(trip: Trip, callback) {


    var data: Trip = trip;

    if (data.stops != null && data.stops.length > 0) {

      data.stops.forEach(stop => {
        if (stop.images != null && stop.images.length > 0) {

          stop.images.forEach(image => {
            callback(stop, image);
          });
        }
      });
    }

  }

  private handleError(error: Response | any): Promise<any> {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }

  private extractData(res: Response) {
    let body;
    if (res.text()) {
      body = res.json();
    }
    return body || {};
  }

}
