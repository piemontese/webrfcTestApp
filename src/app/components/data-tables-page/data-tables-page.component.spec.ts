import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablesPageComponent } from './data-tables-page.component';

describe('DataTablesPageComponent', () => {
  let component: DataTablesPageComponent;
  let fixture: ComponentFixture<DataTablesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTablesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTablesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
