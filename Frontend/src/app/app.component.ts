import { Component } from '@angular/core';
import { PersonalityResult } from 'src/Interfaces/PersonalityResult';
import { PersonalityService } from 'src/Services/PersonalityService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WSIR';

  results: PersonalityResult[] = [];
  names: string[] = ['Beetty'];
  personalityTest: string[] = ['BABAAAABAAAAAAABAAAABBAAAAAABAAAABABAABAAABABABAABAAAAAABAAAAAABAAAAAA'];

  constructor(private readonly personalityService: PersonalityService) { }

  currentPageNumber = 0
  questionsPerPage = 1
  selectedAnswer: any
    questions = [
      {
        "id": 1,
        "text": "Kalabalık bir etkinlikte:",
        "choices": [
          {"a": "Yabancılar da dahil olmak üzere birçok kişiyle iletişim kurarım."},
          {"b": "Sadece tanıdığım insanlarla iletişim kurarım."}
        ]
      },
      {
        "id": 2,
        "text": "Kalabalık bir etkinlikte:",
        "choices": [
          {"a": "Yabancılar da dahil olmak üzere birçok kişiyle iletişim kurarım."},
          {"b": "Sadece tanıdığım insanlarla iletişim kurarım."}
        ]
      },
      {
        "id": 3,
        "text": "Kalabalık bir etkinlikte:",
        "choices": [
          {"a": "Yabancılar da dahil olmak üzere birçok kişiyle iletişim kurarım."},
          {"b": "Sadece tanıdığım insanlarla iletişim kurarım."}
        ]
      }
    ]
    onSubmit() {
      const selectedAnswers: any[] = [];
      this.questions.forEach(question => {
        const selectedAnswer = document.querySelector(`input[name="${question.id}"]:checked`);
        selectedAnswers.push(selectedAnswer!.attributes[2].value);
      });
      console.log(selectedAnswers); // do something with the selected answers

       // call the service to get the results
       this.personalityService.sendResults(this.names, this.personalityTest)
       .subscribe((results: PersonalityResult[]) => {
         this.results = results;
         console.log(this.results)
       });
    }
}