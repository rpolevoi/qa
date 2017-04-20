import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
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


  constructor(private http: Http) { this.getQALength(); }
  
  resolve(route: ActivatedRouteSnapshot):Observable<QA> { return Observable.of({q: "q", a: "a"}); }



    private getQALength() {

            this.http.get('https://qaproject-c3e87.firebaseio.com/length.json')
               .map(response => response.json())
               .subscribe(num => {this.length = num; console.log(this.length);} );
    
  }
  

}
