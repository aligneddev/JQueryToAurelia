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
        expect(data[0]).toBe('all');
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
      service.getEnergyData('all').then(data => {
        expect(data.length).toBe(1);
        expect(data[0].countryName).toBe('Denmark');
      });
    })));

    // TODO
    xit('should use year in query string', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
      service.getEnergyData('2007').then(data => {
        debugger;
        expect(false).toBeTruthy();
      });
    })));
    it('should be OK returning no data points', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getEnergyData('all').then(data => {
          expect(data.length).toBe(0);
        });
    })));
  });
});
