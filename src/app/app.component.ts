import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from './configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Webrfc Demo';
  configuration = new Config;  // configuration;

  constructor(private router: Router ) {
  }

  ngOnInit() {
    this.router.navigate(['/webrfc-page']);
  }

}
