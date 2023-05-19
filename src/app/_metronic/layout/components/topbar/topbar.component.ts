import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { AuthServiceService } from 'src/app/modules/auth/services/auth-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  user$: any;
  imageExists: boolean;
  imageUrl: string;

  constructor(
    private layout: LayoutService,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.getMe();
    console.log(this.imageExists);

  }
  getMe() {
    this.auth.getCurrentUser().subscribe(
      (response) => {
        // console.log(response);
        this.user$ = { ...response };
        console.log('user->'+JSON.stringify(this.user$));
        this.checkImageExists();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  checkImageExists() {
    // Assuming you have a property in the user object that contains the image URL
    // this.imageExists =
    //   this.user$.data.avatar !== null && this.user$.data.avatar !== undefined;
      if(this.user$.data.avatar !== null && this.user$.data.avatar !== undefined){
        this.imageExists = true;
      }else{
        this.imageExists = false
      }
      this.imageUrl = this.imageExists ? this.user$.data.avatar : '';
  }
}
