import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatTabsModule, MatButtonModule } from '@angular/material';
import { AuthModule } from '../auth/auth.module';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartComponent } from './start/start.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AuthModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule
  ],
  declarations: [AboutComponent, NotFoundComponent, StartComponent, ErrorMsgComponent],
  exports: [AboutComponent, ErrorMsgComponent]
})
export class StartModule { }
