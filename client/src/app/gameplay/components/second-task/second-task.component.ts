import { Component, OnInit, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { SecondTaskData } from '../../models/TaskContent.data';
@Component({
  selector: 'app-second-task',
  templateUrl: './second-task.component.html'
})
export class SecondTaskComponent extends AbstractTaskComponent implements OnInit, AfterViewInit {

  @Input() taskData: SecondTaskData;

  isCompleted = false;

  currentCommand = 0;
  svgSource: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private changeDetector: ChangeDetectorRef) {
    super();
    this.taskId = 2;
   }

  ngOnInit() {
    if (this.taskData && this.taskData.clues) {
      this.taskData.clues.map(item => { item.found = false; return item; });
    }
    this.svgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`../../../../assets/img/scenes/${this.taskData.scene}.svg`);
  }

  ngAfterViewInit() {
   this.accessSvgObjects();
  }

  itemClicked(item) {
    if (this.taskData.clues[this.currentCommand].item === item) {
      this.taskData.clues[this.currentCommand].found = true;
      if (this.currentCommand < this.taskData.clues.length - 1) {
        this.currentCommand++;
      } else {
        this.isCompleted = true;
      }
    }
    this.changeDetector.detectChanges();
  }

  private accessSvgObjects() {

    const sceneSvg = <HTMLObjectElement>document.getElementById('scene-object');
    sceneSvg.addEventListener('load', () => {
      const svgDoc = sceneSvg.contentDocument;
      Array.from(svgDoc.getElementsByClassName('interactive')).forEach(element => {
        element.addEventListener('click', event => this.itemClicked(element.id));
      });
    });

  }

}
