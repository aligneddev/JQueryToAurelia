/* tslint:disable:no-unused-variable */

import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import EnergyDataService from './energy-data.service';
import EnergyDataDto from './energyDataDto';

describe('Given the EnergyDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [EnergyDataService, { provide: XHRBackend, useClass: MockBackend }],
    });
  });

  it('should be created', inject([EnergyDataService], (service: EnergyDataService) => {
    expect(service).toBeTruthy();
  }));
  describe('When getting the year options', () => {
    let service: EnergyDataService;
    beforeEach(() => {
      // no http mock needed, until the hard coded values are removed
      service = new EnergyDataService(null);
    });
    it('should return values', async(inject([], () => {
      service.getYearOptions().then((data) => {
        expect(data.length).toBeGreaterThan(1);
        expect(data[0]).toBe('All');
      });
    })));
  });
  describe('When getting the energy data', () => {
    let backend: MockBackend;
    let service: EnergyDataService;
    let fakeEnergyData: EnergyDataDto[];
    let response: Response;

    const makeEnergyData = () => {
      let data = [];
      let one = new EnergyDataDto();
      one.year = 2007;
      one.countryName = 'Denmark';
      one.quantity = '100000';
      data.push(one);
      return data;
    };
    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new EnergyDataService(http);
      fakeEnergyData = makeEnergyData();
      let options = new ResponseOptions({ status: 200, body: { data: fakeEnergyData } });
      response = new Response(options);
    }));
    it('should return fake values', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
      service.getEnergyData('All').then(data => {
        expect(data.length).toBe(1);
        expect(data[0].countryName).toBe('Denmark');
      });
    })));

    it('should use year in query string', async(inject([], () => {
      spyOn(service as any, 'getEnergyDataApiUrl').and.callThrough();
      backend.connections.subscribe((c: MockConnection) => {
        c.mockRespond(response);

        expect(c.request.url).toBe(`/api/solar?year=2007`);
      });
      service.getEnergyData('2007').then(data => {
        // I was hoping to use backendend somehow instead, but it's out of scope
        // http://stackoverflow.com/questions/40977555/unit-test-and-assert-http-get-querystring-call-in-angular2
        expect((<any>service).getEnergyDataApiUrl).toHaveBeenCalledWith('2007');
      });
    })));
    it('should be OK returning no data points', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getEnergyData('All').then(data => {
          expect(data.length).toBe(0);
        });
    })));
  });
});
