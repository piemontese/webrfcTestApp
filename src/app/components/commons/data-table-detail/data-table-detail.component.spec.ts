import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableDetailComponent } from './data-table-detail.component';

describe('DataTableDetailComponent', () => {
  let component: DataTableDetailComponent;
  let fixture: ComponentFixture<DataTableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
