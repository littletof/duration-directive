import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxDurationInputModule } from 'ngx-duration-input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgxDurationInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
