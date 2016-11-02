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
        // https://github.com/softchris/aurelia in avengers/edit
        // http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/cheat-sheet/7
        // puts it all in the query string, yuck!, but it works, there must be a better way
        let urlDetail = this.router.generate('energy-details', {model: this.model});
        this.router.navigate(urlDetail);
    }

    public closeDetails() {
    }
}