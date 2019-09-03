import { Component, OnInit } from '@angular/core';
import {HouseApiService} from '../house-api.service';

@Component({
  selector: 'app-showhouses',
  templateUrl: './showhouses.component.html',
  styleUrls: ['./showhouses.component.scss']
})
export class ShowhousesComponent implements OnInit {
  houses: any;
  items = [];
  pageOfItems: Array<any>;
  constructor(public houseService: HouseApiService) {}

  ngOnInit() {
    this.houseService.getAll().subscribe(result => {
      this.houses = result;
      console.log(this.houses);
    });
  }
  imageHouse(){

  }
}
