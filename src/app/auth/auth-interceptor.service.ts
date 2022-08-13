import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
// this interceptor is used to attach a token to each outgoing request
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 'take()' here, in the pipe(), indicates that we want to get the 1 value, the last one user from the Observable and then automatically unsubscribe from this Observable
        return this.authService.user.pipe(
            take(1),
            // exhaustMap() is yet another rxjs operator. It waits for the first Observable (user Observable in this case) and then passes the 'user' object which comes from this first Observable as an argument to the second (http) Observable and this http Observable (the second one) will be eventually returned from this fetchRecipes() function. So, map() and tap() operators here will be applied to the second(http) Observable
            // exhaustMap() will automatically unsubscribe from the first (user) Observable
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
