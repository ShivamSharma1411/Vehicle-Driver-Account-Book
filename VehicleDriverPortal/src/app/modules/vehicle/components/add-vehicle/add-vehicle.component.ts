import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { IAlert } from 'src/app/modules/booking/interface/alert';
import { ALERT_TYPES } from 'src/app/modules/booking/interface/alert-types';
import { IUpdateVehicle } from '../../interface/updateVehicle';
import { IVehicle } from '../../interface/vehicle';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  alerts : IAlert[] = [];
  isCreated=false;
  danger=false;
  success=false;
  info=false;
  isLoading: boolean = false;

  constructor(private _service: VehicleService,private _authService: AuthService,private toastr: ToastrService) { }

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
  }
  form = new FormGroup({
    registraionNo:new FormControl(null,[Validators.required]),
    modelName: new FormControl(null, [Validators.required]),
    vehicleType: new FormControl(null, [Validators.required]),
    numberOfSeat: new FormControl(null, [Validators.required]),
    acAvailable: new FormControl(null, [Validators.required]),
    
  });
  addVehicle():void{
    this.isLoading = true;
    this._service.addVehicle(this.form.value as IVehicle).subscribe(
      (value) => {
        console.log(value);
        this.addAlert(ALERT_TYPES.SUCCESS,"Record Added Sucessfully");
        this.form.reset();
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.addAlert(ALERT_TYPES.DANGER , "Failed");
        this.danger=true;
        this.isLoading = false;
      }
    );

  }
  closeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }

  addAlert(type:string, msg: string): void {
    if(type==ALERT_TYPES.DANGER) this.toastr.error(msg);
    else if (type==ALERT_TYPES.SUCCESS) this.toastr.success(msg);
    else this.toastr.info(msg)
  }

}
