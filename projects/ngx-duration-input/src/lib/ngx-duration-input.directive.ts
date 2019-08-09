import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { NgxDurationInputService } from './ngx-duration-input.service';

@Directive({
  selector: '[ngxDuration]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxDurationInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgxDurationInputDirective),
      multi: true
    }
  ]
})
export class NgxDurationInputDirective implements ControlValueAccessor, Validator {
  onChangeCallback = (_: any) => {};
  onTouchedCallback = () => {};

  constructor(
    private durationService: NgxDurationInputService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  @HostListener('blur', ['$event.target.value']) blur(value: any) {
    this.updateValue(value);
    this.onTouchedCallback();
  }

  @HostListener('keyup.enter', ['$event.target.value']) enter(value: any) {
    this.updateValue(value);
  }

  updateValue(value: string) {
    // update display value
    this.writeValue(value);

    // updates ngModel value based on input
    this.onChangeCallback(this.durationService.parseDurationString(value));
  }

  validate(_: AbstractControl): ValidationErrors | null {
    const inputValue: string = this.elementRef.nativeElement.value.trim();
    const parsable = this.durationService.isParseable(inputValue);

    // if has notnull input and its not parsable
    if (!!inputValue && !parsable) {
      return { pattern: true };
    } else {
      return null;
    }
  }

  /** Writes the display value into the input. ControlValueAccessor */
  writeValue(inputValue: any): void {
    const parsedValue = this.durationService.parseDurationString(inputValue);

    let displayValue;
    // tslint:disable-next-line:prefer-conditional-expression
    if (inputValue === '0' || !!parsedValue) {
      // if input is 0 or parseable
      displayValue = this.durationService.getDurationString(parsedValue);
    } else {
      displayValue = !inputValue ? '' : (inputValue + '').trim();
    }

    this.renderer.setProperty(this.elementRef.nativeElement, 'value', displayValue);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
