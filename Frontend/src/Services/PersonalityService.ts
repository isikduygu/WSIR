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

  sendResults(answers: number[]): Observable<PersonalityResult> {
    const body = { answers };
    return this.http.post(`${this.baseUrl}/calculate_big_five_scores`, body)
      .pipe(
        map((result: any) => {
          // Create a PersonalityResult object manually
          const personalityResult: PersonalityResult = {
            extraversion: result.extraversion,
            agreeableness: result.agreeableness,
            conscientiousness: result.conscientiousness,
            neuroticism: result.neuroticism,
            openness: result.openness,
          };
          return personalityResult;
        })
      );
  }
  
}
