import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
