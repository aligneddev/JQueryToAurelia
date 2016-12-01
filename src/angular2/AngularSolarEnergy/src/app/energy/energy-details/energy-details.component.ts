import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import EnergyDataJsonService from 'app/energy/energy-data-json.service';
import EnergyDataDto from '../energyDataDto';

@Component({
  selector: 'app-energy-details',
  templateUrl: './energy-details.component.html',
  styleUrls: ['./energy-details.component.css']
})
export class EnergyDetailsComponent implements OnInit {
  public selectedEnergyData: EnergyDataDto =  new EnergyDataDto();
  constructor(private energyDataService: EnergyDataJsonService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.energyDataService.getEnergyDataByIdAndYear(params['id'], params['year']);
      })
      .subscribe(data => {
        this.selectedEnergyData = data;
      });
  }

  public goBack() {
    this.location.back();
  }
}
