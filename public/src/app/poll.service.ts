import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class PollService {

  constructor(private _http: Http) { }

  createUser(user) {
    return this._http.post('/createUser', user)
    .map(data => data.json())
    .toPromise();
  }

  createPoll(poll) {
    return this._http.post('/createPoll', poll)
    .map(data => data.json())
    .toPromise();
  }

  getPolls() {
    return this._http.get('/getPolls')
    .map(data => data.json())
    .toPromise();
  }

  getCurrentUser() {
    return this._http.get('/getCurrentUser')
    .map(data => data.json())
    .toPromise();
  }

  findPoll(pollId) {
    return this._http.post('/findPoll', pollId)
    .map(data => data.json())
    .toPromise();
  }

  updateVotes(pollData) {
    console.log(pollData)
    return this._http.post('/updatePoll', pollData)
    .map(data => data.json())
    .toPromise();
  }

  logOut() {
    return this._http.get('/logout')
    .map(data => data.json())
    .toPromise();
  }

  delete(poll) {
    return this._http.post('/delete', poll)
    .map(data => data.json())
    .toPromise();
  }

}
