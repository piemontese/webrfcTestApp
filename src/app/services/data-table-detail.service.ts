import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { DataTableDetailComponent } from '../components/commons/data-table-detail/data-table-detail.component';

interface Button {
  caption: string;
  color: string;
  close: boolean;
}

@Injectable()
export class DataTableDetailService {
  dialogRef: MatDialogRef<DataTableDetailComponent>;
  data: any[];

 constructor( private dialog: MatDialog ) { }

  public open( title: string,
               mode: string,
               fields: any[],
               buttons: Button[],
               callback: Function = null,
               caller: any = null,
               routeTo: string = '' ) {
//    let dialogRef: MatDialogRef<DialogComponent>;

    this.dialogRef = this.dialog.open(DataTableDetailComponent, {
//      panelClass: 'my-dialog-container',
//      width: '500px',
//      height: '80%',
      disableClose: true,  // modal
    });

    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.mode = mode;
    this.dialogRef.componentInstance.fields = fields;
    this.dialogRef.componentInstance.buttons = buttons;
    this.dialogRef.componentInstance.routeTo = routeTo;
    this.dialogRef.componentInstance.callback = callback;
    this.dialogRef.componentInstance.caller = caller;

//    return dialogRef.afterClosed();

    this.dialogRef.afterClosed().subscribe(result => {
      /*
      this.response = this.dialogRef.componentInstance.response;
      if ( routeTo !== '' ) {
        this.router.navigate([routeTo]);
      }
			*/
    });
  }

}

