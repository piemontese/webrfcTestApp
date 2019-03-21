import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs';

import { PmtDialogService } from 'pmt-dialog';
import { DataTableDetailService } from '../../../services/data-table-detail.service';
import { DataSourceService } from '../../../services/data-source.service';

export interface Fields {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  color: string;
}

export interface Buttons {
  caption: string;
  icon: string;      // search, edit, content_copy, add, delete
  position: string;  // left, center, right
  action: string;
  color: string;     // primary, accent, warn
  row: number;
  tooltip: string;
  disabled: boolean;
  multiSel: boolean;
}

export interface IconButtons {
  icon: string;      // refresh, filter_list
  position: string;  // left, center, right
  action: string;
  color: string;     // primary, accent, warn
  row: number;
  tooltip: string;
  disabled: boolean;
  multiSel: boolean;
}

/**
 * BaseDataTableComponent
 * 
 * @param {string} title  Title of component
 * @param {string} baseUrl  Base url for http request
 */
@Component({
  selector: 'app-base-data-table',
  templateUrl: './base-data-table.component.html',
  styleUrls: ['./base-data-table.component.scss']
})
export class BaseDataTableComponent implements OnInit {
  @Input() title = 'Sample table';
  @Input() baseUrl = '';
  @Input() jsonData = [];
  @Input() type = 'POST';
  @Input() contentType = 'application/json';
  @Input() dataType = 'jsonp';
  @Input() timeout = 60000; // sets timeout to 60 seconds
  @Input() filter = true;
  @Input() displayedColumns = [];
  @Input() displayedColumnsNames = [];
  @Input() table = '';
  @Input() fields: Fields[] = [];
  @Input() buttons: Buttons[] = [];
  @Input() iconButtons: IconButtons[] = [];
  @Input() multiSelection = false;

  dataSource: MatTableDataSource<any>;
  showFilter = true;
  data: any;
  callback = 'JSONP_CALLBACK';
  response: any = [];
  progress = false;
  selectedItems: number[];
  currentDate = new FormControl(new Date());

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // tslint:disable-next-line:max-line-length
  constructor(protected http: HttpClient, public dialogService: PmtDialogService, public dataTableDetailService: DataTableDetailService, public dataSourceService: DataSourceService) {
    this.dataSource = new MatTableDataSource([]);
  }

  protected buttonClick(button: Buttons) {
    if (button.action !== '') {
      const fnString = button.action;
      const fn =  this[fnString]();
      if ( typeof fn === 'function' ) {
        fn();
      }
    }
  }

  protected iconBbuttonClick(iconButton: IconButtons) {
    if (iconButton.action !== '') {
      const fnString = iconButton.action;
      const fn =  this[fnString]();
      if ( typeof fn === 'function' ) {
        fn();
      }
    }
  }

/**
 * View item
 */
  protected view() {
    if (this.dataSource.data.filter(item => item.selected === true).length === 1) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i].selected) {
          const rec = this.dataSource.data[i];
          const detailFields = [];
          for (const [key, value] of Object.entries(rec)) {
            for (let j = 0; j < this.displayedColumns.length; j++) {
              if (this.displayedColumns[j] === key) {
                detailFields.push({'key': this.displayedColumnsNames[j], 'value': value});
                continue;
              }
            }
          }
          this.dataTableDetailService.open(this.title + ' view item',   // title
            'view',                   // mode
            detailFields,
            [{caption: 'Close', color: 'primary', close: true}]  // buttons
          );
        }
      }
    }
  }

  protected change() {
    if (this.dataSource.data.filter(item => item.selected === true).length === 1) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i].selected) {
          debugger;
          const rec = this.dataSource.data[i];
          const detailFields = [];
          for (const [key, value] of Object.entries(rec)) {
            for (let j = 0; j < this.displayedColumns.length; j++) {
              if (this.displayedColumns[j] === key) {
                detailFields.push({'key': this.displayedColumnsNames[j], 'value': value});
                continue;
              }
            }
          }
          this.dataTableDetailService.data = this.dataSource.data;
          let caller = this;
          this.dataTableDetailService.open(this.title + ' change item',   // title
            'edit',                   // mode
            detailFields,
            [
              {caption: 'Cancel', color: 'warn', close: true},
              {caption: 'OK', color: 'primary', close: true}
            ],  // buttons
//            this.changedCallback,      // callback
//            caller         // caller
          );
        }
      }
    }
  }

  private changedCallback(result: any, fields: any[], caller: BaseDataTableComponent) {
    debugger;
    if (result === 'OK') {
      for (let i = 0; i < caller.dataSource.data.filter(item => item.selected === true).length; i++) {
        //      for (let i = 0; i < this.dataSource.data.length; i++) {
        for (let j = 0; j < fields.length; j++) {
          caller.dataSource.data[i][fields[j].key] = fields[j].value;
          //          this.dataSource.data[i][fields[j].key] = fields[j].value;
        }
      }
    }
  }

  protected selectItem(row: any) {
    if (!this.multiSelection) {
      //      for (let i = 0; i < this.dataSource.data.filter(item => item.selected === true).length; i++) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i] !== row) {
          this.dataSource.data[i].selected = false;
        }
      }
    }
    row.selected = !row.selected;
    this.enableDisableButtons();
  }

  protected selectAll() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.dataSource.data[i].selected = !this.dataSource.data[i].selected;
    }
    this.enableDisableButtons();
  }

  public getData()/*: Observable<any[]>*/ {
    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].value !== '') {
        if ( this.fields[i].type === 'datePicker' ) {
          const date = new Date(this.fields[i].value);
          this.jsonData[this.fields[i].name] = date.getFullYear().toString() + 
                        ( date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString() ) + 
                        ( date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ).toString();
        } else {
          this.jsonData[this.fields[i].name] = this.fields[i].value;
        }
      }
    }

    const so = this;
    this.progress = true;

    debugger;
    switch (this.type.toLowerCase()) {
      case 'get': {
        this.http.get(this.baseUrl).subscribe(data => {
          console.log(data);
          so.response['results'] = data;
          so.dataSource.data = so.response['results'];
          so.progress = false;
        });
        break;
      }	// case 'GET':
      /*
      case 'post': {
        let httpOptions: HttpOptions;
        this.http.post(this.baseUrl, httpOptions).subscribe(data => {
          console.log(data);
          so.response['results'] = data;
          so.dataSource.data = so.response['results'];
          so.progress = false;
        });
        break;
      } // case 'PUT':

      /*
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
      return this.http.get(apiURL)
          .map(res => {
            return res.json().results.map(item => {
              return new SearchItem( 
                  item.trackName,
                  item.artistName,
                  item.trackViewUrl,
                  item.artworkUrl30,
                  item.artistId
              );
            });
          });
      */

      case 'jsonp': {
        jQuery.ajax({
          url: this.baseUrl,
          data: this.jsonData,
          async: false,
          type: this.type,
          dataType: this.dataType,
          contentType: this.contentType,
          crossDomain: true,
          jsonpCallback: this.jsonData['callback'],
          timeout: this.timeout,
          success: function(data) {
            let i = 0;
            for (const item of so.displayedColumns) {
              if (!so.displayedColumnsNames[i] || so.displayedColumnsNames[i] === '') {
                so.displayedColumnsNames[i] = item;
              }
              i++;
            }

            so.response = data;
            debugger;
            if (so.response.results) {
              so.dataSource.data = so.response.results[so.table];
            }

            // decode URI
            for (let m = 0; m < so.dataSource.data.length; m++) {
              const rec = so.dataSource.data[m];
              for (const [key, value] of Object.entries(rec)) {
                let val: any = value;
                so.dataSource.data[m][key] = decodeURIComponent(val);
              }
            }

            if (so.displayedColumns.length === 0) {
              i = 0;
              debugger;
              const rec = so.dataSource.data[0];
              for (const [key, value] of Object.entries(rec)) {
                so.displayedColumns[i] = key;
                so.displayedColumnsNames[i] = key;
                i++;
              }
							/*
							for ( const item of rec ) {
								so.displayedColumns[i] = item;
								so.displayedColumnsNames[i] = item;
								i++;
							}
							*/
            }
            so.progress = false;
          },
          error: function(data, status, error) {
						/*
						so.response = [];
						so.response['results'] = { 'USRLIST': [{'tid': '1', 'mandt': '', 'vbname': '', 'termv': '', 'hostaddr': ''}]  };
						so.dataSource.data = so.response.results['USRLIST'];
						*/
            so.progress = false;
            so.dialogService.open(so.title,   // title
              ['Server unavailable'],  // array of messages
              'message',   // dialog type
              'error',   // message type
              [
                {caption: 'Close', color: 'primary', close: true},
                //                           { caption: "Cancel", color: "warn", close: true }
              ]  // buttons
            );
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
        break;
      }	// case 'JSONP' :
      default: {
        so.dialogService.open(so.title,   // title
          ['type ' + this.type + ' invalid.'],  // array of messages
          'message',   // dialog type
          'error',   // message type
          [
            {caption: 'Close', color: 'primary', close: true},
            //                           { caption: "Cancel", color: "warn", close: true }
          ]  // buttons
        );
        so.progress = false;
        break;
      }

    }
  }


  protected refresh() {
    this.getData();
  }

  protected showFilterClick() {
    this.showFilter = !this.showFilter;
  }

  protected applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private enableDisableButtons() {
    debugger;
    if (this.dataSource.data.filter(item => item.selected === true).length === 1) {
      for (let m = 0; m < this.buttons.filter(item => item.multiSel === false).length; m++) {
        //        this.buttons[m].disabled = !this.buttons[m].disabled;   // !row.selected;
        this.buttons[m].disabled = false;   // !row.selected;
      }
    } else {
      for (let m = 0; m < this.buttons.filter(item => item.multiSel === false).length; m++) {
        this.buttons[m].disabled = true;
      }
    }
  }

  ngOnInit() {
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

