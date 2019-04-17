import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Player } from '../../../models/player.data';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html'
})
export class PlayersListComponent implements OnInit {

  @Input() set players(value: Player[]) {
    value = value.map(el => {
      el.currentCase = el.currentCase ? el.currentCase : 0;
      el['pointsSum'] = el.bestScores && el.bestScores.length ? el.bestScores.reduce((a, b) => a + b ) : 0;
      el.lastActivityAt = el.lastActivityAt ? el.lastActivityAt :
        el.performance && el.performance.length ? Math.max(...el.performance.map(i => new Date(i.timestamp).getTime())) : null ;
      return el;
    });
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.firstPage();
    this.dataSource.sort = this.sort;
  }

  @Output() showGamePerformance = new EventEmitter<any>();
  @Output() showGameSettings = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'lastActivityAt', 'currentCase', 'pointsSum', 'gamePerformance', 'gameSettings'];
  dataSource: MatTableDataSource<any>;
  disableClear = true;

  constructor() { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Wierszy na stronę:';
    this.paginator._intl.firstPageLabel = 'Pierwsza strona';
    this.paginator._intl.previousPageLabel = 'Poprzednia strona';
    this.paginator._intl.nextPageLabel = 'Następna strona';
    this.paginator._intl.lastPageLabel = 'Ostatnia strona';
    this.paginator._intl.getRangeLabel = (page, pageSize, length) =>
    `${(page * pageSize) + 1} - ${(page * pageSize) + pageSize} z ${length}`;
  }

}
