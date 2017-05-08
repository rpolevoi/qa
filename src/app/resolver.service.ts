import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { QA, ViewedQA } from './qa';
import { QAService } from './qa.service';

@Injectable()
export class ResolverService implements Resolve<QA>{

        constructor(public db: AngularFireDatabase,
                    //public af: AngularFire,
                    private qaServ: QAService) { }

    resolve(route: ActivatedRouteSnapshot):Observable<QA> {
        this.qaServ.current = +route.params['id'];
        console.log("resolver");

        return this.db.object('qa/' + this.qaServ.current)
                .first();
    }
    
}