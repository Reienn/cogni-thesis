import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface Survey {
  likert: {[key: string]: number};
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  send(survey: Survey): Promise<any> {
    return this.http.post<any>(environment.baseUrl + '/api/survey', {survey: survey})
      .pipe(map((response: any) => {
        return response;
      }), catchError((err) => {
        throw(err.error);
      })
    ).toPromise();
  }
}
