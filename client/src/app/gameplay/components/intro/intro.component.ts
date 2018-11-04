import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService, Case } from '../../services/cases.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  cases: Case[];

  constructor(
    private router: Router,
    private casesService: CasesService
  ) { }

  ngOnInit() {
    this.getCases();
  }

  selectCase(id) {
    this.router.navigate(['/gameplay', id]);
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
