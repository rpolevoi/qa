import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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

//af is supposed to be public, but public keyword not strictly needed -- check on this
    constructor(private http: Http, private router: Router, public af: AngularFire) {
        
        this.getQALength(); 
        //this.getViewedList();
        this.viewedQAList$ = af.database.list('/users/rob/viewedObj');
        this.viewedQAList$
                .first()
                .subscribe(
                    
                    list => {
                        
                        if(!list) {this.viewed = []; }
                        
                        else {
                            for (let i=0; i<list.length; i++ ) {
                                this.viewed.push(list[i]['index']);
                                console.log(list[i]['index']);
                                }
                        }
                        console.log(this.viewed);
                    }
                );
    }
  
    resolve(route: ActivatedRouteSnapshot):Observable<QA> {
        return this.http.get('https://qaproject-c3e87.firebaseio.com/qa/' + this.current + '.json')
               .map(response => response.json());
        
    }

    newQA() {

        this.randomCurrent();

        for (;;) {
          if (this.viewed.indexOf(this.current) == -1) break;
          this.randomCurrent();
        }
        
        this.viewed.push(this.current);
        console.log(this.current);
        console.log(this.viewed);
        


        this.router.navigate(['display', this.current]);

    }

    private getQALength() {

            this.http.get('https://qaproject-c3e87.firebaseio.com/length.json')
               .map(response => response.json())
               .subscribe(num => this.length = num);
    
    }
  
    private randomCurrent() {

        this.current = Math.floor(Math.random() * this.length);
    }
    


    postViewedObject(obj:ViewedQA){
     const items = this.af.database.list('/users/rob/viewedObj');
        items.push(obj);
    }
}
