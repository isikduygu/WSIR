import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookRecommendationService {

  private readonly baseUrl = 'http://localhost:5000/api';

  constructor(private readonly http: HttpClient) { }

  getBookRecommendations(id: string) {
    return this.http.get<any>(`${this.baseUrl}/bookRecommendation/${id}`);
  }
  
}