import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SourceTaskData } from '../../gameplay/models/task-content.data';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private http: HttpClient) { }

  getPlayers(): Promise<any> {
    return this.http.get<any>(environment.baseUrl + '/api/players-performance')
    .pipe(map((players: any) => {
      if (players) {
        return players;
      } else {
        return false;
      }
    })).toPromise();
  }

  updateCustomTaskData(playerName: string, taskData: SourceTaskData, type: string): Promise<any> {
    return this.http.post<any>(environment.baseUrl + '/api/custom-task-data',
      {playerName: playerName, customTaskData: taskData, type: type})
      .pipe(map((response: any) => {
        return response;
      }), catchError((err) => {
        throw(err.error);
      })
    ).toPromise();
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'dane': worksheet }, SheetNames: ['dane'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
