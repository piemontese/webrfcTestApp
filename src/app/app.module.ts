import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, JsonpClientBackend, HTTP_INTERCEPTORS, JsonpInterceptor } from '@angular/common/http';
import { JsonpModule } from '@angular/http';

import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'jquery';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    JsonpModule,
//    JsonpClientBackend,
//    JsonpInterceptor,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [
//    JsonpClientBackend,
//    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
//    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
