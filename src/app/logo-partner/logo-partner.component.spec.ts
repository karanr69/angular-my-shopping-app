import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoPartnerComponent } from './logo-partner.component';

describe('LogoPartnerComponent', () => {
  let component: LogoPartnerComponent;
  let fixture: ComponentFixture<LogoPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
