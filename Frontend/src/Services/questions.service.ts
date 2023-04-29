import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionResponse } from 'src/Interfaces/QuestionResponse';

@Injectable({
    providedIn: 'root'
  })
export class QuestionsService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'http://localhost:5000/api';

  getQuestions(page: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}/questions`
    const params = { page: String(page), page_size: String(pageSize) };
    return this.http.get<QuestionResponse>(url, { params }).pipe(map(response => response.questions));
    }
}
