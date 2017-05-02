import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    
    user$:Observable<any>;
    isLoggedIn = false;

    
      constructor(public af: AngularFire) {
          this.user$ = this.af.auth;
          
             this.user$.subscribe(user =>
                user ? this.isLoggedIn = true : this.isLoggedIn = false
            );
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
