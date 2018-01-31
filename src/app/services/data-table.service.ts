import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders  } from '@angular/common/http';
import { Jsonp, Response} from '@angular/http';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Injectable()
export class DataTableService {
  baseUrl = 'http://mnibm09.novellini.it:8066/sap/bc/webrfc';
  _FUNCTION = 'Z_WRFC_INTERFACE';
  callback = 'JSONP_CALLBACK';
  method = 'TH_USER_LIST';
  response: any;
  complete = false;

  constructor() { }
    
  getData() { 
    this.complete = false;
    const headers = new HttpHeaders()
        .set('Authorization', 'novedev init1234');
    const webrfcUrl = `${this.baseUrl}?_FUNTION=${this.method}&callback${this.method}`;

    const jsonData = {
          '_FUNCTION':  this._FUNCTION,
          'callback':   this.callback,
          'method': this.method,
          'sap-client': '020',
          'sap-language': 'EN',
          'sap-user':   'novedev',
          'sap-password': 'init1234'
    };

    const so = this;
//    this.progress = true;
    jQuery.ajax({
        url: this.baseUrl,
        data: jsonData,
        async: false,
        type: 'POST',
        dataType: 'jsonp',
        contentType: 'application/json',
        crossDomain: true,
        jsonpCallback: jsonData.callback,
        timeout: 6000, // sets timeout to 60 seconds
        success: function(data) {
//          console.log(data);
            debugger;
          so.response = data;
    this.complete = true;
//          so.progress = false;
//          return so.data;
        },
        error: function (data, status, error) {
          alert(status + ' - ' + error);
          so.response = null;
    this.complete = true;
//          so.progress = false;
//          return so.data;
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
