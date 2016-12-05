import EnergyDataDto from './energyDataDto';

export interface IEnergyDataService {
    getYearOptions(): Promise<string[]>;
    getEnergyData(option: string): Promise<EnergyDataDto[]>;
    getEnergyDataByIdAndYear(countryId: string, year: number): Promise<EnergyDataDto>;
}
