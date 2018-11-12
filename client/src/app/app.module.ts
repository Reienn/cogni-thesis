import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutModule } from './about/about.module';
import { AuthModule } from './auth/auth.module';

import { AuthGuardService } from './auth/services/auth-guard.service';
import { AboutComponent } from './about/about/about.component';

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
    component: AboutComponent
  },
  {
    path: 'control-panel',
    loadChildren: './control-panel/control-panel.module#ControlPanelModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'gameplay',
    loadChildren: './gameplay/gameplay.module#GameplayModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AboutModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
