import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from '../location.service';
import {UserApiService} from '../../user/user-api.service';
import {HouseApiService} from '../house-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

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
  idHouse: any;
  houseDetail: any;
  images = [];
  urls = [];
  photoOfPost: any;

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
    private activatedRoute: ActivatedRoute
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

  getImage(houseId) {
    this.houseApi.getImageOfHouse(houseId).subscribe(photos => {
      console.log(photos);
      if (photos) {
        this.photoOfPost = photos;
      } else {
        this.photoOfPost = null;
      }
    });
  }

  ngOnInit() {
    this.houseApi.message = '';
    this.locationApi.getCities().subscribe(result => {
      this.cities = result;
    });
    this.activatedRoute.params.subscribe(params => {
      this.idHouse = params.id;
      this.houseApi.findById(this.idHouse).subscribe(result => {
        this.houseDetail = result;
        this.getImage(this.houseDetail.id);
        console.log(this.houseDetail);
      });
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

  deleteImage(p: any) {
    if (confirm('Ảnh sẽ bị xóa trong bộ nhớ, bạn có chắc chắn muốn xóa')) {
      this.houseApi.deleteImage(p).subscribe(result => {
        console.log(result);
        this.houseApi.message = 'Xóa ảnh thành công';
        this.getImage(this.houseDetail.id);
      });
    }
  }

  onChange({editor}: ChangeEvent) {
    const data = editor.getData();
    this.description = data;
  }

  update(postForm: HTMLFormElement) {
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
    };

    this.houseApi.updatePost(this.houseDetail.id, data).subscribe(result => {
      console.log(result);
      if (this.images) {
        for (let i = 0; i < this.images.length; i++) {
          const myFormData = new FormData();
          const headers = new HttpHeaders();
          headers.append('Content-Type', 'multipart/form-data');
          headers.append('Accept', 'application/json');
          myFormData.append('image', this.images[i]);
          myFormData.append('house_id', this.houseDetail.id);
          // console.log(this.formData);
          this.houseApi.saveImage(myFormData).subscribe(result2 => {
            console.log(result2[0].message);
            this.houseApi.message = result2[0].message;
          });
        }
      }
      this.houseApi.message = 'Sửa bài viết thành công';
      this.router.navigate(['/me/posts/list']);
    });
  }
}
