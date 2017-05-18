import { Component } from '@angular/core';
import { QAService } from '../qa.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private qaServ: QAService) { }

  
  toDisplay() {
    this.qaServ.newQA();
  }

}
