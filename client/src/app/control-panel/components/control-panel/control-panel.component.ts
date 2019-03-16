import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../../../auth/services/authentication.service';
import { ControlService } from '../../services/control.service';
import { Performance } from '../../../gameplay/models/game-data.data';

interface PlayerPerformance extends Performance {
  ratio: string;
}
interface Player {
  name: string;
  performance: PlayerPerformance[];
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html'
})
export class ControlPanelComponent implements OnInit {

  user: User;
  players: Player[];
  selectedPlayer: Player;
  showAbout = false;

  constructor(private authenticationService: AuthenticationService,
              private controlService: ControlService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    this.controlService.getPlayers().then(players => {
      this.players = players;
    });
  }

  selectPlayer(name: string) {
    const selectedPlayer = this.players.find(item => item.name === name);
    if (selectedPlayer.performance && selectedPlayer.performance.length) {
      selectedPlayer.performance = selectedPlayer.performance.map(item => {
        item.ratio = (item.points / item.maxPoints).toFixed(2);
        return item;
      });
      this.selectedPlayer = selectedPlayer;
    } else {
      this.selectedPlayer = null;
    }
  }

  logout() {
    this.authenticationService.logout();
  }
}
