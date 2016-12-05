import EnergyDataDto from './energy/energyDataDto';
import { HttpMethodInterceptorArgs, createObservableResponse, InMemoryDbService, STATUS } from 'angular-in-memory-web-api';
import { ResponseOptions } from '@angular/http';

/**
 * In memory service until we get a real API running.
 * Example at https://github.com/angular/in-memory-web-api/blob/master/examples/hero-data.service.ts#L70
 * and https://angular.io/docs/ts/latest/guide/server-communication.html#!#in-mem-web-api
 * and https://angular.io/docs/ts/latest/tutorial/toh-pt6.html
 */
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    let yearOptions = this.generateYearOptions();

    let solar = this.generateSolarEnergyData();
    return { yearOptions, solar };
  }

  private generateSolarEnergyData() {
    let data = [];
    let one = new EnergyDataDto();
    one.year = 2007;
    one.countryName = 'Denmark';
    one.quantity = '100000';
    data.push(one);
    return data;
  }

  private generateYearOptions() {
    return [
      'all',
      '1990',
      '2000',
      '2007'
    ];
  }

  // HTTP GET interceptor
  protected get(interceptorArgs: HttpMethodInterceptorArgs) {
    console.log(`HTTP GET override for ${interceptorArgs.requestInfo.req.url}`);
    let resp: ResponseOptions;
    const {headers} = interceptorArgs.requestInfo;
    let data = [];
    if (interceptorArgs.requestInfo.req.url.search('yearOptions') > 0) {
      data = this.generateYearOptions();
    } else if (interceptorArgs.requestInfo.req.url.search('solar') > 0) {
      data = this.generateSolarEnergyData();
    }
    resp = new ResponseOptions({
      body: { data: data },
      headers: headers,
      status: STATUS.OK
    });

    return createObservableResponse(resp);
  }
}
