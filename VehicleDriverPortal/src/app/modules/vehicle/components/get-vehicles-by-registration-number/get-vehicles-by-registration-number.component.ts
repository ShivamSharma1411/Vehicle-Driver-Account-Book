import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ALERT_TYPES } from 'src/app/modules/booking/interface/alert-types';
import { IVehicle } from '../../interface/vehicle';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-get-vehicles-by-registration-number',
  templateUrl: './get-vehicles-by-registration-number.component.html',
  styleUrls: ['./get-vehicles-by-registration-number.component.css']
})
export class GetVehiclesByRegistrationNumberComponent implements OnInit {

  vehicle !:IVehicle;
  public isLoading: boolean=true;
  constructor( private _service:VehicleService, private _authService: AuthService,private toastr: ToastrService) { }

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
  }
  
  form = new FormGroup({
    vehicleId:new FormControl(null,[Validators.required]),
  });
  getVehicleByRegistrationNumber():void{
    this.isLoading = true;
    if(this.form.value.vehicleId ==null){ 
      this.addAlert(ALERT_TYPES.INFO,"Please Provide the Registration Number");
      return;
    }
    this._service.getVehicleByRegistrationNumber(this.form.value.vehicleId as number).subscribe(
      
      (value) => {
        console.log(value);
        this.vehicle = value;
        if(value==null) this.addAlert(ALERT_TYPES.INFO,"No Record Found");
        else this.addAlert(ALERT_TYPES.INFO,"Record Retrieved");
        this.isLoading = false;
      },
      (error) => {console.error(error);
      this.isLoading = false;}
    ); 

  }

  addAlert(type:string, msg: string): void {
    if(type==ALERT_TYPES.DANGER) this.toastr.error(msg);
    else if (type==ALERT_TYPES.SUCCESS) this.toastr.success(msg);
    else this.toastr.info(msg)
  }

}
