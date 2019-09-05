import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from '../location.service';
import {UserApiService} from '../../user/user-api.service';
  import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {HouseApiService} from '../house-api.service';
import {Router} from '@angular/router';


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
  // tslint:disable-next-line:variable-name
  sub_district: string;
  bedroom: number;
  bathroom: number;
  price: number;
  description: any;
  // tslint:disable-next-line:variable-name
  user_id = localStorage.getItem('idUser');
  public Editor = ClassicEditor;

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
        console.log(result[0].name);
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
        console.log(this.district);
      });
    } else {
      this.district = 'chưa cập nhật';
    }

  }

  getSubDistrict(selectedValue: string) {
    if (selectedValue) {
      this.locationApi.getSubDistrict(selectedValue).subscribe(result => {
        this.sub_district = result[0].name;
        console.log(this.sub_district);
      });
    } else {
      this.sub_district = 'chưa cập nhật';
    }
  }

  onChange({editor}: ChangeEvent) {
    const data = editor.getData();
    this.description = data;
  }

  post(postForm: HTMLFormElement) {
    // @ts-ignore
    this.title = postForm.title.value;
    this.style = postForm.style1.value;
    this.loan_type = postForm.loan_type.value;
    this.address = postForm.address.value;
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
      sub_district: this.sub_district,
      bedroom: this.bedroom,
      bathroom: this.bathroom,
      price: this.price,
      description: this.description,
      user_id: this.user_id
    };
    this.houseApi.createPost(data).subscribe(result => {
      console.log(result);
      this.houseApi.message = 'Đăng bài thành công. Hãy thêm ảnh cho bài đăng của bạn';
      this.router.navigate(['me/post/2']);
    });
  }
}
