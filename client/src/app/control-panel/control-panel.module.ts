import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { NewPlayerComponent } from './components/new-player/new-player.component';
import { PlayersComponent } from './components/players/players.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ControlPanelComponent, NewPlayerComponent, PlayersComponent, SettingsComponent, StatsComponent]
})
export class ControlPanelModule { }
