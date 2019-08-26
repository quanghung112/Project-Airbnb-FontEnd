import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private storage: Storage) {

  }

  getData() {
    return this.storage.get('someData');
  }

}
