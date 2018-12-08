import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService, Case } from '../../services/cases.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html'
})
export class IntroComponent implements OnInit {

  user;

  cases: Case[];
  currentCase: number;

  showAbout = false;

  constructor(
    private router: Router,
    private casesService: CasesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getCases();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  selectCase(id) {
    this.router.navigate(['/gameplay', id]);
  }

  logout() {
    this.authenticationService.logout();
  }

  private getCases() {
    this.casesService.getCases().then(
      (val) => {
        this.cases = val.cases;
        this.currentCase = val.currentCase ? val.currentCase : 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
