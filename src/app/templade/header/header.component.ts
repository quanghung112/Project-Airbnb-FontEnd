import {Component, Input, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userId: any;
  idUser: any;
  constructor() { }

  ngOnInit() {
    this.idUser.currentIdUser.subscribe(result => this.idUser = result);
    console.log(this.idUser);
  }
}
