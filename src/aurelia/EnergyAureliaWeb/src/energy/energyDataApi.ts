import EnergyDataDto from './energyDataDto';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';

@autoinject
export default class EnergyDataApi {
    private yearOptions: string[] = [];
    private energyDataCache: EnergyDataDto[] = [];
    constructor(private http: HttpClient) {
        http.configure(config => {
            config.useStandardConfiguration();
        });
    }

    public getYearOptions(): Promise<string[]> {
        if (this.yearOptions.length > 0) {
            return Promise.resolve(this.yearOptions);
        }

        // return the promise
        return this.http.fetch('/api/energy/yearOptions').then((response) => {
            // let's cache the results client side, it doesn't help in the current setup (we only load it once), 
            // but would help if multiple pages or other imagined scenarios
            // this shows the usefullness of a energyDataApi class, using promises, and a caching option.
            // we could also have the server return 304 and do the caching that way
            return response.json().then((data: string[]) => {
                this.yearOptions = data;
                return this.yearOptions as string[];
            });
        });
    }

    public getEnergyData(option: string): Promise<EnergyDataDto[]> {
        return this.http.fetch(`/api/energy/solar?year=${option}`).then((response) => {
            return response.json().then(data => {
                this.energyDataCache = data;
                return data;
            });
        });
    }

    public getEnergyDataByIdAndYear(id: string, year: number): Promise<EnergyDataDto> {
        if (this.energyDataCache.length > 0) {
            return Promise.resolve(this.findEnergyMatch(id, year));
        }

        return this.getEnergyData(year.toString()).then((data) => {
            return Promise.resolve(this.findEnergyMatch(id, year));
        });
    }

    private findEnergyMatch(id: string, year: number) {
        return this.energyDataCache.filter((item) => {
            return item.countryId.toString() === id.toString() && item.year.toString() === year.toString();
        })[0];
    }
}
