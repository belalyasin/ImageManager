import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthServiceService } from '../../auth/services/auth-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, OnDestroy {
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
        // this.checkImageExists();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
  }
}
