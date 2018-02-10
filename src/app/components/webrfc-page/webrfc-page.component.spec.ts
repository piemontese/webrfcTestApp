import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebrfcPageComponent } from './webrfc-page.component';

describe('WebrfcPageComponent', () => {
  let component: WebrfcPageComponent;
  let fixture: ComponentFixture<WebrfcPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebrfcPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebrfcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
