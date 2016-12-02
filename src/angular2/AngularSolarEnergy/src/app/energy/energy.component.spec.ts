/* tslint:disable:no-unused-variable */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from 'app/app-routing.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import EnergyDataJsonService from './energy-data-json.service';
import {IEnergyDataServiceToken} from './energy-data-service.token';
import {EnergyComponent} from './energy.component';
import {EnergyDetailsComponent} from './energy-details/energy-details.component';

describe('EnergyComponent', () => {
  let component: EnergyComponent;
  let fixture: ComponentFixture<EnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EnergyComponent,
        EnergyDetailsComponent
        ],
      // could replace with a test data service or use the in-memory-data-service idea.
      providers:  [
        { provide: IEnergyDataServiceToken, useClass: EnergyDataJsonService },
        // fixes  Error: No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.
        {provide: APP_BASE_HREF, useValue : '/' }
        ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
