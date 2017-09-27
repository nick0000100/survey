import { Component, OnInit } from '@angular/core';
import { PollService } from './../poll.service';
import { Router } from '@angular/router';
import { User } from './../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUser: User = new User();

  constructor(private _router: Router, private _pollService: PollService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.newUser)
    this._router.navigate(['/dashboard']);
    this._pollService.createUser(this.newUser);
    this.newUser = new User();
  }

}
