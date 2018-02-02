import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../components/commons/dialog/dialog.component';
import { Router } from '@angular/router';

interface Button {
  caption: string;
  color: string;
  close: boolean;
}

@Injectable()
export class DialogService {
  dialogRef: MatDialogRef<DialogComponent>;
  result: String = '';
  response: String = '';

  constructor( private router: Router, private dialog: MatDialog ) { }

//  public open( title, messages, dialogType, messageType, buttons: Button[] ): Observable<boolean>
  public open( title,
               messages,
               dialogType,
               messageType,
               buttons: Button[],
               callback: Function = null,
               routeTo: string = '' ) {
//    let dialogRef: MatDialogRef<DialogComponent>;

    this.dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'my-dialog-container',
//      width: '500px',
//      height: '80%',
      disableClose: true,  // modal
    });
    this.dialogRef.componentInstance.dialogType = dialogType;
    this.dialogRef.componentInstance.messageType = messageType;
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.messages = messages;
    this.dialogRef.componentInstance.buttons = buttons;
    this.dialogRef.componentInstance.routeTo = routeTo;
    this.dialogRef.componentInstance.callback = callback;
    const a = 1;

//    return dialogRef.afterClosed();

    this.dialogRef.afterClosed().subscribe(result => {
      debugger;
      this.response = this.dialogRef.componentInstance.response;
      if ( routeTo !== '' ) {
        this.router.navigate([routeTo]);
      }
    });
  }

}
