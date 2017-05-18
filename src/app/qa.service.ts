import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { HistoryService } from './history.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { QA, ViewedQA } from './qa';

@Injectable()
export class QAService {

    length:number;
    current:number = null;

    constructor (
                private router: Router,
                public db: AngularFireDatabase,
                public historyServ: HistoryService
                )
                
                { this.getQALength(); }
    
 
  


    newQA() {
        
        if( this.historyServ.viewedQAList && this.historyServ.viewedQAList.length == this.length) {
            console.log('all questions in history');
            window.alert("No more questions in database!!");
            
        }

        else {
            
            this.randomCurrent();
    
            for (;;) {
              if (this.historyServ.viewed.indexOf(this.current) == -1) break;
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
    
}