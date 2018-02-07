import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { DialogService } from '../../services/dialog.service';
import { DataTableDetailService } from '../../services/data-table-detail.service';

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
}

export interface IconButtons {
  icon: string;      // refresh, filter_list
  position: string;  // left, center, right
  action: string;
  color: string;     // primary, accent, warn
  row: number;
  tooltip: string;
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
  @Input() method = 'TH_USER_LIST';
  @Input() table = 'USRLIST';
  @Input() fields: Fields[] = [];
  @Input() buttons: Buttons[] = [];
  @Input() iconButtons: IconButtons[] = [];
  @Input() multiSelection = false;

  dataSource: MatTableDataSource<any>;
  showFilter = true;
  data: any;
  baseUrl = 'http://mnibm09.novellini.it:8066/sap/bc/webrfc';
  _FUNCTION = 'Z_WRFC_INTERFACE';
  callback = 'JSONP_CALLBACK';
  response: any;
  progress = false;
//  selectedItems: number[];
	detailFields: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

	constructor( public dialogService: DialogService, public dataTableDetailService: DataTableDetailService ) {
    this.dataSource = new MatTableDataSource([]);
  }

  buttonClick( button: Buttons ) {
    if ( button.action !== '' ) {
      eval('this.' + button.action + '()');
    }
  }
	
  iconBbuttonClick( iconButton: IconButtons ) {
    if ( iconButton.action !== '' ) {
      eval('this.' + iconButton.action + '()');
    }
  }

  detail() {
    for ( let i = 0; i < this.dataSource.data.filter(item => item.selected === true).length; i++ ) {
			debugger;
			const rec = this.dataSource.data[i];
			let detailFields = [];
			for (let [key, value] of Object.entries(rec)) {
				for ( let j = 0; j < this.displayedColumns.length; j++ ) {
					if ( this.displayedColumns[j] === key ) {
						detailFields.push({'key': this.displayedColumnsNames[j], 'value': value });
						continue;
					}
				}
			}
      this.dataTableDetailService.open( this.title + ' detail',   // title
																				detailFields,
																				[{ caption: 'Close', color: 'primary', close: true } ]  // buttons
          														);
    }
  }

  selectItem( row: any ) {
		for ( let i = 0; i < this.dataSource.data.filter(item => item.selected === true).length; i++ ) {
			this.dataSource.data[i].selected = false;
		}
    row.selected = !row.selected;
    console.log('row: ', row);
  }

  selectAll() {
    for ( let i = 0; i < this.dataSource.data.length; i++ ) {
      this.dataSource.data[i].selected = !this.dataSource.data[i].selected;
    }
  }

  getData() {
    const jsonData = {
      '_FUNCTION': this._FUNCTION,
      'callback': this.callback,
      'method': this.method,
      'sap-client': '020',
      'sap-language': 'EN',
      'sap-user': 'novedev',
      'sap-password': 'init1234'
    };

    for ( let i = 0; i < this.fields.length; i++ ) {
      if ( this.fields[i].value !== '' ) {
        jsonData[this.fields[i].name.toUpperCase()] = this.fields[i].value;
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
      contentType: 'application/json',
      crossDomain: true,
      jsonpCallback: jsonData.callback,
      timeout: 60000, // sets timeout to 60 seconds
      success: function(data) {
        let i = 0;
        for ( const item of so.displayedColumns ) {
          if ( !so.displayedColumnsNames[i] || so.displayedColumnsNames[i] === '' ) {
            so.displayedColumnsNames[i] = item;
          }
          i++;
        }

        so.response = data;
        so.dataSource.data = so.response.results[so.table];
		
				// decode URI
        for ( let m = 0; m < so.dataSource.data.length; m++ ) {
          const rec = so.dataSource.data[m];
          for (let [key, value] of Object.entries(rec)) {
           	so.dataSource.data[m][key] = decodeURIComponent( value );
          }
        }
              
        if ( so.displayedColumns.length === 0 ) {
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
        so.dialogService.open( so.title,   // title
                               ['Server unavailable'],  // array of messages
                               'message',   // dialog type
                               'error',   // message type
                               [
                               { caption: 'Close', color: 'primary', close: true },
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


  refresh() {
    this.getData();
  }

  showFilterClick() {
    this.showFilter = !this.showFilter;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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


