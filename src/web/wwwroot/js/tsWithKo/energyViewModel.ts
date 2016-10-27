import * as knockout from 'knockout';
import * as $ from 'jquery';
import LoadingIndicator from './loadingIndicator';
import EnergyDataApi from './energyDataApi';
import EnergyData from './energyData';
export default class EnergyViewModel {
    public yearOptions: KnockoutObservableArray<string> = knockout.observableArray([]);
    public selectedOption = knockout.observable('all');
    public energyData:KnockoutObservableArray<EnergyData> = knockout.observableArray([]);
    
    /**
     * The View Model (for data binding to the View) for the main energy view.
     */
    constructor(private energyDataApi: EnergyDataApi, private loadingIndicator: LoadingIndicator) {

        // react to a change in the year option selection
        this.selectedOption.subscribe((selectedOption) => {
            this.yearOptionSelected(selectedOption);
        });
    }

    public initialize() {
        this.loadingIndicator.showLoading();
        var yearOptionsPromise = this.energyDataApi.getYearOptions().then((options: string[]) => {
            this.yearOptions(options);
        })

        return $.when<void | EnergyData[]>(yearOptionsPromise, this.getEnergyData(this.selectedOption())).then(() =>{
            this.loadingIndicator.hideLoading();
        });
    }

    public yearOptionSelected(selectedOption: string) {
        this.loadingIndicator.showLoading();
        return this.getEnergyData(selectedOption).then(() =>{
            this.loadingIndicator.hideLoading();
        });
    }

    public getEnergyData(option: string) {
        return this.energyDataApi.getEnergyData(option).then((energyData) => {
            this.energyData(energyData);
        });
    }

    public showDetails() {

    }
}