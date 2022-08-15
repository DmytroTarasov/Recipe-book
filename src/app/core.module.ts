import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

// This module contains all services of our application that doesn`t have ({providedIn: root}) specified inside them
// Then, all we need to do, is to add this module to the imports: [...] section in app.module
@NgModule({
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class CoreModule {}