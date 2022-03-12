import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subscription, take } from 'rxjs';

// https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // https://stackoverflow.com/questions/64350768/how-to-unsubscribe-a-rxjs-subscription-inside-the-subscribe-method
    this.auth.isAuthenticated$.pipe(take(1))
      .subscribe(status => {
        if (!status)
          this.router.navigateByUrl('/');
      });
    return this.auth.isAuthenticated$;
  }

}
