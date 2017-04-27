import { Component, Input } from '@angular/core';

@Component({
  selector: 'question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent {

  constructor() { }


  
    @Input()
    question: string;

}
