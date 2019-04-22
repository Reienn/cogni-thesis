import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../../../auth/services/authentication.service';
import { ControlService } from '../../services/control.service';
import { Player } from '../../models/player.data';
import { SourceTaskData } from 'src/app/gameplay/models/task-content.data';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html'
})
export class ControlPanelComponent implements OnInit {

  user: User;
  players: Player[];
  selectedPlayer: Player;
  loading = true;
  showSurvey = false;
  showSettings = false;
  showGamePerformance = false;
  showGameSettings = false;
  visualizationType: string;

  constructor(private authenticationService: AuthenticationService,
              private controlService: ControlService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    this.controlService.getPlayers().then(players => {
      this.players = players;
      this.loading = false;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  updatedUser(user) {
    this.user = user;
  }

  updateTaskData(taskData: SourceTaskData) {
    this.selectedPlayer.customTaskData = taskData;
  }
}
