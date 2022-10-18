import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ALERT_TYPES } from 'src/app/modules/booking/interface/alert-types';
import { IVehicle } from '../../interface/vehicle';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-get-vehicles-by-type',
  templateUrl: './get-vehicles-by-type.component.html',
  styleUrls: ['./get-vehicles-by-type.component.css']
})
export class GetVehiclesByTypeComponent implements OnInit {

  public isLoading: boolean=true;
  public vehicles:IVehicle[]=[];
  constructor( private _service:VehicleService, private _authService: AuthService,private toastr: ToastrService) { }
  form = new FormGroup({
    vehicleType:new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
  }
  getVehiclesByType():void{
    this.isLoading = true;
    this._service.getVehicleByType(this.form.value.vehicleType as string).subscribe(
      
      (value) => {
        console.log(value);
        if(value.length==0) this.addAlert(ALERT_TYPES.INFO,"No Record Found");
        else this.addAlert(ALERT_TYPES.INFO,"Record Retrieved");
        this.vehicles= value;
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
