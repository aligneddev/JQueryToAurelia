import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnergyComponent } from './energy/energy.component';
import EnergyDataJsonService from './energy/energy-data-json.service';
import {IEnergyDataServiceToken} from './energy/energy-data-service.token';

import { EnergyDetailsComponent } from './energy/energy-details/energy-details.component';
import { NotesComponent } from './energy/notes/notes.component';

// Imports for loading & configuring the in-memory web api
// https://angular.io/docs/ts/latest/tutorial/toh-pt6.html
// import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

// this allows us to inject the interface
// https://angular.io/docs/ts/latest/guide/dependency-injection.html#!#opaquetoken

@NgModule({
  declarations: [
    AppComponent,
    EnergyComponent,
    EnergyDetailsComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // us the in memory data service => InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [{ provide: IEnergyDataServiceToken, useClass: EnergyDataJsonService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
