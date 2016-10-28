import EnergyDataDto from './energyDataDto';
import * as $ from 'jquery';
import 'bootstrap';
import * as ko from 'knockout';

/**
 * View Model for the rows in the table.
 */
export default class EnergyRowViewModel {
    public isDetailsActive = ko.observable(false);
    constructor(private model: EnergyDataDto) { }

    /**
     * Show the details after a row tap or click.
     */
    public showDetails() {
        // Bootstrap modals don't play the best with ko bindings, will just use jQuery to show it
        // http://aboutcode.net/2012/11/15/twitter-bootstrap-modals-and-knockoutjs.html
        this.isDetailsActive(true);

        // TODO: figure out Bootstrap modal typing
        ($('#detailsModal') as any).modal('show');
    }

    public closeDetails() {
        this.isDetailsActive(false);
    }
}