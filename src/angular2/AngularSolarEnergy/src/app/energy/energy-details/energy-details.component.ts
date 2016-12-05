import { Inject, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {IEnergyDataService} from 'app/energy/energy-data-service.interface';
import {IEnergyDataServiceToken} from 'app/energy/energy-data-service.token';

import EnergyDataDto from '../energyDataDto';

@Component({
  selector: 'app-energy-details',
  templateUrl: './energy-details.component.html',
  styleUrls: ['./energy-details.component.css']
})
export class EnergyDetailsComponent implements OnInit {
  public selectedEnergyData: EnergyDataDto =  new EnergyDataDto();
  constructor(@Inject(IEnergyDataServiceToken) private energyDataService: IEnergyDataService,
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
