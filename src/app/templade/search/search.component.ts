import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../house/location.service';
import {HouseApiService} from '../../house/house-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  cities: any;
  city: any;
  style: any;
  bedroom: any;
  bathroom: any;
  price: any;
  houses: any;

  constructor(
    private locationApi: LocationService,
    private houseApi: HouseApiService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.locationApi.getCities().subscribe(result => {
      this.cities = result;
    });
  }
  searchHouse(searchForm: HTMLFormElement) {
    // @ts-ignore
    this.city = searchForm.city.value;
    this.style = searchForm.style1.value;
    this.price = searchForm.price.value;
    this.bedroom = searchForm.bedroom.value;
    this.bathroom = searchForm.bathroom.value;

    const data = {
      style: this.style,
      city: this.city,
      bedroom: this.bedroom,
      bathroom: this.bathroom,
      price: this.price,
    };
    console.log(data);
    this.houseApi.search(data).subscribe(result => {
      this.houseApi.getHouseSearch(result);
      console.log(this.houseApi.searchHouse);
      this.router.navigate(['houses/search']);
      for (let i = 0; i < this.houseApi.searchHouse.length; i++) {
        this.houseApi.getImageOfHouse(this.houseApi.searchHouse[i].id).subscribe(photos => {
          this.houseApi.searchHouse[i].convenient = photos[0].image;
          console.log(this.houseApi.searchHouse[i].convenient);
        });
      }
    });
  }
}
