import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AboutModule } from './about/about.module';
import { AuthModule } from './auth/auth.module';

import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { EducatorAuthGuardService } from './auth/services/educator-auth-guard.service';
import { LoggedGuardService } from './auth/services/logged-guard.service';
import { AboutComponent } from './about/about/about.component';
import { NotFoundComponent } from './about/not-found/not-found.component';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [LoggedGuardService]
  },
  {
    path: 'control-panel',
    loadChildren: './control-panel/control-panel.module#ControlPanelModule',
    canActivate: [EducatorAuthGuardService]
  },
  {
    path: 'gameplay',
    loadChildren: './gameplay/gameplay.module#GameplayModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    AboutModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
