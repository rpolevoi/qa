import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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
    userID:string;
    //Reference to Observable needed for update call in DisplayComponent
    //all other uses of current list through viewedQAList array 
    viewedQAList$: FirebaseListObservable<any>;

    


    constructor(
                private router: Router,
                public af: AngularFire,
                public userServ: UserService
                )
     {
            
        
        this.getQALength();                
                    
        this.userServ.user$.subscribe(user => {
            
                if(!user) { this.userID = null;
                            this.viewedQAList = [];
                            this.viewedQAList$ = null;
                            
                    
                }
                
                else { Observable.of(user.uid)
                        .do(uid => this.userID = uid)
                        .do(uid => this.viewedQAList$ = af.database.list('/users/' + uid + '/viewed', { query: { orderByKey: true }}))
                        .switchMap(uid =>  af.database.list('/users/' + uid + '/viewed', { query: { orderByKey: true }}) )
                        //.do(list => console.log("list here", list))
                        .subscribe(
                    
                            list => {
                            
                                if(!list) {
                                    this.viewed = []; 
                                    this.viewedQAList = [];    
                                }
                            
                                else {
                                    for (let i=0; i<list.length; i++ ) {
                                        if (this.viewed.indexOf(list[i]['index']) == -1)
                                        {
                                            this.viewed.push(list[i]['index']);
                                        }
                                    }
                                }
                                console.log(this.viewed);
                                this.viewedQAList = list;
                                
                            }
                        );//end of inner subscribe
                    }//end of else { Observable.of(user.uid)
                
            });//end of outer subscribe
    }
  


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

              this.af.database.object('/length')
                .first()
                .do(x => console.log("length", x))
                .map(obj => obj['$value'])
                .do(console.log)
                .subscribe(num => this.length = num);
    
    }
  
    private randomCurrent() {

        this.current = Math.floor(Math.random() * this.length);
    }
    


    postViewedObject(obj:ViewedQA){
        
    if(this.userID)
        {
          const items = this.af.database.list('/users/' + this.userID + '/viewed');
          items.push(obj);
        }
    }
}
