import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebrfcDataTableComponent } from './webrfc-data-table.component';

describe('WebrfcDataTableComponent', () => {
  let component: WebrfcDataTableComponent;
  let fixture: ComponentFixture<WebrfcDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebrfcDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebrfcDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
