import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

import { StartModule } from '../start/start.module';

import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { NewPlayerComponent } from './components/new-player/new-player.component';
import { PlayersComponent } from './components/players/players.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatsComponent } from './components/stats/stats.component';
import { ControlService } from './services/control.service';
import { PerformanceTableComponent } from './components/control-panel/performance-table/performance-table.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ControlPanelComponent
  },
  {
    path: 'new-player',
    component: NewPlayerComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  },
  {
    path: 'settings/:id',
    component: SettingsComponent
  },
  {
    path: 'stats/:id',
    component: StatsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    StartModule
  ],
  declarations: [ControlPanelComponent, NewPlayerComponent, PlayersComponent, SettingsComponent, StatsComponent, PerformanceTableComponent],
  providers: [
    ControlService
  ]
})
export class ControlPanelModule { }
