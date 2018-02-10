import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDataTableComponent } from './web-data-table.component';

describe('WebDataTableComponent', () => {
  let component: WebDataTableComponent;
  let fixture: ComponentFixture<WebDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
