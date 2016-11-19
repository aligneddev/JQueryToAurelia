import { Energy } from '../../src/energy/energy';
import EnergyDataApi from '../../src/energy/energyDataApi';
import RouterFake from './routerFake';
import HttpFake from './httpFake';

describe('Given the energy module', () => {
    let energy: Energy;
    let energyDataApiFake: EnergyDataApi;
    let routerFake = new RouterFake();
    let httpFake = new HttpFake();
    beforeEach(() => {
        energyDataApiFake = new EnergyDataApi(httpFake as any);
        energy = new Energy(energyDataApiFake, routerFake as any);
    });
    it('Should should hide energy data if no data loaded', () => {
        expect(energy.showEnergyDataTable).toBeFalsy();
    });
    it('Should should show energy data if data was loaded', () => {
        energy.energyData.push({} as any);
        expect(energy.showEnergyDataTable).toBeTruthy();
    });
});
