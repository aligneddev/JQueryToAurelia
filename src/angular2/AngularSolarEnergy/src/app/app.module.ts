import EnergyDataApi from './energy/energyDataApi';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EnergyComponent } from './energy/energy.component';

@NgModule({
  declarations: [
    AppComponent,
    EnergyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [EnergyDataApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
