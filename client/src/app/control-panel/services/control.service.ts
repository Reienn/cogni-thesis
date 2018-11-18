import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private http: HttpClient) { }

  getPlayers(): Promise<any> {
    return this.http.get<any>('http://localhost:3000/players-performance')
    .pipe(map((players: any) => {
      if (players) {
        return players;
      } else {
        return false;
      }
    })).toPromise();
  }
}
