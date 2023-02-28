import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonalityResult } from 'src/Interfaces/PersonalityResult';


@Injectable({
  providedIn: 'root'
})
export class PersonalityService {

  private readonly baseUrl = 'http://localhost:5000/api';

  constructor(private readonly http: HttpClient) { }

  sendResults(names: string[], personalityTest: string[]): Observable<PersonalityResult[]> {
    const body = { names, personalityTest };
    return this.http.post<PersonalityResult[]>(`${this.baseUrl}/personalityTest`, body)
      .pipe(
        map((results: PersonalityResult[]) => {
          // map the response to the interface
          return results.map(result => ({
            name: result.name,
            percentages: result.percentages,
            personalityType: result.personalityType
          }));
        })
      );
  }
}
