import { Component, Input } from '@angular/core';

@Component({
  selector: 'answer-display',
  templateUrl: './answer-display.component.html',
  styleUrls: ['./answer-display.component.css']
})
export class AnswerDisplayComponent {

  constructor() { }

    @Input()
    answer: string;

}
