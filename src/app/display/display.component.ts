import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/pluck';
import { QA, ViewedQA } from '../qa';
import { QAService } from '../qa.service';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  
  qa:QA;
  showAFlag = false;
  bookmark = false;

  constructor(private route: ActivatedRoute, private qaServ: QAService) { 
    route.data.pluck('qa')
        .subscribe(obj => { this.qa = <QA>obj;
          console.log("here", obj);
          this.showAFlag = false;
        } );
  }

  
  newQA() {
    this.bookmark = false;
    this.qaServ.newQA();
  }
  
  showAnswer(){
    this.showAFlag = true;
    this.saveOrUpdate(false);
       
  }
  
  rejectQuestion() {
    this.bookmark = false;
    this.saveOrUpdate(true);
    this.qaServ.newQA();
  }
  
  
  saveOrUpdate(qOnly:boolean) {
  
      //save only if not in viewed list yet
      if (this.qaServ.viewed.indexOf(this.qaServ.current) == -1)
          {this.postToServer(qOnly);}
      
      else { this.updateServer(this.bookmark, qOnly) }
      
  }
      

  postToServer(qOnly:boolean)  {  
       let q = this.qa.tag['q'];
       let a = this.qa.tag['a'];
       let tag = { q, a};
       let index = this.qaServ.current;
       let bookmark = this.bookmark
       const temp:ViewedQA = { tag, index, bookmark, qOnly };
       this.qaServ.postViewedObject(temp);
  }
  
  updateServer(bookmark:boolean, qOnly:boolean) {
     let result = this.qaServ.viewedQAList.filter(el => el.index == this.qaServ.current);
     let key = result[0]['$key'];
     this.qaServ.viewedQAList$.update(key, { bookmark, qOnly });
     
  }   
      
  

}
