import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'duration-directive';

  duration = 150;

  disabledDuration = 0;
  
  constructor() {
    setInterval(() => this.disabledDuration += 1, 1000);
  }
}
