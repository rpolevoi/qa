import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/pluck';
import { QA, ViewedQA } from '../qa';
import { QAService } from '../qa.service';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  
  qa:QA;
  showAFlag = false;
  session:number[] = [];
  bookmark = false;

  constructor(private route: ActivatedRoute, private qaServ: QAService) { 
    route.data.pluck('qa')
        .subscribe(obj => { this.qa = <QA>obj;
          console.log("here", obj);
          this.showAFlag = false;
          this.session.push(obj['q']);
          console.log(this.session);
        } );
  }

  ngOnInit() { console.log("init!");
  }
  
  newQA() {
    this.qaServ.newQA();
  }
  
  showAnswer(){
    this.showAFlag = true;
    let tag = this.qa.tag;
    let index = this.qaServ.current;
    let bookmark = this.bookmark;
    const temp:ViewedQA = { tag, index, bookmark };
    this.qaServ.postViewedObject(temp);
  }
  
  toggleBookmark() {
     this.bookmark = !this.bookmark;
    
  }

}
