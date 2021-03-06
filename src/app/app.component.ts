import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { UserService } from './user.service';
import { QAService } from './qa.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnDestroy, OnInit {
  
    displayName:string;
    loggedIn = false;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
 
    
  //NOTE -- QAService injected only to log out current value at this point
      constructor(public userServ: UserService, private qaServ: QAService) { 
        
        
      }


//!!NOTE!! the unscription here is not needed because the life of the component coterminous with
//that of the app.  But I stick it in to preserve the practice for reference
//THIS SHOULD MEAN that subscriptions in services are not needed, but need to think about this!!

 ngOnInit() {
 
        this.userServ.user$
          .takeUntil(this.ngUnsubscribe)
          .subscribe(user => {
            if(user){ 
              this.loggedIn = true;
              this.displayName = this.userServ.displayName;
            }
            else { this.loggedIn = false }
          });  


  }
              
  login() {
    this.userServ.login();
  }
 
  logout() {
    this.userServ.logout();
  }
  
 
  
   ngOnDestroy() {
     
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

   
}
