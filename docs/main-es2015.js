(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./dist/ngx-duration-input/fesm2015/ngx-duration-input.js":
/*!****************************************************************!*\
  !*** ./dist/ngx-duration-input/fesm2015/ngx-duration-input.js ***!
  \****************************************************************/
/*! exports provided: NgxDurationInputDirective, NgxDurationInputModule, NgxDurationInputService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxDurationInputDirective", function() { return NgxDurationInputDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxDurationInputModule", function() { return NgxDurationInputModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxDurationInputService", function() { return NgxDurationInputService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxDurationInputService {
    constructor() {
        this.numRegx = '[1-9][0-9]*';
        this.decimalRegx = `[0-9]*[\\.,][0-9]*[1-9][0-9]*`;
        this.spaceRegx = `[\\s]*`;
        this.hrRegx = `${this.spaceRegx}[óÓhH:]${this.spaceRegx}`; // TODO : handle differently ( 1: -> 1ó engedjük e), :15 nem parsolja
        // TODO : handle differently ( 1: -> 1ó engedjük e), :15 nem parsolja
        this.minRegx = `${this.spaceRegx}[pPmM]${this.spaceRegx}`;
        this.justNumbers = `^${this.numRegx}${this.spaceRegx}$`; // 150 -> 150 perc
        // 150 -> 150 perc
        this.numbersWithMinPostfix = `^${this.numRegx}${this.spaceRegx}${this.minRegx}${this.spaceRegx}$`; // 150p -> 150 perc
        // 150p -> 150 perc
        this.numbersWithHourPostfix = `^${this.numRegx}${this.spaceRegx}${this.hrRegx}${this.spaceRegx}$`; // 2ó -> 120 perc
        // 2ó -> 120 perc
        this.decimalNumbers = `^${this.decimalRegx}${this.spaceRegx}$`; // 1.5 -> 90 perc
        // 1.5 -> 90 perc
        this.decimalNumbersWithHourPostfix = `^${this.decimalRegx}${this.spaceRegx}${this.hrRegx}${this.spaceRegx}$`; // 1.5ó -> 90 perc
        // 1.5ó -> 90 perc
        this.numbersWithHourInfix = `^${this.numRegx}${this.hrRegx}${this.numRegx}${this.spaceRegx}$`; // 1ó15 -> 75 perc
        // 1ó15 -> 75 perc
        this.numbersWithWhitespaceInfix = `^${this.numRegx}${this.spaceRegx}${this.numRegx}${this.spaceRegx}$`; // 1 15 -> 75 perc
        // 1 15 -> 75 perc
        this.numbersWithAllPostfix = `^${this.numRegx}${this.hrRegx}${this.numRegx}${this.minRegx}$`; // 1ó15p -> 75 perc
        // 1ó15p -> 75 perc
        this.durationRegex = `(` +
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
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    getDurationString(duration) {
        if (!duration) {
            return null;
        }
        /** @type {?} */
        let value = '';
        /** @type {?} */
        const hr = Math.floor(duration / 60);
        /** @type {?} */
        const min = duration - 60 * hr;
        if (hr) {
            // value = `${hr} ${this.translateService.instant('HOUR_SHORT')}`;
            value = `${hr} h`;
        }
        if (hr && min) {
            value += ' ';
        }
        if (min) {
            // value += `${min} ${this.translateService.instant('MINUTE_SHORT')}`;
            value += `${min} m`;
        }
        return value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parseDurationString(value) {
        if (!value) {
            return;
        }
        value = `${value} `.trim();
        if (!value) {
            return;
        }
        // convert to <x>h<y> format
        if (value.match(this.justNumbers)) {
            // 150 -> 150 perc
            value = `0h${value}`;
        }
        else if (value.match(this.numbersWithMinPostfix)) {
            // 150p -> 150 perc
            value = `0h${this.removeMin(value)}`;
        }
        else if (value.match(this.numbersWithHourPostfix)) {
            // 2ó -> 120 perc
            value = `${this.removeHour(value)}h0`;
        }
        else if (value.match(this.decimalNumbers)) {
            // 1.5 -> 90 perc
            value = `${this.stdizeSeparator(value)}h0`;
        }
        else if (value.match(this.decimalNumbersWithHourPostfix)) {
            // 1.5ó -> 90 perc
            value = `${this.removeHour(this.stdizeSeparator(value))}h0`;
        }
        else if (value.match(this.numbersWithHourInfix)) {
            // 1ó15 1:15 -> 75 perc
            value = this.stdizeHour(value);
        }
        else if (value.match(this.numbersWithWhitespaceInfix)) {
            // 1 15 -> 75 perc
            value = value
                .toLocaleLowerCase()
                .split(/\s+/)
                .join('h');
        }
        else if (value.match(this.numbersWithAllPostfix)) {
            // 1ó15p -> 75 perc
            value = this.removeMin(value.toLocaleLowerCase().replace('ó', 'h'));
        }
        else {
            return;
        }
        /** @type {?} */
        const values = value.split('h');
        /** @type {?} */
        const hr = parseFloat(values[0].trim());
        /** @type {?} */
        const min = parseFloat(values[1].trim());
        return Math.ceil(hr * 60) + min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isParseable(value) {
        if (!value) {
            return false;
        }
        return !!value.match(this.durationRegex);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    stdizeSeparator(value) {
        return value.replace(',', '.');
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    stdizeHour(value) {
        return value
            .toLocaleLowerCase()
            .replace('ó', 'h')
            .replace(':', 'h');
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    removeMin(value) {
        return value
            .toLocaleLowerCase()
            .replace('p', '')
            .replace('m', '');
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    removeHour(value) {
        return value
            .toLocaleLowerCase()
            .replace('ó', '')
            .replace('h', '')
            .replace(':', '');
    }
}
NgxDurationInputService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxDurationInputService.ctorParameters = () => [];
/** @nocollapse */ NgxDurationInputService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ factory: function NgxDurationInputService_Factory() { return new NgxDurationInputService(); }, token: NgxDurationInputService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxDurationInputDirective {
    /**
     * @param {?} durationService
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(durationService, renderer, elementRef) {
        this.durationService = durationService;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    blur(value) {
        this.updateValue(value);
        this.onTouchedCallback();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    enter(value) {
        this.updateValue(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        // update display value
        this.writeValue(value);
        // updates ngModel value based on input
        this.onChangeCallback(this.durationService.parseDurationString(value));
    }
    /**
     * @param {?} _
     * @return {?}
     */
    validate(_) {
        /** @type {?} */
        const inputValue = this.elementRef.nativeElement.value.trim();
        /** @type {?} */
        const parsable = this.durationService.isParseable(inputValue);
        // if has notnull input and its not parsable
        if (!!inputValue && !parsable) {
            return { pattern: true };
        }
        else {
            return null;
        }
    }
    /**
     * Writes the display value into the input. ControlValueAccessor
     * @param {?} inputValue
     * @return {?}
     */
    writeValue(inputValue) {
        /** @type {?} */
        const parsedValue = this.durationService.parseDurationString(inputValue);
        /** @type {?} */
        let displayValue;
        // tslint:disable-next-line:prefer-conditional-expression
        if (inputValue === '0' || !!parsedValue) {
            // if input is 0 or parseable
            displayValue = this.durationService.getDurationString(parsedValue);
        }
        else {
            displayValue = !inputValue ? '' : (inputValue + '').trim();
        }
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', displayValue);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { }
}
NgxDurationInputDirective.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                selector: '[ngxDuration]',
                providers: [
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])((/**
                         * @return {?}
                         */
                        () => NgxDurationInputDirective)),
                        multi: true
                    },
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])((/**
                         * @return {?}
                         */
                        () => NgxDurationInputDirective)),
                        multi: true
                    }
                ]
            },] }
];
/** @nocollapse */
NgxDurationInputDirective.ctorParameters = () => [
    { type: NgxDurationInputService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }
];
NgxDurationInputDirective.propDecorators = {
    blur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['blur', ['$event.target.value'],] }],
    enter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['keyup.enter', ['$event.target.value'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxDurationInputModule {
}
NgxDurationInputModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [NgxDurationInputDirective],
                imports: [],
                exports: [NgxDurationInputDirective]
            },] }
];


//# sourceMappingURL=ngx-duration-input.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"outer\">\n  \n  <h1>ngx-duration-input \n    <a href=\"https://www.npmjs.com/package/ngx-duration-input\"><mat-icon>link</mat-icon></a></h1>\n\n  <form #form=\"ngForm\">\n    <mat-form-field class=\"field\" color=\"accent\" appearance=\"outline\">\n      <mat-label>Duration</mat-label>\n\n      <input\n        name=\"duration\"\n        matInput\n        ngxDuration\n        placeholder=\"{{ 'Duration' }}\"\n        [(ngModel)]=\"duration\"\n        required\n      />\n\n      <mat-error *ngIf=\"form.controls['duration']?.errors; let errors\" [ngSwitch]=\"(errors | keyvalue)[0].key\">\n        <span *ngSwitchCase=\"'required'\">{{ 'Duration value is required' }}</span>\n        <span *ngSwitchCase=\"'pattern'\">{{ 'Invalid duration format' }}</span>\n      </mat-error>\n    </mat-form-field>\n    \n    <div>\n      NgModel value: {{duration}}\n    </div>\n\n    <!-- <div>\n      <div *ngFor=\"let h of handled\">\n        \"{{h}}\"\n      </div>\n    </div> -->\n\n    <mat-form-field class=\"field pt\" color=\"accent\" appearance=\"outline\">\n        <mat-label>Duration</mat-label>\n  \n        <input\n          name=\"disabledDuration\"\n          matInput\n          ngxDuration\n          placeholder=\"{{ 'Duration' }}\"\n          [(ngModel)]=\"disabledDuration\"\n          required\n          disabled\n        />\n  \n        <mat-error *ngIf=\"form.controls['disabledDuration']?.errors; let errors\" [ngSwitch]=\"(errors | keyvalue)[0].key\">\n          <span *ngSwitchCase=\"'required'\">{{ 'Duration value is required' }}</span>\n          <span *ngSwitchCase=\"'pattern'\">{{ 'Invalid duration format' }}</span>\n        </mat-error>\n      </mat-form-field>\n  </form>\n\n\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".outer {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n}\n\nh1 > a {\n  vertical-align: middle;\n}\n\nh1 > a, h1 > a:visited, h1 > a:hover, h1 > a:active {\n  color: #2062b2;\n}\n\n.field {\n  width: 300px;\n}\n\nform {\n  vertical-align: middle;\n  margin: auto;\n}\n\n.pt {\n  margin-top: 105px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvRDpcXEdpdFByb2plY3RzXFxkdXJhdGlvbi1kaXJlY3RpdmUvc3JjXFxhcHBcXGFwcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBQ0NKOztBREVBO0VBQ0ksc0JBQUE7QUNDSjs7QURDSTtFQUNJLGNBQUE7QUNDUjs7QURHQTtFQUNJLFlBQUE7QUNBSjs7QURHQTtFQUNJLHNCQUFBO0VBQ0EsWUFBQTtBQ0FKOztBREdBO0VBQ0ksaUJBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5vdXRlciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG5oMSA+IGEge1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuXHJcbiAgICAmLCAmOnZpc2l0ZWQsICY6aG92ZXIsICY6YWN0aXZlIHtcclxuICAgICAgICBjb2xvcjogIzIwNjJiMjtcclxuICAgIH1cclxufVxyXG5cclxuLmZpZWxke1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG5mb3JtIHtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbn1cclxuXHJcbi5wdCB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMDVweDtcclxufVxyXG4iLCIub3V0ZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbmgxID4gYSB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5oMSA+IGEsIGgxID4gYTp2aXNpdGVkLCBoMSA+IGE6aG92ZXIsIGgxID4gYTphY3RpdmUge1xuICBjb2xvcjogIzIwNjJiMjtcbn1cblxuLmZpZWxkIHtcbiAgd2lkdGg6IDMwMHB4O1xufVxuXG5mb3JtIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4ucHQge1xuICBtYXJnaW4tdG9wOiAxMDVweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'duration-directive';
        this.duration = 150;
        this.disabledDuration = 0;
        this.handled = [
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
        ];
        setInterval(() => this.disabledDuration += 1, 1000);
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var ngx_duration_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-duration-input */ "./dist/ngx-duration-input/fesm2015/ngx-duration-input.js");








let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            ngx_duration_input__WEBPACK_IMPORTED_MODULE_7__["NgxDurationInputModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\GitProjects\duration-directive\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map