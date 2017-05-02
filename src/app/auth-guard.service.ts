import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private userServ: UserService,
    private router: Router) {}
  
  canActivate(): boolean {
    console.log('AuthGuard#canActivate called');
    
    if (this.userServ.isLoggedIn) { 
      console.log("guard passed" )
      return true; }
    
    this.router.navigate(['/home']);  
    return false;  
      
  }
  
  
}
