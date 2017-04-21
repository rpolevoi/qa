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
  flag = true;

  constructor(private route: ActivatedRoute, private qaServ: QAService) { 
    route.data.pluck('qa')
        .subscribe(obj => { this.qa = <QA>obj;
          this.flag = !this.flag;
          console.log(this.flag);} );
  }

  ngOnInit() { console.log("init!");
  }
  
  toDisplay() {
    this.qaServ.newQA();
  }

}
