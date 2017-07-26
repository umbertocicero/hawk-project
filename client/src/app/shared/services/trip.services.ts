import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TripService {
  // Resolve HTTP using the constructor
  constructor(private http: Http) { }
  // private instance variable to hold base url
  private baseUrl = 'http://localhost:3000';

  getTrips() {
    return this.http.get(this.baseUrl + '/getTrip')
      .map((res: Response) => res.json());
  }
  getTripById(id) {
    return this.http.get(this.baseUrl + '/getTrip/' + id)
      .map((res: Response) => res.json());
  }

  addTrip(trip) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = trip;
    return this.http.post(this.baseUrl + '/addTrip', data, options)
      .map((res: Response) => res.json());
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
