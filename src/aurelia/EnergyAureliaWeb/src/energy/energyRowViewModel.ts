import { Router } from 'aurelia-router';
import EnergyDataDto from './energyDataDto';
/**
 * View Model for the rows in the table.
 */
export default class EnergyRowViewModel {
    public isDetailsActive = false;
    constructor(private model: EnergyDataDto, private router: Router) { }

    /**
     * Show the details after a row tap or click.
     */
    public showDetails() {
        debugger;
        // show details in a sub view instead of a modal
        // http://www.elanderson.net/2015/10/aurelia-routing-with-a-parameter/
        // https://zombiecodekill.com/2016/07/03/aurelia-routing-fundamentals/
        this.router.navigate('#/energy-details');
    }

    public closeDetails() {
    }
}