import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, JsonpClientBackend, HTTP_INTERCEPTORS, JsonpInterceptor } from '@angular/common/http';
import { JsonpModule } from '@angular/http';

import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule  } from '@angular/material';
import { MatDialogModule  } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';

import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'jquery';
import { ParameterComponent } from './components/parameter/parameter.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DialogComponent } from './components/commons/dialog/dialog.component';

import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    ParameterComponent,
    DataTableComponent,
    DialogComponent
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
    MatPaginatorModule,
    MatSortModule,
    CdkTableModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressBarModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [
    DialogService
//    JsonpClientBackend,
//    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
//    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
  ],
  entryComponents: [
    DialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
