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
  showAPlusFlag = false;
  bookmark = false;
  qOnly:boolean;

  constructor(private route: ActivatedRoute, private qaServ: QAService) { 
    route.data.pluck('qa')
        .subscribe(obj => { this.qa = <QA>obj;
          this.showAFlag = false;
          
          //if not in history
          if (this.qaServ.viewed.indexOf(this.qaServ.current) == -1) { 
            this.bookmark = false;
            this.qOnly = true;  //haven't viewed answer yet
            
          }

          //if in history
          else {
            let result = this.qaServ.viewedQAList.filter(el => el.index == this.qaServ.current);
            this.bookmark = result[0]['bookmark'];
            this.qOnly = result[0]['qOnly'];
          }
          
        } );
  }

  
  newQA() {
    this.showAFlag = false;
    this.showAPlusFlag = false;
    //this.bookmark = false;
    this.qaServ.newQA();
  }
  
  showAnswer(){
    this.showAFlag = true;
    this.qOnly = false;
    this.saveOrUpdate();

       
  }
  
  rejectQuestion() {

    this.saveOrUpdate();
    this.showAFlag = false;
    this.showAPlusFlag = false;
    this.qaServ.newQA();
  }
  
  setBookmark(checked:boolean) {
  
    this.bookmark = checked;
    this.saveOrUpdate();
    
  }   
  
  
  saveOrUpdate() {
  
      //save only if not in viewed list yet
      if (this.qaServ.viewed.indexOf(this.qaServ.current) == -1)
          { this.postToServer(); }
      
      else { this.updateServer() }
    
  }
      

  postToServer()  {  
       let q = this.qa.tag['q'];
       let a = this.qa.tag['a'];
       let tag = { q, a};
       let index = this.qaServ.current;
       let bookmark = this.bookmark
       let qOnly = this.qOnly;
       const temp:ViewedQA = { tag, index, bookmark, qOnly };
       this.qaServ.postViewedObject(temp);
  }
  
  updateServer() {
     let result = this.qaServ.viewedQAList.filter(el => el.index == this.qaServ.current);
     let key = result[0]['$key'];
     let bookmark = this.bookmark;
     let qOnly = this.qOnly;
     this.qaServ.viewedQAList$.update(key, { bookmark, qOnly });
     
  }   
      
  

}
