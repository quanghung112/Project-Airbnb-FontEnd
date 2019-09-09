import {Component, OnInit} from '@angular/core';
import {HouseApiService} from '../house-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../user/login/login.component';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss']
})
export class HouseDetailsComponent implements OnInit {
  idHouse: any;
  houseDetail: any;
  Images: any;
  images1: any;
  constructor(private houseApi: HouseApiService,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idHouse = params.id;
      this.houseApi.findById(this.idHouse).subscribe(result => {
        this.houseDetail = result;
      });
      this.houseApi.getImageOfHouse(this.idHouse).subscribe(result => {
        this.Images = result;
        this.images1 = this.Images[0];
        this.Images.shift();
        // console.log(result);
      });
    });
  }

  changePage() {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      this.router.navigate([`order/houses/${this.idHouse}`]);
    } else {
      this.dialog.open(LoginComponent, {
        width: '1200px',
        height: '1200px',
      });
    }
  }
}
