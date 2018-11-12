import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CasesService } from '../../services/cases.service';
import { TaskContent } from '../../models/TaskContent.data';
import { Subscription } from 'rxjs';

const TASKS_NUMBER = 4;
const TASKS_CONTENT = require('../../../../assets/tasks-content.json');
@Component({
  selector: 'app-game-task',
  templateUrl: './game-task.component.html'
})
export class GameTaskComponent implements OnInit, OnDestroy {

  caseId: number;
  currentTask: number;
  tasksContent: TaskContent[];

  caseIdSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private casesService: CasesService) { }

  ngOnInit() {
    this.getCaseId();
    this.currentTask = 1;
    this.tasksContent = JSON.parse(JSON.stringify(TASKS_CONTENT));
  }

  ngOnDestroy(): void {
    if (this.caseIdSubscription) {
      this.caseIdSubscription.unsubscribe();
    }
  }

  nextTask(id) {
    if (id < TASKS_NUMBER) {
      this.currentTask++;
    } else if (id === TASKS_NUMBER) {
      this.casesService.completedCase(this.caseId);
      this.router.navigate(['gameplay']);
    }
  }

  private getCaseId() {
    this.caseIdSubscription = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.caseId = params['id'];
      }
    });
  }
}
