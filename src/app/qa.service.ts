import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import { QA, ViewedQA } from './qa';

@Injectable()
export class QAService {

    length:number;
    current:number = null;
    viewed:number[] = [];
    viewedQAList:ViewedQA[] = [];
   // userID:string;
    //Reference to Observable needed for update call in DisplayComponent
    //all other uses of current list through viewedQAList array 
    viewedQAList$: FirebaseListObservable<any>;

    


    constructor(
                private router: Router,
                public db: AngularFireDatabase,
                public userServ: UserService
                )
    {
            
        
      this.getQALength();                
    
      //need to udate access to history with each change of user status                
      this.userServ.user$.subscribe( _ => {
            
        if(!this.userServ.isLoggedIn) {
            
            this.viewedQAList = [];
            this.viewedQAList$ = null;
                    
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
                            }
                            
                            else {
                                for (let i=0; i<list.length; i++ ) {
                                    if (this.viewed.indexOf(list[i]['index']) == -1)
                                        {this.viewed.push(list[i]['index']);}
                                    }
                                }//end of for
                                console.log(this.viewed);
                                this.viewedQAList = list;
                            }//end of inner else
                        );//end of subscribe
        }//end of outer else
      });//end of outer subscribe
    }//end of constructor
  


    newQA() {
        
        if( this.viewedQAList && this.viewedQAList.length == this.length) {
            console.log('all questions in history');
            
        }

        else {
            
            this.randomCurrent();
    
            for (;;) {
              if (this.viewed.indexOf(this.current) == -1) break;
              this.randomCurrent();
            }
            
    
            this.router.navigate(['display', this.current]);
        }

    }

    private getQALength() {

              this.db.object('/length')
                .first()
                .do(x => console.log("length", x))
                .map(obj => obj['$value'])
                .subscribe(num => this.length = num);
    
    }
  
    private randomCurrent() {

        this.current = Math.floor(Math.random() * this.length);
    }
    


    postViewedObject(obj:ViewedQA){
        
    if(this.userServ.userID)
        {
          const items = this.db.list('/users/' + this.userServ.userID + '/viewed');
          items.push(obj);
        }
    }
}
