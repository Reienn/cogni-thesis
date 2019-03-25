import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { CasesService } from '../../services/cases.service';
import { TaskContent } from '../../models/task-content.data';
import { Subscription } from 'rxjs';
import { Performance } from '../../models/game-data.data';

const AUDIO_SET = [
  'click',
  'failure',
  'correct'
];
const TASKS_NUMBER = 4;
const TASKS_HEADERS = [
  {id: 1, text: 'Uzupełnij szczegóły sprawy', icon: 'comment'},
  {id: 2, text: 'Odszukaj poszlaki', icon: 'search'},
  {id: 3, text: 'Wskaż sprawcę', icon: 'user'},
  {id: 4, text: 'Odzyskaj skradziony przedmiot', icon: 'key'}
];

interface TasksPoints {
  [key: number]: number;
}
@Component({
  selector: 'app-game-task',
  templateUrl: './game-task.component.html',
  animations: [
    trigger('add', [
      transition('noChange => add', [
        animate('0.7s', keyframes([
          style({background: '#eee', transform: 'scale(1)'}),
          style({background: '#b9ffb0', transform: 'scale(1.3)'}),
          style({background: '#eee', transform: 'scale(1)'})
        ]))
      ])
    ]),
    trigger('lose', [
      transition('noChange => lose', [
        animate('1s', keyframes([
          style({background: '#eee', transform: 'scale(1)'}),
          style({background: '#ffb0b0', transform: 'scale(1.3)'}),
          style({background: '#eee', transform: 'scale(1)'})
        ]))
      ])
    ])
  ]
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

  addPoint = false;
  losePoint = false;
  showHelp = true;

  tasksHeaders = TASKS_HEADERS;
  sounds: {
    [key: string]: any
  } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private casesService: CasesService) { }

  ngOnInit() {
    this.getCaseId();
    this.loadSounds();
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
      this.showHelp = true;
      this.changeDetector.detectChanges();
    } else if (id === TASKS_NUMBER) {
      this.casesService.completedCase(this.caseId, this.performance).then(data => {
        this.router.navigate(['gameplay']);
      });
    }
  }

  updatePoints(change) {
    this.addPoint = false;
    this.losePoint = false;
    this.pointsSum += change;
    this.tasksPoints[this.currentTask] += change;
    this.changeDetector.detectChanges();
    this.addPoint = change > 0 ? true : false;
    this.losePoint = change < 0 ? true : false;
    this.changeDetector.detectChanges();
    if (change > 0) {
      this.sounds.correct.play();
    }
    if (change < 0) {
      this.sounds.failure.play();
    }
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

  private loadSounds() {
    AUDIO_SET.forEach(sound => {
      this.sounds[sound] = new Audio();
      this.sounds[sound].src = `assets/audio/${sound}.mp3`;
      this.sounds[sound].load();
    });
  }
}
