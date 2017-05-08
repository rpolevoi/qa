import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import { QA, ViewedQA } from '../qa';
import { QAService } from '../qa.service';
import { UserService } from '../user.service';



@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  
  qa:QA;
  showAFlag = false;
  showAPlusFlag = false;
  bookmark = false;
  qOnly:boolean;
  
   @ViewChild('bkmk')
   bkmk: ElementRef;
   
   @ViewChild('colorbar')
   clrbar: ElementRef;
 

  constructor(private route: ActivatedRoute,
              private qaServ: QAService,
              private userServ: UserService)
    {}
  
  ngOnInit() {
    
        this.route.data.pluck('qa')
          .do(qa => this.qa = <QA>qa)
          .do(qa => this.showAFlag = false)
          //.switchMap(_ => Observable.timer(500))
          .delay(500)
              .subscribe(
                 _ => {
                 
                 // after delay to load history  -- if Not in history, post to server
                 if (this.qaServ.viewed.indexOf(this.qaServ.current) == -1) {
                        this.bookmark = false;
                        this.qOnly = true;  //haven't viewed answer yet
                        console.log("should not be in history");
                        this.postToServer();
                 }

                //if in history, no need to post but grap bookmark and qOnly status
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
    this.qaServ.newQA();
    console.log("bk", this.bkmk);
    console.log("bkne", this.bkmk.nativeElement);
    this.bkmk.nativeElement.scrollIntoView();
  }
  
  showAnswer(){
    
            console.log("color", this.clrbar);
    console.log("cbne", this.clrbar.nativeElement);
    this.clrbar.nativeElement.scrollIntoView(true);
    this.showAFlag = true;


    this.qOnly = false;
    if (this.userServ.isLoggedIn)
      { this.updateServer();}
      
  
  }
  
  rejectQuestion() {
    if (this.userServ.isLoggedIn)
      { this.updateServer();}
    this.showAFlag = false;
    this.showAPlusFlag = false;
    this.qaServ.newQA();
    this.bkmk.nativeElement.scrollIntoView();
  }
  
  setBookmark(checked:boolean) {
  
    this.bookmark = checked;
    if (this.userServ.isLoggedIn)
      { this.updateServer();}
    
  }   
  
  postToServer()  { 
      if (this.userServ.isLoggedIn)
      {
        console.log("post to server");
       let q = this.qa.tag['q'];
       let a = this.qa.tag['a'];
       let tag = { q, a};
       let index = this.qaServ.current;
       let bookmark = this.bookmark
       let qOnly = this.qOnly;
       const temp:ViewedQA = { tag, index, bookmark, qOnly };
       this.qaServ.postViewedObject(temp);
      }
  }
  
  updateServer() {
     console.log("update to server");
     let result = this.qaServ.viewedQAList.filter(el => el.index == this.qaServ.current);
     let key = result[0]['$key'];
     let bookmark = this.bookmark;
     let qOnly = this.qOnly;
     this.qaServ.viewedQAList$.update(key, { bookmark, qOnly });
     
  }   
      


}
