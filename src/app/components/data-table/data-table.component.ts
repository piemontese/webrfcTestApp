import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { DataTableService } from '../../services/data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() title = 'Sample table'
  @Input() displayedColumns = ['id', 'name', 'progress', 'color'];
  @Input() displayedColumnsNames = ['ID', 'Name', 'Progress', 'Color'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;
  showFilter = true;
  data: any; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private dataTableService: DataTableService ) { 
//    this.exampleDatabase = new ExampleDatabase(dataTableService);
  }

  refresh() {
    this.dataTableService.getData();
    debugger;
//    const difference = a1.filter(item => a2.indexOf(item) < 0);
    this.exampleDatabase.setDataTableService( this.dataTableService );
    this.exampleDatabase.setData(this.dataTableService.response['USRLIST']);
  }

  showFilterClick() {
    this.showFilter = !this.showFilter;
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }

}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  private dataTableService: DataTableService;
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor( /*private dataTableService: DataTableService*/ ) {
    // Fill up the database with 100 users.
//    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  setDataTableService ( dataTableService: DataTableService ) {
    this.dataTableService = dataTableService;
  }
    
  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }
    
  setData( data: any ) {
    const copiedData = data.slice();
    copiedData.push(data);
    this.dataChange.next(copiedData);
  }


  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  private dataTableService: DataTableService;
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
    super();
  }

  setDataTableService ( dataTableService: DataTableService ) {
    this.dataTableService = dataTableService;
  }
    
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
//    return this._exampleDatabase.dataChange;
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
      this._filterChange,
//      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice().filter((item: any) => {
        const searchStr = (item.id + item.name + item.progress + item.color).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
