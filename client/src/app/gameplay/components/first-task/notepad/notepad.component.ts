import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Notes } from '../../../models/TaskContent.data';

const DRAGGABLE_GROUP = 'ANSWERS';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html'
})
export class NotepadComponent implements OnInit, OnDestroy {

  @Input() taskData: Notes[];
  @Output() taskCompleted = new EventEmitter<boolean>();

  isDragging = false;

  subs = new Subscription();

  constructor( private dragulaService: DragulaService ) {
    this.configureDragula();
  }

  ngOnInit() {
    this.dragulaSubscribe();
    this.taskData.map(item => { item.correct = false; item.empty = true; return item; });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.dragulaService.destroy(DRAGGABLE_GROUP);
  }

  private configureDragula() {
    this.dragulaService.createGroup(DRAGGABLE_GROUP, {
      accepts: (el, target): boolean => target.classList.contains('empty-placeholder')
    });
  }

  private isTaskCompleted() {
    if (!this.taskData.filter( item => !item.correct ).length) {
      this.taskCompleted.emit(true);
    } else {
      this.taskCompleted.emit(false);
    }
  }

  private dragulaSubscribe() {
    this.subs.add(this.dragulaService.drag(DRAGGABLE_GROUP)
      .subscribe( el  => {
        this.isDragging = true;
      })
    );
    this.subs.add(this.dragulaService.drop(DRAGGABLE_GROUP)
      .subscribe(({ el, target, source }) => {
        this.isDragging = false;
        const answer = <HTMLElement>el;
        const question = <HTMLElement>target;
        this.taskData.map( item => {
          if (item.id === +question.dataset.id) {
            item.correct = answer.dataset.id === question.dataset.id ? true : false;
            item.empty = false;
          }
          return item;
        });

        if (source.classList.contains('answer-placeholder')) {
          const leftPlaceholder = <HTMLElement>source;
          this.taskData.map( item => {
            if (item.id === +leftPlaceholder.dataset.id) {
              item.correct = false;
              item.empty = true;
            }
            return item;
          });
        }

        this.isTaskCompleted();
      })
    );
    this.subs.add(this.dragulaService.cancel(DRAGGABLE_GROUP)
      .subscribe( el  => {
        this.isDragging = false;
      })
    );
  }
}
