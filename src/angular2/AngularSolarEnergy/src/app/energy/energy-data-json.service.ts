import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import EnergyDataService from './energy-data.service';

/**
 * Get the data directly from the JSON files.
 */
@Injectable()
export default class EnergyDataJsonService extends EnergyDataService {
    constructor(http: Http) {
        super(http);
        this.apiUrl = '/data/';
        this.solarUrl = 'SolarEnergy';
    }

    protected parseEnergyDataResponse(response: Response) {
        return response.json().d.results;
    }

    protected getEnergyDataApiUrl(option: string) {
        return `${this.apiUrl}${this.solarUrl}${option}.json`;
    }
}
