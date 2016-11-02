import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import 'fetch';
import EnergyRowViewModel from './EnergyRowViewModel';
import EnergyDataApi from './EnergyDataApi';
@autoinject
export class Energy {
    public yearOptions: string[] = [];
    public selectedOption = 'all';
    public energyData: EnergyRowViewModel[] = [];
    get showEnergyDataTable() {
        return this.energyData.length > 0;
    }

    constructor(private energyDataApi: EnergyDataApi, private router: Router) {
        // TODO loading indicators
    }

    public activate() {
        const yearOptionsPromise = this.energyDataApi.getYearOptions().then((options: string[]) => {
            this.yearOptions = options;
        })

        return Promise.all([yearOptionsPromise, this.getEnergyData(this.selectedOption)]);
    }

    public yearOptionSelected(selectedOption: string) {
        return this.getEnergyData(selectedOption);
    }

    public getEnergyData(option: string) {
        return this.energyDataApi.getEnergyData(option).then((energyData) => {
            const vmList = energyData.map((data) => {
                return new EnergyRowViewModel(data, this.router);
            });
            this.energyData = vmList;
        });
    }
}