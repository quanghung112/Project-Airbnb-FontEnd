import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HouseApiService} from '../house-api.service';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss']
})
export class PostImageComponent implements OnInit {
  public image: any;
  public urls = [];
  houseId: any;
  images = [];
  formData: any;
  userId = localStorage.getItem('idUser');

  constructor(
    private fb: FormBuilder,
    private houseApi: HouseApiService,
    private router: Router
  ) {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.images.push(event.target.files[0]);
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  ngOnInit() {
    this.houseApi.getNewHouse(this.userId).subscribe(result => {
      console.log(result);
      this.houseId = result[0].id;
    });
  }

  post() {
    if (this.images) {
      for (let i = 0; i < this.images.length; i++) {
        const myFormData = new FormData();
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        myFormData.append('image', this.images[i]);
        myFormData.append('house_id', this.houseId);
        this.houseApi.saveImage(myFormData).subscribe(result => {
          console.log(result[0].message);
          this.houseApi.message = result[0].message;
        });
      }
    }
    this.router.navigate(['me/posts/list']);
  }
}
