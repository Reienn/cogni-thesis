import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatMenuModule,
         MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';

import { StartModule } from '../start/start.module';
import { AuthModule } from '../auth/auth.module';
import { SurveyModule } from '../survey/survey.module';

import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { ControlService } from './services/control.service';
import { PerformanceTableComponent } from './components/control-panel/performance-table/performance-table.component';
import { PerformanceChartComponent } from './components/control-panel/performance-chart/performance-chart.component';
import { ModifyTasksComponent } from './components/modify-tasks/modify-tasks.component';
import { PlayersListComponent } from './components/control-panel/players-list/players-list.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ControlPanelComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    StartModule,
    AuthModule,
    SurveyModule
  ],
  declarations: [
    ControlPanelComponent,
    PerformanceTableComponent,
    PerformanceChartComponent,
    ModifyTasksComponent,
    PlayersListComponent
  ],
  providers: [
    ControlService
  ]
})
export class ControlPanelModule { }
