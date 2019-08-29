import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiUrl = 'http://localhost:8000/api/location';

  constructor(
    private http: HttpClient
  ) {
  }

  getCities() {
    return this.http.get(`${this.apiUrl}/cities`);
  }

  getDistricts(matp) {
    return this.http.get(`${this.apiUrl}/cities/${matp}`);
  }

  getSubDistricts(maqh) {
    return this.http.get(`${this.apiUrl}/districts/${maqh}`);
  }

  getCity(matp) {
    return this.http.get(`${this.apiUrl}/city/${matp}`);
  }

  getDistrict(maqh) {
    return this.http.get(`${this.apiUrl}/district/${maqh}`);
  }

  getSubDistrict(xaid) {
    return this.http.get(`${this.apiUrl}/subdistrict/${xaid}`);
  }
}
