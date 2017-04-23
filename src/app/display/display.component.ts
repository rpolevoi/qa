import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/pluck';
import { QA } from '../qa';
import { QAService } from '../qa.service';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  
  qa:QA;
  showAnswer = false;
  session:number[] = [];

  constructor(private route: ActivatedRoute, private qaServ: QAService) { 
    route.data.pluck('qa')
        .subscribe(obj => { this.qa = <QA>obj;
          this.showAnswer = false;
          this.session.push(obj['q']);
          console.log(this.session);
        } );
  }

  ngOnInit() { console.log("init!");
  }
  
  newQA() {
    this.qaServ.newQA();
  }

}
