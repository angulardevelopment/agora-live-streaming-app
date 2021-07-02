import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StreamService } from '../services/stream.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  constructor(public stream: StreamService, public api: ApiService) { }

  ngOnInit(): void {
  }

  async joinLiveCall() {
    const uid = this.api.generateUid();
    const rtcDetails = await this.api.generateTokenAndUid(uid);
    this.stream.createRTCClient('live');
    this.stream.agoraServerEvents(this.stream.rtc);
    await this.stream.localUser(rtcDetails.token, uid, 'live');


}
}
