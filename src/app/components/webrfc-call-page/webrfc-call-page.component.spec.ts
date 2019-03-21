import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebrfcCallPageComponent } from './webrfc-call-page.component';

describe('WebrfcCallPageComponent', () => {
  let component: WebrfcCallPageComponent;
  let fixture: ComponentFixture<WebrfcCallPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebrfcCallPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebrfcCallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
