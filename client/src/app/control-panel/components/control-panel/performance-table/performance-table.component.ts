import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-performance-table',
  templateUrl: './performance-table.component.html'
})
export class PerformanceTableComponent implements OnInit {

  @Input() set performance(value: any) {
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
  }

}
