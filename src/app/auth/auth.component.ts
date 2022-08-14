import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    // ViewChild here will find the place in the template (DOM) where the PlaceholderDirective is used for the first time
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective; 

    private closeSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit(): void { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }
        const email = authForm.value.email;
        const password = authForm.value.password;

        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        // deprecated variant

        // authObs.subscribe(responseData => {
        //     console.log(responseData);
        //     this.isLoading = false;
        // }, errorMessage => {
        //     this.error = errorMessage;
        //     this.isLoading = false;
        // });

        authObs.subscribe({
            next: (responseData) => {
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error: (errorMessage) => {
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            },
        });

        authForm.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef; // 'alertHost' is a custom directive - PlaceholderDirective which we have created manually. This directive also exposes the viewContainerRef property (publicly defined in the constructor)

        hostViewContainerRef.clear(); // clear all content that was rendered in that hostViewContainerRef before

        // create a new instance of an AlertComponent dynamically (programmatically)
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    // here, we call unsubscribe() to avoid memory leaks if we managed somehow leave the AuthComponent when the AlertComponent was shown (but this is actually impossible here in our app) 
    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}
