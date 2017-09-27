import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

import { LoginComponent } from './login/login.component';
import { AllPollsComponent } from './all-polls/all-polls.component';
import { CurrentPollComponent } from './current-poll/current-poll.component';
import { CreatePollComponent } from './create-poll/create-poll.component';

import { PollService } from './poll.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    LoginComponent,
    AllPollsComponent,
    CurrentPollComponent,
    CreatePollComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
