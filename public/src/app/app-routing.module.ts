import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AllPollsComponent } from './all-polls/all-polls.component'
import { CreatePollComponent } from './create-poll/create-poll.component'
import { CurrentPollComponent } from './current-poll/current-poll.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: AllPollsComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: CreatePollComponent
  },
  {
    path: 'poll/:id',
    pathMatch: 'full',
    component: CurrentPollComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
