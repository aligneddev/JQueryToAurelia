
import LoadingIndicator from './loadingIndicator';
import EnergyViewModel from './energyViewModel';
export default class App {
    constructor(private energyViewModel: EnergyViewModel) {

    }

    public initialize() {
        return this.energyViewModel.initialize();
    }
}