import { EnergyComponent } from './energy/energy.component';
import { EnergyDetailsComponent } from './energy/energy-details/energy-details.component';

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
    { path: '', component: EnergyComponent },
    { path: 'energy-details/:id/:year', component: EnergyDetailsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
