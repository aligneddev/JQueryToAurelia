import * as $ from 'jquery';
import EnergyDataDto from './energyDataDto';
export default class EnergyDataApi {
    private yearOptions: string[] = [];

    public getYearOptions() {
        if (this.yearOptions.length > 0) {
            return $.Deferred().resolve(this.yearOptions);

            // I wanted to use ES6 promises, but got hung up on TS typings
           // return Promise.resolve(this.yearOptions);
        }

        // return the promise
        return $.getJSON('/api/energy/yearOptions').then(function (options: string[]) {
            // let's cache the results client side, it doesn't help in the current setup (we only load it once), but would help if multiple pages or other imagined scenarios
            // this shows the usefullness of a energyDataApi class, using promises, and a caching option.
            // we could also have the server return 304 and do the caching that way
            this.yearOptions = options;
            return this.yearOptions as string[];
        });
    }

    public getEnergyData(option: string): JQueryPromise<EnergyDataDto[]>{        
        return $.getJSON(`/api/energy/solar?year=${option}`);
    }
}