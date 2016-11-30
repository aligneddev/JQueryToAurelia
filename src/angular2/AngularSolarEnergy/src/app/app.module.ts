import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EnergyComponent } from './energy/energy.component';
import EnergyDataJsonService from './energy/energy-data-json.service';

// Imports for loading & configuring the in-memory web api
// https://angular.io/docs/ts/latest/tutorial/toh-pt6.html
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    EnergyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [EnergyDataJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
