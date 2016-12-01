import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { EnergyComponent } from './energy/energy.component';
import EnergyDataJsonService from './energy/energy-data-json.service';

import {routing} from './app.routing';
import { EnergyDetailsComponent } from './energy/energy-details/energy-details.component';

// Imports for loading & configuring the in-memory web api
// https://angular.io/docs/ts/latest/tutorial/toh-pt6.html
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    EnergyComponent,
    EnergyDetailsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    // us the in memory data service => InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgbModule.forRoot()
  ],
  providers: [EnergyDataJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
