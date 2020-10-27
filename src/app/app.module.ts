import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { RegModule } from './reg/reg.module';
import { FormsModule } from '@angular/forms';
import { JwtGuard } from './jwt.guard';
import { BonusModule } from './bonus/bonus.module';
import { JwtInterceptor } from './jwt.interceptor';
import { LaunchModule } from './launch/launch.module';
import { JoinModule } from './join/join.module';
import { WatchModule } from './watch/watch.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    RegModule,
    BonusModule,
    LaunchModule,
    JoinModule,
    WatchModule
  ],
  providers: [
    AuthService,
    JwtGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
