import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs';

import {DialogService} from '../../services/dialog.service';
import {DataTableDetailService} from '../../services/data-table-detail.service';
import {DataSourceService} from '../../services/data-source.service';

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

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() title = 'Sample table';
  @Input() filter = true;
  @Input() displayedColumns = [];
  @Input() displayedColumnsNames = [];
  @Input() _FUNCTION = 'Z_WRFC_INTERFACE';
  @Input() method = '';
  @Input() table = '';
  @Input() fields: Fields[] = [];
  @Input() buttons: Buttons[] = [];
  @Input() iconButtons: IconButtons[] = [];
  @Input() multiSelection = false;

  dataSource: MatTableDataSource<any>;
  showFilter = true;
  data: any;
  baseUrl = 'http://mnibm09.novellini.it:8066/sap/bc/webrfc';
  callback = 'JSONP_CALLBACK';
  response: any;
  progress = false;
  selectedItems: number[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogService: DialogService, public dataTableDetailService: DataTableDetailService, public dataSourceService: DataSourceService) {
    this.dataSource = new MatTableDataSource([]);
  }

  protected buttonClick(button: Buttons) {
    if (button.action !== '') {
      eval('this.' + button.action + '()');
    }
  }

  protected iconBbuttonClick(iconButton: IconButtons) {
    if (iconButton.action !== '') {
      eval('this.' + iconButton.action + '()');
    }
  }

  protected view() {
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
          this.dataTableDetailService.open(this.title + ' change item',   // title
            'edit',                   // mode
            detailFields,
            [
              {caption: 'Cancel', color: 'warn', close: true},
              {caption: 'OK', color: 'primary', close: true}
            ],  // buttons
            this.changedCallback,      // callback
            this         // caller
          );
        }
      }
    }
  }

  private changedCallback(result: any, fields: any[], caller: DataTableComponent) {
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
    const jsonData = {
      //      '_FUNCTION': this._FUNCTION,
      'callback': this.callback,
      //      'method': this.method,
      'sap-client': '020',
      'sap-language': 'EN',
      'sap-user': 'novedev',
      'sap-password': 'init1234'
    };

    if (this._FUNCTION !== '') {
      jsonData['_FUNCTION'] = this._FUNCTION;
    }

    if (this.method !== '') {
      jsonData['method'] = this.method;
    }

    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].value !== '') {
        jsonData[this.fields[i].name/*.toUpperCase()*/] = this.fields[i].value;
      }
    }
    debugger;
    const so = this;
    this.progress = true;

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

    jQuery.ajax({
      url: this.baseUrl,
      data: jsonData,
      async: false,
      type: 'POST',
      dataType: 'jsonp',
      contentType: 'application/json',
      crossDomain: true,
      jsonpCallback: jsonData.callback,
      timeout: 60000, // sets timeout to 60 seconds
      success: function(data) {
        let i = 0;
        for (const item of so.displayedColumns) {
          if (!so.displayedColumnsNames[i] || so.displayedColumnsNames[i] === '') {
            so.displayedColumnsNames[i] = item;
          }
          i++;
        }

        so.response = data;
        so.dataSource.data = so.response.results[so.table];

        // decode URI
        for (let m = 0; m < so.response.dictionary.length; m++) {
          const rec = so.response.dictionary[m];
          for (const [key, value] of Object.entries(rec)) {
            so.response.dictionary[m][key] = decodeURIComponent(value);
          }
        }


        let dictionary = so.response.dictionary;
        debugger;

        // decode URI
        for (let m = 0; m < so.dataSource.data.length; m++) {
          const rec = so.dataSource.data[m];
          for (const [key, value] of Object.entries(rec)) {
            so.dataSource.data[m][key] = decodeURIComponent(value);
          }
        }

        // if no specified displayed columns
        if (so.displayedColumns.length === 0) {
          i = 0;
          const rec = so.dataSource.data[0];
          for (const [key, value] of Object.entries(rec)) {
            so.displayedColumns[i] = key;
            so.displayedColumnsNames[i] = key;
            i++;
          }
        }
        so.displayedColumnsNames = [];
        debugger;
        const rec = so.dataSource.data[0];
        i = 0;
        for (const [key, value] of Object.entries(rec)) {
          //          for (let i = 0; i < so.response.dictionary.length; i++) {
          const rec2 = so.response.dictionary.filter(item => item.name === key)[0];
          for (const [key2, value2] of Object.entries(rec2)) {
            if (key2 === 'small_descr') {
              if (value2 !== '') {
                so.displayedColumnsNames[i] = value2;
              } else {
                so.displayedColumnsNames[i] = so.response.dictionary[i].name.replace('"', '').replace('"', '');
              }
              i++;
            }
          }
          //          }
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


