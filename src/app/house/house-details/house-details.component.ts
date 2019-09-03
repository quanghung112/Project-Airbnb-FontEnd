import {Component, OnInit} from '@angular/core';
import {HouseApiService} from "../house-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss']
})
export class HouseDetailsComponent implements OnInit {
  idHouse: any;
  houseDetail: any;
  Images: any;
  // host = 'http://localhost:8000/image';

  constructor(private houseApi: HouseApiService, public activatedRoute: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idHouse = params.id;
      this.houseApi.findById(this.idHouse).subscribe(result => {
        this.houseDetail = result;
      });
      this.houseApi.getImageOfHouse(this.idHouse).subscribe(result => {
        this.Images = result;
        console.log(result);
      });
    });
  }
}
