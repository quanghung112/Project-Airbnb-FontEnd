import {Component, OnInit} from '@angular/core';
import {HouseApiService} from "../house-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  constructor(private houseApi: HouseApiService, private router: Router) {
  }

  ngOnInit() {
  }
  detailHouse(id: any) {
    this.router.navigate([`/houses/${id}`]);
  }
}
