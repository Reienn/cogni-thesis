import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService, Case } from '../../services/cases.service';
import { AuthenticationService, User } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html'
})
export class CasesListComponent implements OnInit {

  user: User;

  cases: Case[];
  currentCase: number;
  loading = true;

  errorMsg: string;

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

  onImageLoad(index: number) {
    if (index >= this.cases.length - 1 ) {
      this.loading = false;
    }
  }

  toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement ) {
      if (elem && elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document && document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  private getCases() {
    this.casesService.getCases().then(
      (val) => {
        this.cases = val.cases;
        this.currentCase = val.currentCase ? val.currentCase : 0;
      },
      (err) => {
        this.errorMsg = err;
      }
    );
  }

}
