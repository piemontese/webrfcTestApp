import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';

interface Button {
  caption: string;
  color: string;
  close: boolean;
}

@Component({
  selector: 'app-data-table-detail',
  templateUrl: './data-table-detail.component.html',
  styleUrls: ['./data-table-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableDetailComponent implements OnInit {
  @Input() title = 'Title';
  @Input() mode = 'view';   // view, change
  @Input() fields: any[] = [];

  public buttons: Button[];
  public response: String = '';
  public routeTo: String = '';
  public callback: Function = null;
  public caller: any = null;

  constructor() {}

  onClick( response: string ) {
    this.response = response;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if ( this.callback ) {
      this.callback(this.response, this.fields, this.caller);
    }
  }

  }
