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

  handled = [
    '150',
    '150 ',
    '150p',
    '150 p ',
    '150m',
    '150 m ',
    '15ó',
    '15 ó ',
    '15h',
    '15 h ',
    '15:',
    '15 : ',
    '1.5',
    '1.5 ',
    '1,5',
    '1,5 ',
    '1.5ó',
    '1.5 ó ',
    '1,5ó',
    '1,5 ó ',
    '1.5h',
    '1.5 h ',
    '1,5h',
    '1,5 h ',
    '1ó15',
    '1 ó 15',
    '1ó96',
    '1 ó 96 ',
    '1h15',
    '1 h 15',
    '1h96',
    '1 h 96 ',
    '1ó15p',
    '1 ó 15p',
    '1ó96p',
    '1 ó 96 p',
    '1h15m',
    '1 h 15m',
    '1h96m',
    '1 h 96 m',
    '1 15',
    '1:',
    // ':1'
  ];
  
  constructor() {
    setInterval(() => this.disabledDuration += 1, 1000);
  }
}
