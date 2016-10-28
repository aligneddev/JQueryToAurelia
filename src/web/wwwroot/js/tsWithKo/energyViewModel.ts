import * as ko from 'knockout';
import * as $ from 'jquery';
import LoadingIndicator from './loadingIndicator';
import EnergyDataApi from './energyDataApi';
import EnergyDataDto from './energyDataDto';
import EnergyRowViewModel from './energyRowViewModel';

export default class EnergyViewModel {
    public yearOptions: KnockoutObservableArray<string> = ko.observableArray([]);
    public selectedOption = ko.observable('all');
    public energyData: KnockoutObservableArray<EnergyRowViewModel> = ko.observableArray([]);

    /**
     * The selected row that was clicked for deatils.
     */
    public rowVmToShowDetailsFor: KnockoutComputed<EnergyRowViewModel>;
    /**
     * The View Model (for data binding to the View) for the main energy view.
     */
    constructor(private energyDataApi: EnergyDataApi, private loadingIndicator: LoadingIndicator) {

        // react to a change in the year option selection
        this.selectedOption.subscribe((selectedOption) => {
            this.yearOptionSelected(selectedOption);
        });

        // a computed property, updates when a value inside changes
        // not the best use (would get really CPU intensive with 1000's)
        this.rowVmToShowDetailsFor = ko.computed(() => {
            var active = this.energyData().filter((d) =>{
                return d.isDetailsActive();
            })[0];

            console.log('computing rowVmToShowDetailsFor ' + JSON.stringify(active));
            return active;
        }, this);
    }

    public initialize() {
        this.loadingIndicator.showLoading();
        var yearOptionsPromise = this.energyDataApi.getYearOptions().then((options: string[]) => {
            this.yearOptions(options);
        })

        return $.when<void | EnergyDataDto[]>(yearOptionsPromise, this.getEnergyData(this.selectedOption())).then(() => {
            this.loadingIndicator.hideLoading();
        });
    }

    public yearOptionSelected(selectedOption: string) {
        this.loadingIndicator.showLoading();
        return this.getEnergyData(selectedOption).then(() => {
            this.loadingIndicator.hideLoading();
        });
    }

    public getEnergyData(option: string) {
        return this.energyDataApi.getEnergyData(option).then((energyData) => {
            var vmList = energyData.map((data) => {
                return new EnergyRowViewModel(data);
            });
            this.energyData(vmList);
        });
    }
}