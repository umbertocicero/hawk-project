import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Stop, Image, Trip } from './../dto';

@Injectable()
export class TripService {
  // Resolve HTTP using the constructor
  constructor(private http: Http) { }
  // private instance variable to hold base url
  private baseUrl = 'http://localhost:3000';

  getTrip(id) {
    let url = this.baseUrl + '/getTrip' + (id ? '/' + id : '');
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  addTrip(trip: Trip, callback) {






    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var data: Trip = trip;
    var images: Image[] = [];
    if (data.stops != null && data.stops.length > 0) {

      data.stops.forEach(stop => {
        if (stop.images != null && stop.images.length > 0) {

          stop.images.forEach(image => {

            var iTmp: Image = new Image();

            iTmp.id = image.id;
            var path = trip.id + '/' + stop.id + '/' + image.id + '.PNG';
            iTmp.path = path;
            iTmp.base64 =(JSON.parse(JSON.stringify(image.base64)));;
            image.base64 = null;
            images.push(iTmp);
          });
        }
      });
    }



    /*
    return this.http.post(this.baseUrl + '/addTrip', data, options)
      .map((res: Response) => {
        //res.json(); 
    
        function foo() {
          this.addImages(trip, function (e) {
            console.log('finito addTrip:: ' + e);
    
            return res.json();
          })
        }
        return foo();
    
    
      });
    
    */

    var self = this;

    var r = null;
    var addT = new Promise((resolve, reject) => {
      this.http.post(self.baseUrl + '/addTrip', data, options)
        .map((res: Response) => {
          r = res.json();
          resolve();
        }).toPromise();

    });


    var addI = new Promise((resolve, reject) => {
      this.addImages(images, function (e) {
        console.log('finito addTrip:: ' + e);
        resolve();
      });
    });
    Promise.all([addT, addI]).then(value => {
      console.log(value);
      callback(r);
    }, reason => {
      console.log(reason)
    });




  }



  addImages(images: Image[], endCallback) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var calls = [];

    var self = this;

    images.forEach(image => {

      calls.push(
        new Promise((resolve, reject) => {
          self.http.post(self.baseUrl + '/addImage', image, options)
            .map((res: Response) => {
              res.json();
              resolve();
            }).toPromise();
        })
      )
    });

    Promise.all(calls).then((results: any[]) => {
      endCallback(results);
    });

  }


  updateTrip(trip) {
    let data = trip;
    return this.http.put(this.baseUrl + '/updateTrip', data)
      .map((res: Response) => res.json());
  }

  deleteTrip(id) {
    return this.http.delete(this.baseUrl + '/deleteTrip/' + id)
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
