import { Component, OnInit, Input } from '@angular/core';

import { DataTableComponent } from '../../data-table/data-table.component';

import { DialogService } from '../../../services/dialog.service';

interface Button {
  caption: string;
  color: string;
  close: boolean;
}

@Component({
  selector: 'app-data-table-detail',
  templateUrl: './data-table-detail.component.html',
  styleUrls: ['./data-table-detail.component.css']
})
export class DataTableDetailComponent extends DataTableComponent implements OnInit {
  @Input() title = 'Title';
  public dialogButtons: Button[];
  public response: String = '';

  constructor( public dialogService: DialogService ) {
     super( dialogService );
  }

  onClick( response: string ) {
    this.response = response;
  }

 ngOnInit() {
  }

}
