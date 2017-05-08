import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  
    user$: Observable<firebase.User>;
    isLoggedIn = false;
    userID:string;

    
      constructor(public afAuth: AngularFireAuth) {
          this.user$ = this.afAuth.authState;
          
             this.user$.subscribe(user => {
               if(user) {
                 this.isLoggedIn = true;
                 this.userID = user.uid;
               }
               else {
                 this.isLoggedIn = false;
                 this.userID = null;
               }
             });
      }

  
      login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }  
     
      logout() {
        this.afAuth.auth.signOut();
      }

}
