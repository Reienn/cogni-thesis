import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CasesService } from '../../services/cases.service';
import { TaskContent } from '../../models/task-content.data';
import { Subscription } from 'rxjs';
import { Performance } from '../../models/game-data.data';

const TASKS_NUMBER = 4;

interface TasksPoints {
  [key: number]: number;
}
@Component({
  selector: 'app-game-task',
  templateUrl: './game-task.component.html'
})
export class GameTaskComponent implements OnInit, OnDestroy {

  caseId: number;
  currentTask = 1;
  dynamicTasksContent: TaskContent;

  caseIdSubscription: Subscription;
  performance: Performance[] = [];
  pointsSum = 0;
  tasksPoints: TasksPoints = {1: 0, 2: 0, 3: 0, 4: 0};
  maxPoints: TasksPoints;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private casesService: CasesService) { }

  ngOnInit() {
    this.getCaseId();
  }

  ngOnDestroy() {
    if (this.caseIdSubscription) {
      this.caseIdSubscription.unsubscribe();
    }
  }

  nextTask(id) {
    this.performance.push({
      case: this.caseId,
      task: this.currentTask,
      timestamp: new Date(),
      points: this.tasksPoints[this.currentTask],
      maxPoints: this.maxPoints[this.currentTask]
    });
    if (id < TASKS_NUMBER) {
      this.currentTask++;
    } else if (id === TASKS_NUMBER) {
      this.casesService.completedCase(this.caseId, this.performance);
      this.router.navigate(['gameplay']);
    }
  }

  updatePoints(change) {
    this.pointsSum += change;
    this.tasksPoints[this.currentTask] += change;
    this.changeDetector.detectChanges();
  }

  private getCaseId() {
    this.caseIdSubscription = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.caseId = +params['id'];
        this.getCaseTasksContent(this.caseId);
      }
    });
  }

  private getCaseTasksContent(caseId: number) {
    this.casesService.getDynamicTasksContent(caseId).then(tasksContent => {
      this.dynamicTasksContent = JSON.parse(JSON.stringify(tasksContent));
      this.maxPoints = {
        1: this.dynamicTasksContent.firstTask.notes.length,
        2: this.dynamicTasksContent.secondTask.clues.length,
        3: 1,
        4: this.dynamicTasksContent.fourthTask.exercises.length
      };
    });
  }
}
