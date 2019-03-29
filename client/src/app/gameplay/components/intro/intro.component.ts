import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService, Case } from '../../services/cases.service';
import { AuthenticationService, User } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html'
})
export class IntroComponent implements OnInit {

  user: User;

  cases: Case[];
  currentCase: number;

  constructor(
    private router: Router,
    private casesService: CasesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getCases();
    this.user = this.authenticationService.getUser();
  }

  selectCase(id: number) {
    this.router.navigate(['gameplay/list', id]);
  }

  back() {
    this.router.navigate(['gameplay']);
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
