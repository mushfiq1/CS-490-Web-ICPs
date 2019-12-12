import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecepieService} from "../recepie.service";
import {AppModel} from "../app.model";

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];
  private recipie: any;

  recipeArray: AppModel [] = [];



  url: String = 'https://api.edamam.com/search?app_id=27961abe&app_key=24db0b629af131e0f30a86971a25c31a&q=';

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;
  private fUrl: string;

  constructor(private _http: HttpClient,private recipeService: RecepieService) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeArray = [];
    // this.recipeValue = this.recipes.nativeElement.value;
    // this.placeValue = this.places.nativeElement.value;

    this.fUrl = this.url.concat(this.recipeValue);

    console.log('url test - ', this.fUrl);
    // if (this.recipeValue !== null) {

    this.recipeService.getRestaurants(this.fUrl).subscribe(res => {

      console.log('response in final - ',res)

      this.recipie = res;

      console.log(this.recipie.hits[0].recipe.calories);
      for( var i=0;i<this.recipie.hits.length;i++){
        this.recipeArray.push({  calories : this.recipie.hits[i].recipe.calories,
          dietLabels: this.recipie.hits[i].recipe.dietLabels[0],
          healthLabels: this.recipie.hits[i].recipe.healthLabels[0],
          image: this.recipie.hits[i].recipe.image,
          label: this.recipie.hits[i].recipe.label,
          source: this.recipie.hits[i].recipe.source,
          totalTime: this.recipie.hits[i].recipe.totalTime,
          url: this.recipie.hits[i].recipe.url});
      }

      console.log('final array recipe - ', this.recipeArray);
      // calories : Number,
      //   dietLabels: String,
      //   healthLabels: String,
      //   image: String,
      //   label: String,
      //   source: String,
      //   totalTime: Number,
      //   url: String



    });

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      /**
       * Write code to get place
       */
    }
  }
}
