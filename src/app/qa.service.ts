import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { QA, ViewedQA } from './qa';

@Injectable()
export class QAService implements Resolve<QA>{

    length:number;
    current:number;
    viewed:number[] = [];
    viewedQAList$: FirebaseListObservable<any>;
    viewedQAList:ViewedQA[] = [];

    constructor(private http: Http, private router: Router, public af: AngularFire) {
        
        this.getQALength();
        
        //connect to viewed history -- will subscribe in history component template
        this.viewedQAList$ = af.database.list('/users/rob/viewed', { query: { orderByKey: true }});
        
        // set up subscription to user's viewed list, 
        this.viewedQAList$
                //.first()
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
                                if (this.viewed.indexOf(list[i]['index']) == -1){
                                    this.viewed.push(list[i]['index']);
                                    console.log(list[i]['index']);
                                    //console.log(list[i]['$key']);
                                }
                            }
                        }
                        console.log(this.viewed);
                        this.viewedQAList = list;
                    }
                );
    }
  
    resolve(route: ActivatedRouteSnapshot):Observable<QA> {
        this.current = +route.params['id'];

        return this.af.database.object('qa/' + this.current)
                .first();

                
        //probably no advantage over:
         //return this.http.get('https://qaproject-c3e87.firebaseio.com/qa/' + this.current + '.json')
               //.map(response => response.json());
               
               
        
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

           // this.http.get('https://qaproject-c3e87.firebaseio.com/length.json')
              // .map(response => response.json())
              
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
        
     const items = this.af.database.list('/users/rob/viewed');
        items.push(obj);
    }
}
