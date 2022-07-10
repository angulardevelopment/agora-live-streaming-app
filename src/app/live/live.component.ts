import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StreamService } from '../services/stream.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  constructor(public stream: StreamService, public api: ApiService, public common: CommonService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    console.log(this.stream.liveUsersList, 'liveUsersList');

  }

  async joinLiveCall() {
    try {
      const uid = this.common.generateUid();
      const rtcDetails = await this.common.generateTokenAndUid(uid);
      this.stream.createRTCClient('live');
      this.stream.agoraServerEvents(this.stream.rtc);
      await this.stream.localUser(rtcDetails.token, uid, 'live');
    } catch (error) {
      console.log(error, 'error');
    }

  }
}
