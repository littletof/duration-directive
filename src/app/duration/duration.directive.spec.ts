import { DurationDirective } from './duration.directive';
import { Component, DebugElement, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Spied } from '../../../typings';
import { DurationService } from './duration.service';
import { TranslateModule } from '@ngx-translate/core';
import { AbstractControl } from '@angular/forms';

describe('DurationDirective', () => {
  let directive: DurationDirective;
  let init: () => void;
  let fixture: any;
  let input: DebugElement;
  let durationServiceMock: Spied<DurationService>;
  let rendererMock: Spied<Renderer2>;

  beforeEach(() => init());

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate wrong input', () => {
    const testValue = 'test';
    input.nativeElement.value = testValue;
    durationServiceMock.isParseable.and.returnValue(false);

    const validation = directive.validate(({ value: testValue } as any) as AbstractControl);

    expect(durationServiceMock.isParseable).toHaveBeenCalledWith(testValue);
    expect(validation).toEqual({ pattern: true });
  });

  it('should validate good input', () => {
    const testValue = '15p';
    input.nativeElement.value = testValue;
    durationServiceMock.isParseable.and.returnValue(true);

    const validation = directive.validate(({ value: testValue } as any) as AbstractControl);

    expect(durationServiceMock.isParseable).toHaveBeenCalledWith(testValue);
    expect(validation).toEqual(null);
  });

  it('should parse and write value on input blur', () => {
    const changeSpy = jasmine.createSpyObj('test', ['onChange', 'onTouched']);
    directive.registerOnChange(changeSpy.onChange);
    directive.registerOnTouched(changeSpy.onTouched);

    durationServiceMock.getDurationString.and.returnValue('15p');
    durationServiceMock.parseDurationString.and.returnValue(15);
    durationServiceMock.isParseable.and.returnValue(true);

    input.nativeElement.value = '15';

    directive.blur(input.nativeElement.value);

    expect(durationServiceMock.parseDurationString).toHaveBeenCalledWith(input.nativeElement.value);
    expect(durationServiceMock.getDurationString).toHaveBeenCalledWith(15);
    expect(rendererMock.setProperty).toHaveBeenCalledWith(input.nativeElement, 'value', '15p');
    expect(changeSpy.onChange).toHaveBeenCalledWith(15);
    expect(changeSpy.onTouched).toHaveBeenCalled();
  });

  it('should parse and write value on input enter', () => {
    const changeSpy = jasmine.createSpyObj('test', ['onChange']);
    directive.registerOnChange(changeSpy.onChange);

    durationServiceMock.getDurationString.and.returnValue('15p');
    durationServiceMock.parseDurationString.and.returnValue(15);
    durationServiceMock.isParseable.and.returnValue(true);

    input.nativeElement.value = '15';

    directive.enter(input.nativeElement.value);

    expect(durationServiceMock.parseDurationString).toHaveBeenCalledWith(input.nativeElement.value);
    expect(durationServiceMock.getDurationString).toHaveBeenCalledWith(15);
    expect(rendererMock.setProperty).toHaveBeenCalledWith(input.nativeElement, 'value', '15p');
    expect(changeSpy.onChange).toHaveBeenCalledWith(15);
  });

  it('should keep bad value in input and update model with null value', () => {
    const changeSpy = jasmine.createSpyObj('test', ['onChange']);
    directive.registerOnChange(changeSpy.onChange);

    durationServiceMock.getDurationString.and.returnValue(null);
    durationServiceMock.parseDurationString.and.returnValue(null);
    durationServiceMock.isParseable.and.returnValue(false);

    input.nativeElement.value = 'test';

    directive.blur(input.nativeElement.value);

    expect(durationServiceMock.parseDurationString).toHaveBeenCalledWith(input.nativeElement.value);
    expect(rendererMock.setProperty).toHaveBeenCalledWith(input.nativeElement, 'value', input.nativeElement.value);
    expect(changeSpy.onChange).toHaveBeenCalledWith(null);
  });

  it('should keep null value in input and update model with null value', () => {
    const changeSpy = jasmine.createSpyObj('test', ['onChange']);
    directive.registerOnChange(changeSpy.onChange);

    durationServiceMock.getDurationString.and.returnValue(null);
    durationServiceMock.parseDurationString.and.returnValue(null);
    durationServiceMock.isParseable.and.returnValue(false);

    input.nativeElement.value = null;

    directive.blur(input.nativeElement.value);

    expect(durationServiceMock.parseDurationString).toHaveBeenCalledWith(input.nativeElement.value);
    expect(rendererMock.setProperty).toHaveBeenCalledWith(input.nativeElement, 'value', '');
    expect(changeSpy.onChange).toHaveBeenCalledWith(null);
  });

  // tslint:disable: no-use-before-declare
  init = () => {
    fixture = TestBed.configureTestingModule({
      declarations: [DurationDirective, TestComponent],
      imports: [TranslateModule.forRoot()]
    }).createComponent(TestComponent);

    input = fixture.debugElement.query(By.directive(DurationDirective));

    durationServiceMock = jasmine.createSpyObj('DurationService', [
      'getDurationString',
      'parseDurationString',
      'isParseable'
    ]);
    durationServiceMock.getDurationString.and.returnValue('1ó 15p');
    durationServiceMock.parseDurationString.and.returnValue(75);
    durationServiceMock.isParseable.and.returnValue(true);

    rendererMock = jasmine.createSpyObj('Renderer2', ['setProperty']);

    directive = new DurationDirective((durationServiceMock as any) as DurationService, rendererMock, input);

    fixture.detectChanges();
  };

  @Component({
    template: `
      <input appDuration />
    `
  })
  class TestComponent {}
});
