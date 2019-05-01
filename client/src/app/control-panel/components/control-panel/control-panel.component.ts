import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../../../auth/services/authentication.service';
import { ControlService } from '../../services/control.service';
import { Player } from '../../models/player.data';
import { SourceTaskData } from '../../../gameplay/models/task-content.data';
import * as moment from 'moment';

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

  showExportButton: boolean;

  constructor(private authenticationService: AuthenticationService,
              private controlService: ControlService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    this.controlService.getPlayers().then(players => {
      this.players = players;
      this.showExportButton = !!this.players.find(el => !!el.performance && !!el.performance.length);
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

  export() {
    const allData = [];
    this.players.forEach(player => {
      if (player.performance && player.performance.length) {
        const performance = player.performance.map(el => ({
          'Gracz': player.name,
          'Data': moment(el.timestamp).format('DD.MM.YYYY HH:mm'),
          'Sprawa': el.case,
          'Zadanie': el.task,
          'Punkty': el.points,
          'Max': el.maxPoints,
          'Poprawność (punkty / max)': +(el.points / el.maxPoints).toFixed(2)

        }));
        allData.push(...performance);
      }
    });
    this.controlService.exportAsExcelFile(allData, 'stytystyki_gry');
  }
}
