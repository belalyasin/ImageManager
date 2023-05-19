import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/services/auth-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
  user: User;
  imageExists: boolean;
  imageUrl: string;
  private unsubscribe: Subscription[] = [];
  constructor(private auth: AuthServiceService) {}
  ngOnInit(): void {
    this.getMe();
  }
  getMe() {
    this.auth.getCurrentUser().subscribe(
      (response) => {
        // console.log(response);
        this.user = {...response.data};
        // console.log('user->'+JSON.stringify(this.user$));
        this.checkImageExists();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  checkImageExists() {
    // Assuming you have a property in the user object that contains the image URL
    this.imageExists =
      this.user.avatar !== null && this.user.avatar !== undefined;
    this.imageUrl = this.imageExists ? this.user.avatar : '';
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sub) => sub.unsubscribe());
  }

}
