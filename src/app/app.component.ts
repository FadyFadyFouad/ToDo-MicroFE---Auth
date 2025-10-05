import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authForm: FormGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
    isLoginMode: boolean = true;
    authService = inject(AuthService);
    @Output() signedInUser = new EventEmitter<Event>();
    router = inject(Router);
    
    onSwitchMode(){
      this.isLoginMode = !this.isLoginMode;
    }


    onSubmit(){
      let responseData: any;
      if(this.authForm.valid && this.isLoginMode){
        responseData = this.authService.signIn(this.authForm.value.email, this.authForm.value.password)
        .subscribe(responseData => {
          console.log(responseData);
        });
        this.signedInUser.emit(this.authForm.value.email);
        localStorage.setItem('email', this.authForm.value.email);
        // this.router.navigate(['list'],{ queryParams: { email: this.authForm.value.email } });
      }
      else if(this.authForm.valid && !this.isLoginMode){
        this.authService.signUp(this.authForm.value.email, this.authForm.value.password)
        .subscribe(responseData => {
          console.log(responseData);
        });
      }
    }
}
