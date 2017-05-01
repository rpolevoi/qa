import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import { QA, ViewedQA } from './qa';

@Injectable()
export class QAService implements Resolve<QA>{

    length:number;
    current:number;
    viewed:number[] = [];
    //Reference to Observable needed for update call in DisplayComponent
    //all other uses of current list through the array assigned in subscription
    viewedQAList$: FirebaseListObservable<any>;
    viewedQAList:ViewedQA[] = [];
    userID:string;

    constructor(private http: Http,
                private router: Router,
                public af: AngularFire,
                public userServ: UserService) {
                    
       // this.viewedQAList$ = af.database.list('/users/' + uid + '/viewed', { query: { orderByKey: true }})
                    
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
                        .do(list => console.log("list here", list))
                        .subscribe(
                    
                            list => {
                            console.log(list);
                            
                            
                            if(!list) {
                                this.viewed = []; 
                                this.viewedQAList = [];    
                            }
                        
                            else {
                                console.log(list);
                                for (let i=0; i<list.length; i++ ) {
                                    if (this.viewed.indexOf(list[i]['index']) == -1)
                                    {
                                        this.viewed.push(list[i]['index']);
                                        console.log(list[i]['index']);
                                    }
                                }//end of for
                            }// end of else
                            console.log(this.viewed);
                            this.viewedQAList = list;
                            }//end of list => {
                        );//end of inner subscribe
                    }//end of else { Observable.of(user.uid)
                
            });//end of outer subscribe
 
    }//end of constructor
  
    resolve(route: ActivatedRouteSnapshot):Observable<QA> {
        this.current = +route.params['id'];

        return this.af.database.object('qa/' + this.current)
                .first();
    }

    newQA() {

        this.randomCurrent();

        for (;;) {
          if (this.viewed.indexOf(this.current) == -1) break;
          this.randomCurrent();
        }

        this.router.navigate(['display', this.current]);

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
        
     const items = this.af.database.list('/users/' + this.userID + '/viewed');
        items.push(obj);
    }
}
