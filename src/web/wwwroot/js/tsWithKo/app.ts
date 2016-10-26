import * as knockout from 'knockout';
import LoadingIndicator from './loadingIndicator';
import EnergyDataApi from './energyDataApi';
import 'jQuery';
export default class App {
    public yearOptions: KnockoutObservableArray<string> = knockout.observableArray([]);

    constructor(private energyDataApi: EnergyDataApi, private loadingIndicator: LoadingIndicator) {
    }

    public initialize() {
        var yearOptionsPromise = this.energyDataApi.getYearOptions().then((options) => {
            this.yearOptions(options);
        })

        return $.when(yearOptionsPromise, this.energyDataApi.getEnergyData('all'));
    }

    public yearOptionSelected() {

    }

    public getEnergyData(option: string) {
        return this.energyDataApi.getEnergyData(option);
    }

    public showDetails() {
        
    }
}