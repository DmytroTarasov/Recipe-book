import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit() {
        // try to get the userData from the localStorage and authenticate the user automatically whenever the page reloads
        this.authService.autoLogin();   
    }
}
