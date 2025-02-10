import { Injectable } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient, LiveStreamingTranscodingConfig, ICameraVideoTrack, IMicrophoneAudioTrack, ScreenVideoTrackInitConfig, VideoEncoderConfiguration, AREAS, IRemoteAudioTrack, ClientRole } from 'agora-rtc-sdk-ng';
import { BehaviorSubject } from 'rxjs';
import { IRtc, IUser } from '../models';
@Injectable({
  providedIn: 'root'
})
export class StreamService {
  rtc: IRtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };

  // const appID = '970CA35de60c44645bbae8a215061b33';
  // const appCertificate = '5CFd2fd1755d40ecb72977518be15d3b';
  // const channelName = '7d72365eb983485397e3e3f9d460bdda';
  // const uid = 2882341273;
  // const account = "2882341273";

  options = {
    appId: '',  // set your appid here
    channel: '', // Set the channel name.
    // token: '', // Pass a token if your project enables the App Certificate.
    uid: null
  };
  remoteUsers: IUser[] = [];       // To add remote users in list
  updateUserInfo = new BehaviorSubject<any>(null); // to update remote users name
  liveUsersList = [];

  constructor() { }

  createRTCClient(type) {
    if (type == 'live') {
      this.rtc.client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });

    } else {
      this.rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });
    }
  }

  // comment it if you don't want virtual camera
  async switchCamera(label: string, localTracks: ICameraVideoTrack) {
    const cams = await AgoraRTC.getCameras(); //  all cameras devices you can use
    const currentCam = cams.find(cam => cam.label === label);
    console.log(currentCam,cams, 'currentCam');
    // await localTracks.setDevice(currentCam.deviceId);
  }

  // To join a call with tracks (video or audio)
  async localUser(token: string, uuid: number, type: string) {
    if (type == 'live') {
      await this.rtc.client.setClientRole('audience');
    }
    await this.rtc.client.join(this.options.appId, this.options.channel,
      token, uuid);


    if (type != 'live') {
      // Create an audio track from the audio sampled by a microphone.
      this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // Create a video track from the video captured by a camera.
      this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: '120p',
      });
      // comment it if you want to use your camera
      this.switchCamera('OBS Virtual Camera', this.rtc.localVideoTrack);
      // Publish the local audio and video tracks to the channel.
      // this.rtc.localAudioTrack.play();
      this.rtc.localVideoTrack.play('local-player');
      // channel for other users to subscribe to it.
      await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);
    }
  }

  agoraServerEvents(rtc: IRtc) {

    rtc.client.on('user-published', async (user, mediaType) => {
      console.log(user, mediaType, 'user-published');

      await rtc.client.subscribe(user, mediaType);
      if (mediaType === 'video') {
        const remoteVideoTrack = user.videoTrack;

        setTimeout(() => {
          remoteVideoTrack.play('remote-playerlist' + user.uid);
        }, 100);

      }
      if (mediaType === 'audio') {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
    });

    rtc.client.on('user-joined', (user) => {
      const id = user.uid;
      this.remoteUsers.push({ uid: +id });
      this.liveUsersList.push({ uid: +id });
      this.updateUserInfo.next(id);
      console.log('user-joined', user, this.remoteUsers, 'event1');
    });

    rtc.client.on('user-left', (user) => {
      console.log('user-left', user, 'event3');
      this.removeUser(user.uid);

    });
  }

  removeUser (uuid) {
    this.remoteUsers =  this.remoteUsers.filter(obj=> obj.uid!=uuid);

  }
  
  // To leave channel-
  async leaveCall() {
    // Destroy the local audio and video tracks.
    this.rtc.localAudioTrack.close();
    this.rtc.localVideoTrack.close();
    // Traverse all remote users.
    this.rtc.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV container.
      const playerContainer = document.getElementById('remote-playerlist' + user.uid.toString());
      playerContainer && playerContainer.remove();
    });
    // Leave the channel.
    await this.rtc.client.leave();

  }



}

