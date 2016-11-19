import { Energy } from '../../src/energy/energy';
import EnergyDataApi from '../../src/energy/energyDataApi';
import RouterFake from './routerFake';
import HttpFake from './httpFake';
import { HttpClient } from 'aurelia-fetch-client';

describe('Given the energy module', () => {
    let energy: Energy;
    let energyDataApiFake: EnergyDataApi;
    let routerFake = RouterFake.createRouterFake();
    let httpFake = HttpFake.createHttpFake();
    beforeEach(() => {
        energyDataApiFake = new EnergyDataApi(httpFake as HttpClient);
        energy = new Energy(energyDataApiFake, routerFake as any);
    });
    it('Should should hide energy data if no data loaded', () => {
        expect(energy.showEnergyDataTable).toBeFalsy();
    });
    it('Should should show energy data if data was loaded', () => {
        energy.energyData.push({} as any);
        expect(energy.showEnergyDataTable).toBeTruthy();
    });
    // describe('When activated', () => {
    //     it('should fill the year options', (done) => {
    //         httpFake.items = ['all', 'test', 'test2'];
    //         energy.activate().then(() => {
    //             expect(energy.yearOptions[0]).toBe('all');
    //             expect(energy.yearOptions.length).toBe(3);
    //             done();
    //         });
    //     });
    // });
});
