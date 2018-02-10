import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDataTablePageComponent } from './web-data-table-page.component';

describe('WebDataTablePageComponent', () => {
  let component: WebDataTablePageComponent;
  let fixture: ComponentFixture<WebDataTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDataTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDataTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
