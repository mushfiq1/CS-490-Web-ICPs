import { Component } from '@angular/core';
import {FoodApiService} from './food-api.service';
import {Restaurant} from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private message: any;
  private restaurants: any;
  // private restaurants: any;

  constructor(private foodservice: FoodApiService) { }

  title = 'WebIcpSix';
  latitude: any;
  longitude: any;
  private latLong = new String('https://api.opencagedata.com/geocode/v1/json?&key=45165737b4284d2b93c4bcadee112f30&language=en&pretty=1&q=');
  private str1 = new String(
    'https://api.foursquare.com/v2/venues/search?client_id=K4HU0Y03CCNLHPLCLVPBQXQIUJBL4HIVJGB4SJPIPESLHHVN&' +
    'client_secret=KZIKZCR104WMA5RWRD2VILIRXA1UTAN4J2E2JLKXSQ03CDXL&v=20180323&limit=10' +
    '&ll=' );
  private url: string;
  private llUrl: string;
  cityname: any;
  restaurant: Restaurant [] = [];

  getRestaurants() {

    this.restaurant = [];

    this.url = this.str1.concat(this.latitude,',',this.longitude,'&categoryId=4bf58dd8d48988d14e941735,4bf58dd8d48988d142941735,4bf58dd8d48988d111941735,' +
      '4bf58dd8d48988d1d1941735,4bf58dd8d48988d1df931735,4bf58dd8d48988d143941735,4bf58dd8d48988d16d941735');

    console.log('url created  - ', this.url);

    this.foodservice.getRestaurants(this.url).subscribe(res => {
      console.log('Final - API call Foursquare - ', res);


      this.restaurants = res;

      console.log(this.restaurants.response.venues.length);
      for( var i=0;i<this.restaurants.response.venues.length;i++){
                this.restaurant.push({name : this.restaurants.response.venues[i].name,address:this.restaurants.response.venues[i].location.address
                  ,city:this.restaurants.response.venues[i].location.city,country:this.restaurants.response.venues[i].location.country,
                  categories:this.restaurants.response.venues[i].categories[0].name});
      }

      console.log('Final restaurant list - ',this.restaurant);
    });

  }

  getLatLong() {

    this.llUrl = this.latLong.concat(this.cityname);

    console.log('final url  - ', this.llUrl);
    this.foodservice.getll(this.llUrl).subscribe(res =>{
      console.log('res at app comp - ', res);
      this.message = res;
      this.restaurant = [];
      if(this.message.total_results === 0){
        alert('no such place, please re - enter');
      }else{
        this.latitude = this.message.results[0].geometry.lat;
        this.longitude = this.message.results[0].geometry.lng;
      }
    })
  }
}
