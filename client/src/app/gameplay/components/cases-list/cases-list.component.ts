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

  pointsSum: number;

  constructor(
    private router: Router,
    private casesService: CasesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getCases();
    this.user = this.authenticationService.getUser();
    this.pointsSum = this.user.bestScores && this.user.bestScores.length ?
                     this.user.bestScores.reduce((partialSum, a) => partialSum + a) : 0;
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
    this.casesService.getCases().then( data => {
      if (data) {
        this.cases = data.cases;
        this.currentCase = data.currentCase ? data.currentCase : 0;
      } else {
        this.errorMsg = 'Nie udało się pobrać listy spraw.';
      }
    });
  }

}
