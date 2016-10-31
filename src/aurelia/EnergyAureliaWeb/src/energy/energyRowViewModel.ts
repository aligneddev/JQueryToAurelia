import EnergyDataDto from './energyDataDto';

/**
 * View Model for the rows in the table.
 */
export default class EnergyRowViewModel {
    public isDetailsActive = false;
        constructor(private model: EnergyDataDto) { }

    /**
     * Show the details after a row tap or click.
     */
    public showDetails() {
    }

    public closeDetails() {
    }
}