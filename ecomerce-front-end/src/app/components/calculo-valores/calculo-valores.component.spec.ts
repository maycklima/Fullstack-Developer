import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoValoresComponent } from './calculo-valores.component';

describe('CalculoValoresComponent', () => {
  let component: CalculoValoresComponent;
  let fixture: ComponentFixture<CalculoValoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoValoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
