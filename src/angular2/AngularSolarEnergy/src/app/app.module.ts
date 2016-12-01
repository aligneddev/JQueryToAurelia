import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {EnergyComponent} from './energy/energy.component';
import EnergyDataJsonService from './energy/energy-data-json.service';

import { EnergyDetailsComponent } from './energy/energy-details/energy-details.component';

// Imports for loading & configuring the in-memory web api
// https://angular.io/docs/ts/latest/tutorial/toh-pt6.html
// import {AppModule} from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    EnergyComponent,
    EnergyDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // us the in memory data service => InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [EnergyDataJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
