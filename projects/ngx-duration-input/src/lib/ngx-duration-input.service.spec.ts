import { TestBed } from '@angular/core/testing';

import { NgxDurationInputService } from './ngx-duration-input.service';

describe('NgxDurationInputService', () => {
  let service: NgxDurationInputService;
  let testCases: any[];

  const permutateCase = (testCase: { inputString: string; parsedValue?: number; invalid?: boolean }) => {
    const permutated: any[] = [];

    permutated.push(testCase);

    // Do not permutate invalid tests
    if (!testCase.invalid) {
      const permutations = [
        testCase.inputString.toUpperCase(),
        testCase.inputString.replace('ó', 'h'),
        testCase.inputString.replace('ó', 'h').toUpperCase(),
        testCase.inputString.replace('p', 'm'),
        testCase.inputString.replace('p', 'm').toUpperCase()
      ];

      permutations.forEach(tr => {
        if (!permutated.find(value => value.inputString === tr)) {
          permutated.push({ inputString: tr, parsedValue: testCase.parsedValue });
        }
      });
    }

    return permutated;
  };

  const generateTestCases = () => {
    const startTestCases = [
      { inputString: '150', parsedValue: 150 },
      { inputString: '150p', parsedValue: 150 },
      { inputString: '2ó', parsedValue: 120 },
      { inputString: '1.5', parsedValue: 90 },
      { inputString: '1.5ó', parsedValue: 90 },
      { inputString: '1ó15', parsedValue: 75 },
      { inputString: '1:15', parsedValue: 75 },
      { inputString: '1 15', parsedValue: 75 },
      { inputString: '1ó15p', parsedValue: 75 },

      { inputString: 'invalid', invalid: true },
      { inputString: '15óó', invalid: true },
      { inputString: '15pp', invalid: true }
    ];

    return startTestCases.reduce((accumulator, currentValue, index, array) => {
      accumulator.push(...permutateCase(currentValue));
      return accumulator;
    }, []);
  };

  describe('parseDurationString', () => {
    /* Generate testCases and test them all https://blog.harveydelaney.com/running-multiple-test-cases-in-jasmine/*/
    testCases = generateTestCases();
    testCases.forEach((testCase, index) => {
      it(
        testCase.invalid
          ? `[${index}] should not parse '${testCase.inputString}'.`
          : `[${index}] should parse '${testCase.inputString}' to ${testCase.parsedValue} minutes.`,
        () => {
          expect(service.isParseable(testCase.inputString)).toBe(!testCase.invalid);
          expect(service.parseDurationString(testCase.inputString)).toEqual(testCase.parsedValue);
        }
      );
    });
  });

  describe('getDurationString', () => {
    testCases = [
      { inputNumber: 0, stringified: null },
      { inputNumber: 15, stringified: '15 m' },
      { inputNumber: 120, stringified: '2 h' },
      { inputNumber: 150, stringified: '2 h 30 m' }
    ];
    testCases.forEach((testCase, index) => {
      it(`should stringify ${testCase.inputNumber} minutes to ${testCase.stringified}`, () => {
        expect(service.getDurationString(testCase.inputNumber)).toEqual(testCase.stringified);
      });
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
    service = TestBed.get(NgxDurationInputService);
  });
});

