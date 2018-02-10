import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDataTableComponent } from './base-data-table.component';

describe('BaseDataTableComponent', () => {
  let component: BaseDataTableComponent;
  let fixture: ComponentFixture<BaseDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
