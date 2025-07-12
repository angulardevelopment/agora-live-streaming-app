import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StreamService } from '../services/stream.service';
import { TokenInfo } from '../models';

@Component({
    selector: 'app-live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss'],
    standalone: false
})
export class LiveComponent implements OnInit {
  // liveUser: TokenInfo = { uid: 0, token: '' };

  constructor(public stream: StreamService, public api: ApiService, public common: CommonService) { }

  ngOnInit(): void {
    const t = this.common.getRoute();
    console.log(t, 't');
    if(t.includes('live')){
      // this.liveUser.uid = 2882341275;
      // this.liveUser.token = '00648b158ccc64343cf9973a8f5df311f2aIACu7HdQ4zXX+QVGAlWeGVGmzWxIbpWLFCVaPcaZep7hgrdIfRBiBTIMIgACm1hboTZ+ZwQAAQAx83xnAgAx83xnAwAx83xnBAAx83xn';
      // this.common.userCheck = 'live';
    }
  }

  ngAfterViewInit() {

  }

  async joinLiveCall() {
    try {
      const uid = this.common.generateUid();
      const rtcDetails = await this.common.generateTokenAndUid(uid);
      this.stream.createRTCClient('live');
      this.stream.agoraServerEvents(this.stream.rtc);
      await this.stream.localUser(rtcDetails.token, uid, 'live');
//       if(this.common.userCheck == 'live'){
// await this.stream.localUser(this.liveUser.token, this.liveUser.uid, 'live');
//       }
    } catch (error) {
      console.log(error, 'error');
    }

  }

  async leave(){
    this.stream.liveUsersList = [];
    await this.stream.leaveCall();
  }
}
