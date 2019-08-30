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

  constructor(private houseApi: HouseApiService, public activatedRoute: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    console.log(1);
    this.activatedRoute.params.subscribe(params => {
      this.idHouse = params.id;
      this.houseApi.findById(this.idHouse).subscribe(result => {
        this.houseDetail = result;
        console.log(this.houseDetail);
      });
    });
  }
}
