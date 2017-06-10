import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { QA } from './qa';
import { QAService } from './qa.service';

@Injectable()
export class ResolverService implements Resolve<QA>{

    constructor(public db: AngularFireDatabase, private qaServ: QAService) { }
    

    resolve(route: ActivatedRouteSnapshot):Observable<QA> {
        this.qaServ.current = +route.params['id'];
        console.log("resolver current", this.qaServ.current );

        return this.db.object('qa/' + this.qaServ.current)
                .first();
    }
    
}