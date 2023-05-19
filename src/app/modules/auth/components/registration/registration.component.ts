import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from '../../models/user.model';
import { first } from 'rxjs/operators';
import { AuthServiceService } from '../../services/auth-service.service';
import { User } from 'src/app/modules/account/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AuthServiceService],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  // registrationForm = new FormGroup({
  //   fullname: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(100),
  //   ]),
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.email,
  //     Validators.minLength(10),
  //     Validators.maxLength(50),
  //   ]),
    // password: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    //   Validators.maxLength(15),
      // Validators.pattern('/^(?=D*d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/'),
    // ]),
    // cPassword: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    //   Validators.maxLength(15),
      // Validators.pattern(
      //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      // ),
    // ]),
  // });
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private authServices: AuthServiceService,
    private router: Router
  ) {
    // this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // validateName(): string {
  //   const er:any = this.registrationForm.get('fullname')?.errors?this.registrationForm.get('fullname')?.errors:{}
  //   const errors = Object.keys(er);
    // const nameControl = this.registrationForm.get('fullname');
  //   if(errors.length>0){
  //     let errorMessage:any=[];
  //     errors.forEach(error => {
  //       if(error==='required' && this.registrationForm.get('fullname')?.touched){
  //         errorMessage.push("Name is Required");
  //       }else if(error==='minlength'){
  //         errorMessage.push("Name shuolde be at least 3");
  //       }else if(error==='maxlength'){
  //         errorMessage.push("Name shuolde be less than or equal 15");
  //       }
  //     })
  //     return errorMessage.join(',');
  //   }
  //   return null+'';
  // }
  // validatePassword(): any {
  //   const passwordControl = this.registrationForm.get('password');
  //   if (passwordControl?.invalid && passwordControl?.touched) {
  //     if (passwordControl.errors?.required) {
  //       return 'Password is required'+ false;
  //     } else if (passwordControl.errors?.minlength) {
  //       return 'Password should be at least 8 characters long' +false;
  //     } else if (passwordControl.errors?.maxlength) {
  //       return 'Password should be at most 15 characters long' + false;
  //     }else if(passwordControl.errors?.pattern){
  //       return 'Password must contain at least one uppercase letter, one number, and one symbol' + false;
  //     }
  //   }
  //   return true;
  // }
  // validateEmail(): string {
  //   const er:any = this.registrationForm.get('email')?.errors?this.registrationForm.get('email')?.errors:{}
  //   const errors = Object.keys(er);
  //   if(errors.length>0){
  //     let errorMessage:any=[];
  //     errors.forEach(error => {
  //       if(error==='required' && this.registrationForm.get('email')?.touched){
  //         errorMessage.push("Email is Required");
  //       }else if(error==='minlength'){
  //         errorMessage.push("Email shuolde be at least 10");
  //       }else if(error==='maxlength'){
  //         errorMessage.push("Email shuolde be less than or equal 20");
  //       }
  //     })
  //     return errorMessage.join(',')
  //   }
  //   return null+'';
  // }
  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        fullname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(10),
            Validators.maxLength(50), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
            // Validators.pattern(
            //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,30}'
            // ),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
            // Validators.pattern(
            //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,30}'
            // ),
          ]),
        ],
        // agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }
  checkConfirmPassword() {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('cPassword')?.value;
    if (password !== confirmPassword && this.registrationForm.get('cPassword')?.touched) {
      return false;
      // this.registrationForm.get('cPassword')?.setErrors({ ConfirmPassword: true });
    }
    return true;
  }

  submit() {
    this.hasError = false;
    const newUser: User = {
      name: this.f.fullname.value,
      email: this.f.email.value,
      password: this.f.password.value,
      avatar: '',
      token: '',
      googleId: '',
    };
    // this.authServices.register(newUser);
    console.log(newUser);

    const registrationSubscr = this.authServices
      .register(newUser)
      .pipe(first())
      .subscribe((user: User) => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(registrationSubscr);
    this.registrationForm.reset()
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
