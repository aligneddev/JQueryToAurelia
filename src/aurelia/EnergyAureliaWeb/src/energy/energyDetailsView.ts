import { autoinject } from 'aurelia-framework';
import { NavigationInstruction, RouteConfig, Router } from 'aurelia-router';
import EnergyDataDto from './energyDataDto';
import EnergyDataApi from './energyDataApi';

@autoinject
export class EnergyDetailsView {
    private model: EnergyDataDto;

    constructor(private energyDataApi: EnergyDataApi, private router: Router) {
    }

    public activate(params: any, routeConfig: RouteConfig, $navigationInstruction: NavigationInstruction) {
        if (!params) {
            throw new Error('params information is required');
        }

        this.energyDataApi.getEnergyDataByIdAndYear(params.id, params.year).then(model => {
            this.model = model;
        });
    }
}
