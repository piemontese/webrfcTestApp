import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { PmtDialogService } from 'pmt-dialog';

interface Fields {
  parameter: string;
  value: string;
}

@Component({
  selector: 'app-webrfc-call-page',
  templateUrl: './webrfc-call-page.component.html',
  styleUrls: ['./webrfc-call-page.component.scss']
})
export class WebrfcCallPageComponent implements OnInit {
  fields: Fields[] = [];
  form: FormGroup;
//  baseUrl = 'http://mnibm09.novellini.it:8066/sap/bc/webrfc';
  baseUrl = 'http://127.0.0.1:8001/sap/bc/webrfc';
  /**
   * Webrfc called function
   */
  _FUNCTION = 'Z_PMT_WRFC_INTERFACE';
  callback = 'JSONP_CALLBACK';
  abapClass = '';
  method = '';
  response: any;
  functionBody = [];
  progress = false;
  timer = new Observable;
  authentication = true;  // pass user and password to basic http authentication
//  sapUser = 'novedev';
//  sapPassword = 'init1234';
  sapUser = 'developer';
  sapPassword = 'Ostrakon1!';
  sapClient = '';
  sapLanguage = 'EN';

  object = 'function';
  constructor() { }

  getInterface() {

  }

  ngOnInit() {
  }

}
