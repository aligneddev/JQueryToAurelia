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
        // show details in a sub view instead of a modal
        // TODO: how do you do this with the Angular Router?
    }

    public closeDetails() {}
}
