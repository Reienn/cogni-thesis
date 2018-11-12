import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule} from '@angular/material';

import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { NewPlayerComponent } from './components/new-player/new-player.component';
import { PlayersComponent } from './components/players/players.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatsComponent } from './components/stats/stats.component';

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
    MatButtonModule
  ],
  declarations: [ControlPanelComponent, NewPlayerComponent, PlayersComponent, SettingsComponent, StatsComponent]
})
export class ControlPanelModule { }
