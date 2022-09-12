import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
// this interceptor is used to attach a token to each outgoing request
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 'take()' here, in the pipe(), indicates that we want to get the 1 value, the last one user from the Observable and then automatically unsubscribe from this Observable
        return this.store.select('auth').pipe(
            take(1),
            // exhaustMap() is yet another rxjs operator. It waits for the first Observable (user Observable in this case) and then passes the 'authState' object which comes from this first Observable as an argument to the second (map) Observable. 
            // exhaustMap() will automatically unsubscribe from the previous (take, map) Observables
            map(authState => authState.user),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({ params: new HttpParams().set('auth', user.token) });
                return next.handle(modifiedRequest);
            })
        );
    }
}
