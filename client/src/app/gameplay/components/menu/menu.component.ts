import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  user: User;
  showSettings = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
  }

  logout() {
    if (document && document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
    this.authenticationService.logout();
  }

  play() {
    this.router.navigate(['gameplay/list']);
  }

  updatedUser(user) {
    this.user = user;
  }

  toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem && elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document && document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}
