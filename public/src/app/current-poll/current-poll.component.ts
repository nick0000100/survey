import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from './../poll.service';
import { Router } from '@angular/router';
import { Poll } from './../poll';

@Component({
  selector: 'app-current-poll',
  templateUrl: './current-poll.component.html',
  styleUrls: ['./current-poll.component.css']
})
export class CurrentPollComponent implements OnInit {

  currentPollId: String = "";
  currentPoll: Poll;

  constructor(private _router: Router, private _pollService: PollService, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe(params => {
      this.currentPollId = params.get('id');
    })
  }

  ngOnInit() {
    this.findPoll();
  }

  findPoll(){
    this._pollService.findPoll({pollId: this.currentPollId})
    .then(poll => {
      this.currentPoll = poll;
      console.log(this.currentPoll)
    }).catch(err => {
      console.log(err);
    })
  }

  vote(option) {
    this._pollService.updateVotes({pollId: this.currentPollId, option: option})
    this.findPoll();
  }

}
