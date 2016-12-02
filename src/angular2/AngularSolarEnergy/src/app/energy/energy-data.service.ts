import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// https://angular.io/docs/ts/latest/tutorial/toh-pt6.html
// needed for the .toPromise()
// we could do rx with observable and map for streams of data coming in
import 'rxjs/add/operator/toPromise';
import EnergyDataDto from './energyDataDto';
import {IEnergyDataService} from './energy-data-service.interface';

/**
 * Interact with the Api.
 */
@Injectable()
export default class EnergyDataService implements IEnergyDataService {
    private yearOptions: string[] = [];
    private energyDataCache: EnergyDataDto[] = [];
    protected apiUrl = '/api/';
    protected solarUrl = 'solar';
    constructor(private http: Http) { }

    public getYearOptions(): Promise<string[]> {
        if (this.yearOptions.length > 0) {
            return Promise.resolve(this.yearOptions);
        }

        // return the promise
        // return this.http.get'/api/yearOptions').toPromise().then((response) => {
        //     // let's cache the results client side, it doesn't help in the current setup (we only load it once), 
        //     // but would help if multiple pages or other imagined scenarios
        //     // this shows the usefullness of a energyDataApi class, using promises, and a caching option.
        //     // we could also have the server return 304 and do the caching that way
        //     this.yearOptions = response.json().data;
        //     return this.yearOptions as string[];
        // }).catch(this.handleError);

        return Promise.resolve([
            'all',
            '1990',
            '2000',
            '2007'
        ]);
    }

    public getEnergyData(option: string): Promise<EnergyDataDto[]> {
        return this.http.get(this.getEnergyDataApiUrl(option)).toPromise().then((response) => {
            this.energyDataCache = this.parseEnergyDataResponse(response);
            return this.energyDataCache;
        }).catch(this.handleError);
    }

    protected getEnergyDataApiUrl(option: string) {
        return `/api/solar?year=${option}`;
    }

    protected parseEnergyDataResponse(response: Response) {
        return response.json().data;
    }

    public getEnergyDataByIdAndYear(countryId: string, year: number): Promise<EnergyDataDto> {
        if (<any>year === 'all') {
            throw new Error('Do not pass in all!');
        }

        if (this.energyDataCache.length > 0) {
            return Promise.resolve(this.findEnergyMatch(countryId, year));
        }

        return this.getEnergyData(year.toString()).then((data) => {
            return Promise.resolve(this.findEnergyMatch(countryId, year));
        });
    }

    private findEnergyMatch(countryId: string, year: number) {
        return this.energyDataCache.filter((item) => {
            return item.countryId.toString() === countryId.toString() && item.year.toString() === year.toString();
        })[0];
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
