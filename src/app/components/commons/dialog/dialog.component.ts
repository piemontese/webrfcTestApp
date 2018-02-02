import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

interface Button {
  caption: string;
  color: string;
  close: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public dialogType: String = 'message';  // message, confirm, choise
  public title: String = '';
//  public message: string = '';
  public messages: Array<String> = [];
  public messageType = 'info';
  public buttons: Button[];
  public routeTo: String = '';
  public response: String = '';
  public callback: Function = null;

  /**
   * @param {MatDialogRef<DialogComponent>} messageBox
   */
  constructor( public messageBox: MatDialogRef<DialogComponent> ) { }

  onClick( response: string ) {
    this.response = response;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if ( this.callback ) {
      this.callback(this.response);
    }
  }

}


