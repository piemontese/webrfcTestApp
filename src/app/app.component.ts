import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders  } from '@angular/common/http';
import { Jsonp, Response} from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

interface Fields {
  parameter: string;
  value: string;
}


@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  fields: Fields[] = [];
  form: FormGroup;
  baseUrl = 'http://mnibm09.novellini.it:8066/sap/bc/webrfc';
  _FUNCTION = 'Z_WRFC_INTERFACE';
  callback = 'JSONP_CALLBACK';
  method: '';
  response: any;
  functionBody = [];
  progress = false;
  timer = new Observable;

  constructor( private http: HttpClient, private jsonp: Jsonp ) {
  }

  addField() {
    this.fields.push({ parameter: '', value: '' });
  }

  removeField( index: number ) {
    this.fields.splice( index, 1);
  }

  clearField( index: number ) {
    this.fields[index].parameter = '';
    this.fields[index].value = '';
  }

  removeAllFields() {
    this.fields =  [];
  }

  clearFields() {
    this.method = '';
    this.response = null;
    for ( let i = 0; i < this.fields.length; i++ ) {
      this.fields[i].parameter = '';
      this.fields[i].value = '';
    }
  }

  run() {
    this.callWebrfc();
    console.log(this.response);
  }

  private callWebrfc() {

    const headers = new HttpHeaders()
        .set('Authorization', 'novedev init1234');
    const webrfcUrl = `${this.baseUrl}?_FUNTION=${this.method}&callback${this.method}`;
    /*
   return this.jsonp.request(webrfcUrl)
     .map(res => {
        return res.json().results.map(item => {
          return item;
        });
      });
    }
     * */

//    return this.http.jsonp(webrfcUrl, 'callback');

    const jsonData = {
          '_FUNCTION':  this._FUNCTION,
          'callback':   this.callback
//          'method':     this.method,
    };

    if ( this.method !== '' ) {
      jsonData['method'] = this.method;
    }

    for ( let i = 0; i < this.fields.length; i++ ) {
      if ( this.fields[i].parameter !== '' && this.fields[i].value !== '' ) {
        jsonData[`${this.fields[i].parameter}`] = `${this.fields[i].value}`;
      }
    }

    const so = this;
    this.progress = true;
    jQuery.ajax({
        url: this.baseUrl,
        data: jsonData,
        async: false,
        type: 'POST',
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        username: 'novedev',
        password: 'init1234',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        contentType: 'application/json',
        crossDomain: true,
        jsonpCallback: jsonData.callback,
        timeout: 6000, // sets timeout to 60 seconds
        success: function(data) {
//          console.log(data);
          so.response = data;
          so.progress = false;
        },
        error: function (data, status, error) {
          alert(status + ' - ' + error);
          so.response = null;
          so.progress = false;
        }
    });
    /*
    .catch( function(e) {
       debugger;
       if ( e.statusText === 'timeout') {
         alert('Native Promise: Failed from timeout');
       }
     });
     * */
  }

}
