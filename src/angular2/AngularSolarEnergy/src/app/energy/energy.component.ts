import EnergyDataService from './energy-data.service';
import EnergyRowViewModel from './energyRowViewModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css']
})
export class EnergyComponent implements OnInit {
  public yearOptions: string[] = [];
  public selectedOption = 'all';
  public energyData: EnergyRowViewModel[] = [];
  constructor(private energyDataService: EnergyDataService) { }

  ngOnInit() {
    const yearOptionsPromise = this.energyDataService.getYearOptions().then((options: string[]) => {
      this.yearOptions = options;
    });

    return Promise.all([yearOptionsPromise, this.getEnergyData(this.selectedOption)]);
  }

  public yearOptionSelected(selectedOption: string) {
    return this.getEnergyData(selectedOption);
  }

  public getEnergyData(option: string) {
    return this.energyDataService.getEnergyData(option).then((energyData) => {
      const vmList = energyData.map((data) => {
        return new EnergyRowViewModel(data);
      });
      this.energyData = vmList;
    });
  }
}
