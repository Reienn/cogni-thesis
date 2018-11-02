import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class AuthModule { }
