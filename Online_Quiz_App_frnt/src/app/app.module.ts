import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { NgModule } from '@angular/core';

@NgModule({
  // ...
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // other providers...
  ],
})
export class AppModule {}
