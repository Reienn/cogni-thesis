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
  {id: 4, text: 'Odzyskaj skradziony przedmiot', icon: 'unlock-alt'}
];

const POINT_COLOR = '#f2b021';

interface TasksPoints {
  [key: number]: number;
}
@Component({
  selector: 'app-game-task',
  templateUrl: './game-task.component.html',
  animations: [
    trigger('add', [
      transition('noChange => add', [
        animate('1s', keyframes([
          style({color: POINT_COLOR, transform: 'scale(1)'}),
          style({color: '#9fe25d', transform: 'scale(1.3)'}),
          style({color: POINT_COLOR, transform: 'scale(1)'})
        ]))
      ])
    ]),
    trigger('lose', [
      transition('noChange => lose', [
        animate('1s', keyframes([
          style({color: POINT_COLOR, transform: 'scale(1)'}),
          style({color: '#ff7560', transform: 'scale(0.7)'}),
          style({color: POINT_COLOR, transform: 'scale(1)'})
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
  showHelp = false;

  errorMsg: string;

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
      this.casesService.completedCase(this.caseId, this.performance, this.pointsSum).then(data => {
        this.router.navigate(['gameplay/list']);
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
      this.errorMsg = null;
      this.showHelp = true;
    }).catch(err => {
      this.errorMsg = 'Nie udało się pobrać treści zadania.';
    });
  }

  private loadSounds() {
    AUDIO_SET.forEach(sound => {
      this.sounds[sound] = new Audio();
      this.sounds[sound].src = `assets/audio/${sound}.mp3`;
      this.sounds[sound].volume = 1;
      this.sounds[sound].load();
    });
  }
}
