import { EnergyComponent } from './energy/energy.component';

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
    { path: '', component: EnergyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
