import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeethreedzejesComponent } from './deethreedzejes.component';

describe('DeethreedzejesComponent', () => {
  let component: DeethreedzejesComponent;
  let fixture: ComponentFixture<DeethreedzejesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeethreedzejesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeethreedzejesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
