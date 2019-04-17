import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-performance-table',
  templateUrl: './performance-table.component.html'
})
export class PerformanceTableComponent implements OnInit {

  @Input() set performance(value: any) {
    value = value.map(item => {
      item.ratio = (item.points / item.maxPoints).toFixed(2);
      return item;
    });
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.firstPage();
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['timestamp', 'case', 'task', 'points', 'maxPoints', 'ratio'];
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
