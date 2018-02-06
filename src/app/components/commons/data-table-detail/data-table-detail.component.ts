import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-table-detail',
  templateUrl: './data-table-detail.component.html',
  styleUrls: ['./data-table-detail.component.css']
})
export class DataTableDetailComponent implements OnInit {
	@Input() title = "Title";

  constructor() { }

  ngOnInit() {
  }

}
