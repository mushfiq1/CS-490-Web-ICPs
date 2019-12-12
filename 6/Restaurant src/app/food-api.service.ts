import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodApiService {

  constructor(private http: HttpClient) { }

  public getll(url: string) {
    console.log('entering into FoodAPI  service');
    return this.http
      .get(`${url}`)
      .pipe(map(res => {
          console.log('get menthod - ', res);
        // const mess = JSON.stringify(res);
          return res;
        })
      );
  }

  public getRestaurants(url: string) {
    console.log('entering into FoodAPI  service');
    return this.http
      .get(`${url}`)
      .pipe(map(res => {
          console.log('get menthod - ', res);
          return res;
        })
      );

  }
}
