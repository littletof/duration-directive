import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxDurationInputService {
  numRegx = '[0-9]*';
  decimalRegx = `[0-9]*[\\.,][0-9]*[1-9][0-9]*`;
  spaceRegx = `[\\s]*`;
  hrRegx = `${this.spaceRegx}[óÓhH:]${this.spaceRegx}`; // TODO : handle differently ( 1: -> 1ó engedjük e), :15 nem parsolja
  minRegx = `${this.spaceRegx}[pPmM]${this.spaceRegx}`;

  justNumbers = `^${this.numRegx}${this.spaceRegx}$`; // 150 -> 150 perc
  numbersWithMinPostfix = `^${this.numRegx}${this.spaceRegx}${this.minRegx}${this.spaceRegx}$`; // 150p -> 150 perc
  numbersWithHourPostfix = `^${this.numRegx}${this.spaceRegx}${this.hrRegx}${this.spaceRegx}$`; // 2ó -> 120 perc
  decimalNumbers = `^${this.decimalRegx}${this.spaceRegx}$`; // 1.5 -> 90 perc
  decimalNumbersWithHourPostfix = `^${this.decimalRegx}${this.spaceRegx}${this.hrRegx}${this.spaceRegx}$`; // 1.5ó -> 90 perc
  numbersWithHourInfix = `^${this.numRegx}${this.hrRegx}${this.numRegx}${this.spaceRegx}$`; // 1ó15 -> 75 perc
  numbersWithWhitespaceInfix = `^${this.numRegx}${this.spaceRegx}${this.numRegx}${this.spaceRegx}$`; // 1 15 -> 75 perc
  numbersWithAllPostfix = `^${this.numRegx}${this.hrRegx}${this.numRegx}${this.minRegx}$`; // 1ó15p -> 75 perc

  durationRegex =
    `(` +
    [
      this.justNumbers,
      this.numbersWithMinPostfix,
      this.numbersWithHourPostfix,
      this.decimalNumbers,
      this.decimalNumbersWithHourPostfix,
      this.numbersWithHourInfix,
      this.numbersWithWhitespaceInfix,
      this.numbersWithAllPostfix
    ].join(')|(') +
    `)`;

  constructor() {}

  getDurationString(duration: number): string {
    if (isNaN(duration)) {
      return null;
    }

    let value = '';
    const hr = Math.floor(duration / 60);
    const min = duration - 60 * hr;

    if (hr) {
      // value = `${hr} ${this.translateService.instant('HOUR_SHORT')}`;
      value = `${hr} h`;
    }

    if (hr && min) {
      value += ' ';
    }

    if (min || duration === 0) {
      // value += `${min} ${this.translateService.instant('MINUTE_SHORT')}`;
      value += `${min} m`;
    }

    return value;
  }

  parseDurationString(value: string | number): number | null {
    value = `${value} `.trim();

    if (this.isEmptyString(value)) {
      return;
    }

    // convert to <x>h<y> format
    if (value.match(this.justNumbers)) {
      // 150 -> 150 perc
      value = `0h${value}`;
    } else if (value.match(this.numbersWithMinPostfix)) {
      // 150p -> 150 perc
      value = `0h${this.removeMin(value)}`;
    } else if (value.match(this.numbersWithHourPostfix)) {
      // 2ó -> 120 perc
      value = `${this.removeHour(value)}h0`;
    } else if (value.match(this.decimalNumbers)) {
      // 1.5 -> 90 perc
      value = `${this.stdizeSeparator(value)}h0`;
    } else if (value.match(this.decimalNumbersWithHourPostfix)) {
      // 1.5ó -> 90 perc
      value = `${this.removeHour(this.stdizeSeparator(value))}h0`;
    } else if (value.match(this.numbersWithHourInfix)) {
      // 1ó15 1:15 -> 75 perc
      value = this.stdizeHour(value);
    } else if (value.match(this.numbersWithWhitespaceInfix)) {
      // 1 15 -> 75 perc
      value = value
        .toLocaleLowerCase()
        .split(/\s+/)
        .join('h');
    } else if (value.match(this.numbersWithAllPostfix)) {
      // 1ó15p -> 75 perc
      value = this.removeMin(value.toLocaleLowerCase().replace('ó', 'h'));
    } else {
      return;
    }

    const values = value.split('h');
    const hr = parseFloat(values[0].trim());
    const min = parseFloat(values[1].trim());

    return Math.ceil(hr * 60) + min;
  }

  isParseable(value: string): boolean {
    if (this.isEmptyString(value)) {
      return false;
    }
    return !!value.match(this.durationRegex);
  }

  private isEmptyString(value: string | number){
    return `${value} `.trim() === '';
  }

  private stdizeSeparator(value: string): string {
    return value.replace(',', '.');
  }

  private stdizeHour(value: string): string {
    return value
      .toLocaleLowerCase()
      .replace('ó', 'h')
      .replace(':', 'h');
  }

  private removeMin(value: string): string {
    return value
      .toLocaleLowerCase()
      .replace('p', '')
      .replace('m', '');
  }

  private removeHour(value: string): string {
    return value
      .toLocaleLowerCase()
      .replace('ó', '')
      .replace('h', '')
      .replace(':', '');
  }
}

