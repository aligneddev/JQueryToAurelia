import { autoinject, computedFrom } from 'aurelia-framework';
import 'fetch';
import EnergyRowViewModel from './EnergyRowViewModel';
import EnergyDataApi from './EnergyDataApi';
@autoinject
export class Energy {
    public yearOptions: string[] = [];
    public selectedOption = 'all';
    public energyData: EnergyRowViewModel[] = [];

    @computedFrom('energyData')
    get showEnergyDataTable() {
        debugger;
        return this.energyData.length > 0;
    }

    /**
     * The selected row that was clicked for deatils.
     */
    public rowVmToShowDetailsFor: EnergyRowViewModel;


    constructor(private energyDataApi: EnergyDataApi) {
        // TODO: add computeds
        // TODO loading indicators
    }

    public attached() {
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
                return new EnergyRowViewModel(data);
            });
            this.energyData = vmList;
        });
    }
}