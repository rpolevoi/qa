import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import { QA, ViewedQA } from '../qa';
import { QAService } from '../qa.service';
import { UserService } from '../user.service';
import { HistoryService } from '../history.service';



@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {
  
  qa:QA;
  showAFlag = false;
  showAPlusFlag = false;
  bookmark = false;
  qOnly:boolean;
  loggedIn:boolean;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  @ViewChild('bkmk')
  bkmk: ElementRef;
   
  @ViewChild('colorbar')
  clrbar: ElementRef;
 

  constructor( private route: ActivatedRoute,
               private qaServ: QAService,
               private userServ: UserService,
               private historyServ: HistoryService
              ) { }

  
  ngOnInit() {
    
    //listen for historyReady event upon user login/logout
    //post current QA (if not in history) upon user login
        this.historyServ.historyReady$
          .takeUntil(this.ngUnsubscribe)
          .subscribe(ready => {
            ready ? this.loggedIn = true : this.loggedIn = false;
            console.log(this.historyServ.viewed);
            // if user logs in while a QA is diplayed, post the QA to server
            // if its not already in the viewed list
            //thus bookmark will work and history will include this QA
            if (this.loggedIn  && this.qa) {
                if (this.historyServ.viewed.indexOf(this.qaServ.current) == -1) {
                        this.bookmark = false;
                        this.qOnly = true;  //haven't viewed answer yet
                        console.log("should not be in history");
                        this.postToServer();
                }
           }
            
          });

        
        //subscription to data from resolver
        //deal with history for this qa if historyReady is true 
        this.route.data.pluck('qa')
          .do(qa => console.log("???"))
          .do(qa => this.qa = <QA>qa)
          .do(qa => console.log("??", qa))
          .do(qa => this.showAFlag = false)
          .do(qa => this.showAPlusFlag = false)
          //if history is ready (even if empty), post or load values -- if not ready, do nothing
          .subscribe(
                 _ => {  if (this.historyServ.historyReady$.getValue()) {
                        
                 
                 // if Not in history, post to server
                 if (this.historyServ.viewed.indexOf(this.qaServ.current) == -1) {
                        this.bookmark = false;
                        this.qOnly = true;  //haven't viewed answer yet
                        console.log("should not be in history");
                        this.postToServer();
                 }

                //if in history, no need to post but grab bookmark and qOnly status
                else {
                  let result = this.historyServ.viewedQAList.filter(el => el.index == this.qaServ.current);
                  this.bookmark = result[0]['bookmark'];
                  this.qOnly = result[0]['qOnly'];
                }

               }//end of outer if
                
            } ); //end of subscribe

    
  }// end of onInit

  
  newQA() {
    //this.showAFlag = false;
   // this.showAPlusFlag = false;
    this.qaServ.newQA();
    this.bkmk.nativeElement.scrollIntoView();
  }
  
  showAnswer(){
    
    this.clrbar.nativeElement.scrollIntoView(true);
    this.showAFlag = true;
    this.qOnly = false;
    if (this.userServ.isLoggedIn)
      { this.updateServer();}
      
  }
  
/*  rejectQuestion() {
    if (this.userServ.isLoggedIn)
      { this.updateServer();}
    this.showAFlag = false;
    this.showAPlusFlag = false;
    this.qaServ.newQA();
    this.bkmk.nativeElement.scrollIntoView();
  }*/
  
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
       this.historyServ.postViewedObject(temp);
      }
  }
  
  updateServer() {
     console.log("update to server");
     let result = this.historyServ.viewedQAList.filter(el => el.index == this.qaServ.current);
     let key = result[0]['$key'];
     //rewriting tags is pure hack to help address problem I can't yet understand
     //in which former tags are saved for the current QA
     //creating a history link with the wrong text, but no actual QA index duplication
     let q = this.qa.tag['q'];
     let a = this.qa.tag['a'];
     let tag = { q, a};
     let bookmark = this.bookmark;
     let qOnly = this.qOnly;
     this.historyServ.viewedQAList$.update(key, { tag, bookmark, qOnly });
     
  }
      
   ngOnDestroy() {
     
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}