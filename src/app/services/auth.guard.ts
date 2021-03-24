import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap( state => { // The tap operator trigger a secondary effect
        if ( !state ) { this.router.navigate(['/login']); }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap( state => { // The tap operator trigger a secondary effect
        if ( !state ) { this.router.navigate(['/login']); }
      }),
      take(1) // cancelo la subscripción despues de que se resuelve 
    );
  }
}
