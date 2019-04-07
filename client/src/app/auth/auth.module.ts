import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule } from '@angular/material';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { EducatorAuthGuardService } from './services/educator-auth-guard.service';
import { LoggedGuardService } from './services/logged-guard.service';
import { NewPasswordComponent } from './components/new-password/new-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  declarations: [LoginComponent, SignupComponent, EditUserComponent, NewPasswordComponent],
  providers: [
    AuthenticationService,
    AuthGuardService,
    EducatorAuthGuardService,
    LoggedGuardService
  ],
  exports: [LoginComponent, SignupComponent, EditUserComponent],
})
export class AuthModule { }
