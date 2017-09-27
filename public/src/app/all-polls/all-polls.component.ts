import { Component, OnInit } from '@angular/core';
import { PollService } from './../poll.service';
import { Router } from '@angular/router';
import { Poll } from './../poll';

@Component({
  selector: 'app-all-polls',
  templateUrl: './all-polls.component.html',
  styleUrls: ['./all-polls.component.css']
})
export class AllPollsComponent implements OnInit {

  allPolls: Array<Poll> = [];
  currentUserId: String;
  searchStr: String = '';

  constructor(private _router: Router, private _pollService: PollService) { }

  ngOnInit() {
    this.getPolls();
    this.getCurrentUser();
  }

  // Retrieves all of the polls.
  getPolls() {
    this._pollService.getPolls()
    .then(polls => {
      this.allPolls = polls;
      console.log(this.allPolls, "@@@@@@@@@@@@@@@@@@@@@@@@@");
    }).catch(err => {
      console.log(err);
    })
  }

  // Logs the user out and redirects to login page.
  logout() {
    this._pollService.logOut();
    this._router.navigate(['']);
  }

  delete(poll) {
    this._pollService.delete(poll);
    this.getPolls();
  }

  // Gets the current user's id
  getCurrentUser() {
    this._pollService.getCurrentUser()
    .then(user => {
      console.log(user, "get current user")
      this.currentUserId = user.id;
    }).catch(err => {
      console.log(err);
    })
  }

}
