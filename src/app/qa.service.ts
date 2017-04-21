import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { QA } from './qa';

@Injectable()
export class QAService implements Resolve<QA>{

    length:number;
    current:number;
    viewed = [];


    constructor(private http: Http, private router: Router) {
        
        this.getQALength(); 
        this.getViewedList();
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
    
    private getViewedList() {
 
            this.http.get('https://qaproject-c3e87.firebaseio.com/users/rob/viewed.json')
               .map(response => response.json())
               .subscribe(list => { this.viewed = list || []; console.log(this.viewed);})
    
    }
  

}
