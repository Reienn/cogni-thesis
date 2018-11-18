import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html'
})
export class ControlPanelComponent implements OnInit {

  user;
  players;
  selectedPlayer;

  constructor(private authenticationService: AuthenticationService,
              private controlService: ControlService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.controlService.getPlayers().then(players => {
      this.players = JSON.parse(JSON.stringify(players));
    });
  }

  selectPlayer(name) {
    let selectedPlayer;
    selectedPlayer = this.players.find(item => item.name === name);
    if (selectedPlayer.performance && selectedPlayer.performance.length) {
      selectedPlayer.performance = selectedPlayer.performance.map(item => {
        item.percent = (100 * item.points / item.maxPoints).toFixed(2);
        return item;
      });
      this.selectedPlayer = JSON.parse(JSON.stringify(selectedPlayer));
    } else {
      this.selectedPlayer = null;
    }
  }

  logout() {
    this.authenticationService.logout();
  }
}
