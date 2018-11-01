import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseDataTableComponent } from '../commons/base-data-table/base-data-table.component';

// import { DialogService } from '../../services/dialog.service';
import { PmtDialogService } from 'pmt-dialog';
import { DataTableDetailService } from '../../services/data-table-detail.service';
import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-web-data-table-page',
  templateUrl: './web-data-table-page.component.html',
  styleUrls: ['./web-data-table-page.component.scss']
})
export class WebDataTablePageComponent extends BaseDataTableComponent implements OnInit {

  constructor( protected http: HttpClient, public dialogService: PmtDialogService, public dataTableDetailService: DataTableDetailService,
               public dataSourceService: DataSourceService ) {
    super( http, dialogService, dataTableDetailService, dataSourceService);
  }

  ngOnInit() {
  }

}
