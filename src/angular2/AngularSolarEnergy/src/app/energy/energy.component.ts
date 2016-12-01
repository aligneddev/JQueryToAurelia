import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import EnergyDataDto from './energyDataDto';
import EnergyDataJsonService from './energy-data-json.service';

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css']
})
export class EnergyComponent implements OnInit {
  public yearOptions: string[] = [];
  public selectedYearOption = 'all';
  public energyData: EnergyDataDto[] = [];
  constructor(private energyDataService: EnergyDataJsonService, private router: Router) { }

  ngOnInit() {
    const yearOptionsPromise = this.energyDataService.getYearOptions().then((options: string[]) => {
      this.yearOptions = options;
    });

    return Promise.all([yearOptionsPromise, this.getEnergyData(this.selectedYearOption)]);
  }

  public yearOptionSelected(selectedOption: string) {
    return this.getEnergyData(selectedOption);
  }

  public getEnergyData(option: string) {
    return this.energyDataService.getEnergyData(option).then((energyData) => {
      this.energyData = energyData;
    });
  }

  public showDetails(data: EnergyDataDto) {
    this.router.navigate(['/energy-details', data.countryId, data.year]);
  }
}
