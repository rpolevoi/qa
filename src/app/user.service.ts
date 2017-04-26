import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    
    user$:Observable<any>;
    //user = {};
   // flag = false;
    
      constructor(public af: AngularFire) {
          this.user$ = this.af.auth;
          
/*          this.user$
            .subscribe(user => {
              this.user = user;
              user ? this.flag = true : this.flag = false;
              console.log("serv", this.flag);   
            });*/
      }
  
  
 login() {
    this.af.auth.login({
      provider: AuthProviders.Google
    });
  }
 
  logout() {
    this.af.auth.logout();
  }

}
