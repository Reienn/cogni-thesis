import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatTabsModule } from '@angular/material';
import { AuthModule } from '../auth/auth.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AuthModule,
    MatToolbarModule,
    MatTabsModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
