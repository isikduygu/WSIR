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

  sendResults(name: string, age:string, rate: string, answers: number[]): Observable<PersonalityResult> {
    const body = { name ,age,rate,answers };
    return this.http.post(`${this.baseUrl}/calculate_big_five_scores`, body)
      .pipe(
        map((result: any) => {
          // Create a PersonalityResult object manually
          const personalityResult: PersonalityResult = {
            name: result.name,
            age: result.age,
            id: result.id,
            rate: result.rate,
            personalityType : result.personalityType
          };
          return personalityResult;
        })
      );
  }
  getPersonalityResult(id: string) {
    return this.http.get<any>(`${this.baseUrl}/personalityResult/${id}`);
  }
  
}
