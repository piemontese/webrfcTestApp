import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

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
  @Input() fields: any[] = [];

  public buttons: Button[];
  public response: String = '';
  public routeTo: String = '';
  public callback: Function = null;

  constructor() {}

  onClick( response: string ) {
    this.response = response;
  }

  ngOnInit() {
  }

}
