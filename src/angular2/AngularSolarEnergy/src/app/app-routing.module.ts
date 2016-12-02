import { NgModule }       from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EnergyComponent } from './energy/energy.component';
import { EnergyDetailsComponent } from './energy/energy-details/energy-details.component';

const routes: Routes = [
    { path: '', redirectTo: '/energy', pathMatch: 'full' },
    { path: 'energy', component: EnergyComponent },
    { path: 'energy-details/:id/:year', component: EnergyDetailsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
