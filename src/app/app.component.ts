import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'video-app';
  hide = true;
  constructor(private router: Router) {

  }
  open(value) {
    if (value != 3) {
      this.router.navigate([`/user/${value}`]);
      this.hide = false;
    }
    else {
      this.router.navigate([`/live`]);
      this.hide = false;
    }
  }
}
