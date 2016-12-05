import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import EnergyDataService from './energy-data.service';
import {IEnergyDataService} from './energy-data-service.interface';

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
        return this.toCamel(response.json());
    }

    private toCamel(o) {
        // stolen from http://stackoverflow.com/questions/12931828/convert-returned-json-object-properties-to-lower-first-camelcase
        let build, key, destKey, value;

        if (o instanceof Array) {
            build = [];
            for (let key in o) {
                value = o[key];

                if (typeof value === 'object') {
                    value = this.toCamel(value);
                }
                build.push(value);
            }
        } else {
            build = {};
            for (key in o) {
                if (o.hasOwnProperty(key)) {
                    destKey = (key.charAt(0).toLowerCase() + key.slice(1) || key).toString();
                    value = o[key];
                    if (value !== null && typeof value === 'object') {
                        value = this.toCamel(value);
                    }

                    build[destKey] = value;
                }
            }
        }

        return build;
    }

    protected getEnergyDataApiUrl(option: string) {
        return `${this.apiUrl}${this.solarUrl}${option}.json`;
    }
}
