import { Component, OnInit } from '@angular/core';
import { Poll } from './../poll'
import { PollService } from './../poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  newPoll: Poll = new Poll();

  constructor(private _router: Router, private _pollService: PollService) { }

  ngOnInit() {
  }

  // Creates a new poll with the given information.
  createPoll() {
    this._pollService.createPoll(this.newPoll);
    this._router.navigate(['/dashboard']);

  }

}
