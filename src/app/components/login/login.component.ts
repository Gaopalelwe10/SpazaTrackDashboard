import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm= this.fb.group({
   
    email: [null, Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
    password: [null, Validators.compose([ Validators.minLength(6), Validators.maxLength(12), Validators.required])],
 
  });

  constructor(private fb: FormBuilder, 
    private route: Router,
    private authService : AuthService
    ) {}

  onSubmit() {
    alert('Thanks!');
  }
  // login(){
  //   this.route.navigateByUrl('menu')
  // }

  async login() {
  
 

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(async () => {
   
    });

  }
}
