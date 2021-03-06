import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from '../location.service';
import {UserApiService} from '../../user/user-api.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {HouseApiService} from '../house-api.service';
import {Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  // @ts-ignore
  @ViewChild('description') des: any;
  cities: any;
  districts: any;
  subDistricts: any;
  user: any;
  title: string;
  style: string;
  // tslint:disable-next-line:variable-name
  loan_type: string;
  address: string;
  city: string;
  district: string;
  subDistrict: string;
  bedroom: number;
  bathroom: number;
  price: number;
  description: any;
  idUser = localStorage.getItem('idUser');
  start: any;
  end: any;
  public Editor = ClassicEditor;
  houseDetail: any;
  images = [];
  urls = [];
  houseId: any;
  errors: any;
  private getArticleContent() {
    if (this.des && this.des.editorInstance) {
      console.log(this.Editor.editorInstance.getData());
      this.description = this.Editor.editorInstance.getData();
    }
    return '';
  }

  constructor(
    private locationApi: LocationService,
    private userApi: UserApiService,
    private houseApi: HouseApiService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.locationApi.getCities().subscribe(result => {
      this.cities = result;
    });
  }

  changedCity(selectedValue: string) {
    this.locationApi.getDistricts(selectedValue).subscribe(result => {
      this.districts = result;
    });
    if (selectedValue) {
      this.locationApi.getCity(selectedValue).subscribe(result => {
        // console.log(result[0].name);
        this.city = result[0].name;
      });
    } else {
      this.city = 'chưa cập nhật';
    }

  }

  changeDistrict(selectedValue: string) {
    this.locationApi.getSubDistricts(selectedValue).subscribe(result => {
      this.subDistricts = result;
    });
    if (selectedValue) {
      this.locationApi.getDistrict(selectedValue).subscribe(result => {
        this.district = result[0].name;
        // console.log(this.district);
      });
    } else {
      this.district = 'chưa cập nhật';
    }

  }

  getSubDistrict(selectedValue: string) {
    if (selectedValue) {
      this.locationApi.getSubDistrict(selectedValue).subscribe(result => {
        this.subDistrict = result[0].name;
        // console.log(this.sub_district);
      });
    } else {
      this.subDistrict = 'chưa cập nhật';
    }
  }

  onChange({editor}: ChangeEvent) {
    const data = editor.getData();
    this.description = data;
    console.log(this.description);
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

  post(postForm: HTMLFormElement) {
    // @ts-ignore
    this.title = postForm.title.value;
    this.style = postForm.style1.value;
    this.loan_type = postForm.loan_type.value;
    this.address = postForm.address.value;
    this.start = postForm.start.value;
    this.end = postForm.end.value;
    this.bathroom = postForm.bathroom.value;
    this.bedroom = postForm.bedroom.value;
    this.price = postForm.price.value;
    const data = {
      title: this.title,
      style: this.style,
      loan_type: this.loan_type,
      address: this.address,
      city: this.city,
      district: this.district,
      sub_district: this.subDistrict,
      bedroom: this.bedroom,
      bathroom: this.bathroom,
      price: this.price,
      description: this.description,
      start_loan: this.start,
      end_loan: this.end,
      user_id: this.idUser
    };
    this.houseApi.createPost(data).subscribe(result => {
      this.houseApi.getNewHouse(this.idUser).subscribe(house => {
        console.log(house);
        this.houseId = house[0].id;
        if (this.images) {
          for (let i = 0; i < this.images.length; i++) {
            const myFormData = new FormData();
            const headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            myFormData.append('image', this.images[i]);
            myFormData.append('house_id', this.houseId);
            this.houseApi.saveImage(myFormData).subscribe(result2 => {
              console.log(result2[0]);
              this.houseApi.message = 'Đăng bài thành công';
              this.router.navigate(['me/posts/list']);
            });
          }
        }
      });
    }, error => {
      this.errors = error.error.error;
    });
  }

  deleteImageAdd(i: any) {
    this.urls.splice(i, 1);
    this.images.splice(i, 1);
  }
}
