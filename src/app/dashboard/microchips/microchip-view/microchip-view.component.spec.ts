/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MicrochipViewComponent } from './microchip-view.component';

describe('MicrochipViewComponent', () => {
  let component: MicrochipViewComponent;
  let fixture: ComponentFixture<MicrochipViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrochipViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrochipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
