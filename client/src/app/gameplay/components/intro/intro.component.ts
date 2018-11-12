import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService, Case } from '../../services/cases.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html'
})
export class IntroComponent implements OnInit, OnDestroy {

  userName: string;

  cases: Case[];

  userSubscription: Subscription;

  constructor(
    private router: Router,
    private casesService: CasesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getCases();

    this.userSubscription = this.authenticationService.authUser().subscribe(
      user => {
        this.userName = user.user.user.name;
      },
      err => {
        this.authenticationService.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
        this.cases = val;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
