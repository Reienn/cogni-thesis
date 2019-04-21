import { Component, EventEmitter, Output, HostListener } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {

  @Output() modalClose = new EventEmitter<boolean>();

  allImg = 9;
  currentImg = 1;
  labels = {
    1: 'Panel gracza: lista spraw',
    2: 'Panel gracza: instrukcja do zadania',
    3: 'Panel gracza: zadanie 1. (szczegóły sprawy)',
    4: 'Panel gracza: zadanie 2. (poszukiwanie śladów)',
    5: 'Panel gracza: zadanie 3. (wskazanie sprawcy)',
    6: 'Panel gracza: zadanie 4. (uzyskanie kodu do sejfu)',
    7: 'Panel nauczyciela: lista graczy',
    8: 'Panel nauczyciela: statystyki gracza',
    9: 'Panel nauczyciela: edycja treści gry'
  };

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.next();
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.prev();
    }
  }

  constructor() { }

  next() {
    this.currentImg = this.currentImg < this.allImg ? this.currentImg + 1 : 1;
  }

  prev() {
    this.currentImg = this.currentImg > 1 ? this.currentImg - 1 : this.allImg;
  }

}
