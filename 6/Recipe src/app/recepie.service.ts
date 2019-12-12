import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecepieService {

  constructor(private http: HttpClient) { }


  getRestaurants(url: String) {

    console.log('entering into recipe service');
    return this.http
      .get(`${url}`)
      .pipe(map(res => {
          console.log('get menthod - ', res);
          return res;
        })
      );
  }
}
