import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthServiceService, private router: Router) {
    this.authService.logout().subscribe(
      response => {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
