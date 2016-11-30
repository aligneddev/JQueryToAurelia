import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// https://angular.io/docs/ts/latest/tutorial/toh-pt6.html
// needed for the .toPromise()
// we could do 
import 'rxjs/add/operator/toPromise';
import EnergyDataDto from './energyDataDto';

@Injectable()
/**
 * Interact with the Api.
 */
export default class EnergyDataService {
    private yearOptions: string[] = [];
    private energyDataCache: EnergyDataDto[] = [];
    constructor(private http: Http) {
    }

    public getYearOptions(): Promise<string[]> {
        if (this.yearOptions.length > 0) {
            return Promise.resolve(this.yearOptions);
        }

        // return the promise
        return this.http.get('/api/yearOptions').toPromise().then((response) => {
            // let's cache the results client side, it doesn't help in the current setup (we only load it once), 
            // but would help if multiple pages or other imagined scenarios
            // this shows the usefullness of a energyDataApi class, using promises, and a caching option.
            // we could also have the server return 304 and do the caching that way
            this.yearOptions = response.json().data;
            return this.yearOptions as string[];
        }).catch(this.handleError);
    }

    public getEnergyData(option: string): Promise<EnergyDataDto[]> {
        return this.http.get(`/api/solar?year=${option}`).toPromise().then((response) => {
            this.energyDataCache = response.json().data;
            return this.energyDataCache;
        }).catch(this.handleError);
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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
