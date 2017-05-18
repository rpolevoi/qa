
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import { QA, ViewedQA } from './qa';

@Injectable()
export class HistoryService {

    viewed:number[] = [];
    viewedQAList:ViewedQA[] = [];

    //Reference to Observable needed for update call in DisplayComponent
    //all other uses of current list through viewedQAList array
    viewedQAList$: FirebaseListObservable<any>;

    historyReady$ = new BehaviorSubject(false);


    constructor(
                public db: AngularFireDatabase,
                public userServ: UserService
                )

      { this.userServ.user$.subscribe( _ => {
            
        if(!this.userServ.isLoggedIn) {
            
            this.viewedQAList = [];
            this.viewedQAList$ = null;
            this.historyReady$.next(false);
                    
        }
                
        else { Observable.of(this.userServ.userID)
                    
                    .do(uid => this.viewedQAList$ = db.list('/users/' + uid + '/viewed', { query: { orderByKey: true }}))
                    .switchMap(uid =>  db.list('/users/' + uid + '/viewed', { query: { orderByKey: true }}) )
                    .subscribe(
                    
                        list => {
                            console.log(list);
                            if(!list) {
                                this.viewed = [];
                                this.viewedQAList = [];
                                this.historyReady$.next(true);
                                console.log(this.historyReady$.getValue());
                                
                            }
                            
                            else {
                                for (let i=0; i<list.length; i++ ) {
                                    if (this.viewed.indexOf(list[i]['index']) == -1)
                                        {this.viewed.push(list[i]['index']);}
                                    }
                                }//end of for
                                console.log(this.viewed);
                                this.viewedQAList = list;
                                this.historyReady$.next(true);
                                console.log(this.historyReady$.getValue());
                            }//end of inner else
                          //end of subsribe function body -- MISSING BEFORE- AM I NUTS?
                        );//end of subscribe
        }//end of outer else
      });//end of outer subscribe
    }//end of constructor
  


  postViewedObject(obj:ViewedQA){
        
    if(this.userServ.userID)
        {
          const items = this.db.list('/users/' + this.userServ.userID + '/viewed');
          items.push(obj);
        }
    }






}//end of HistoryService