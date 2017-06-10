import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
  noteQ = "";
  noteA = "";
  loggedIn = false;
  qForm:FormGroup;
  qControl:FormControl;
  aForm:FormGroup;
  aControl:FormControl;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  @ViewChild('bkmk')
  bkmk: ElementRef;
   
  @ViewChild('colorbar')
  clrbar: ElementRef;
 

  constructor( private route: ActivatedRoute,
               private qaServ: QAService,
               private userServ: UserService,
               private historyServ: HistoryService
              )
    {
        //let fb = new FormBuilder();
 
        //this.qForm = fb.group({noteQ: ['']});
       // this.aForm = fb.group({noteA: ['']}); 
        
        this.qControl = new FormControl({value: '', disabled: true });
        this.qForm= new FormGroup({ noteQ: this.qControl  });

        this.qForm.valueChanges
         .subscribe((value) => {
           this.noteQ = value.noteQ;
           this.updateServer();
           });
           
        this.aControl = new FormControl({value: '', disabled: true });
        this.aForm= new FormGroup({ noteA: this.aControl  });   

        this.aForm.valueChanges
         .subscribe((value) => {
           this.noteA = value.noteA;
           this.updateServer();
           });           
  }//end of constructor

  
  ngOnInit() {
    
    //listen for historyReady event upon user login/logout
    //post current QA (if not in history) upon user login
        this.historyServ.historyReady$
          .takeUntil(this.ngUnsubscribe)
          .subscribe(ready => {
            ready ? this.loggedIn = true : this.loggedIn = false;
            if(this.loggedIn) {
                this.qControl.reset({value: '', disabled: false},{emitEvent: false});
                this.aControl.reset({value: '', disabled: false},{emitEvent: false});
                }
            else  {
                this.qControl.reset({value: 'logged-in only', disabled: true},{emitEvent: false});
                this.aControl.reset({value: 'logged-in only', disabled: true},{emitEvent: false});
                }  
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
                else {
                  let result = this.historyServ.viewedQAList.filter(el => el.index == this.qaServ.current);
                  this.bookmark = result[0]['bookmark'];
                  this.qOnly = result[0]['qOnly'];
                  this.noteQ = result[0]['noteQ'];
                  this.qForm.reset({ noteQ: this.noteQ}, {emitEvent: false});
                  this.noteA = result[0]['noteA'];
                  this.aForm.reset({ noteA: this.noteA}, {emitEvent: false});
                }
           }
            
          });

        
        //subscription to data from resolver
        //deal with history for this qa if historyReady is true 
        this.route.data.pluck('qa')
          .do(qa => this.qa = <QA>qa)
          .do(qa => console.log("??", qa))
          .do(qa => this.showAFlag = false)
          .do(qa => this.showAPlusFlag = false)
          .do(qa => this.qOnly = true)
          .do(qa => this.noteQ = "")
          .do(qa => this.noteA = "")
          .subscribe(
              _ => { 
                //clear form with generating a form event   
               this.qForm.reset({}, {emitEvent: false});
               this.aForm.reset({}, {emitEvent: false});

         //if history is ready (even if empty), post or load values -- if not ready, do nothing               
               if (this.historyServ.historyReady$.getValue()) {
                        
                 
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
                  this.noteQ = result[0]['noteQ'];
                  this.qForm.reset({ noteQ: this.noteQ}, {emitEvent: false});
                  this.noteA = result[0]['noteA'];
                  this.aForm.reset({ noteA: this.noteA}, {emitEvent: false});
                }

               }//end of outer if
                
            } ); //end of subscribe

    
  }// end of onInit

  
  newQA() {
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
       let noteQ = this.noteQ;
       let noteA = this.noteA;
       const temp:ViewedQA = { tag, index, bookmark, qOnly, noteQ, noteA };
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
     let noteQ = this.noteQ;
     let noteA = this.noteA;
     this.historyServ.viewedQAList$.update(key, { tag, bookmark, qOnly, noteQ, noteA });
     
  }
      
   ngOnDestroy() {
     
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}