import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SourceTaskData } from '../../gameplay/models/task-content.data';

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
}
