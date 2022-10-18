import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ALERT_TYPES } from 'src/app/modules/booking/interface/alert-types';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css']
})
export class DeleteVehicleComponent implements OnInit {

  public isLoading: boolean=true;
  
  constructor( private _service:VehicleService,private _authService: AuthService,private toastr: ToastrService) { }
  form = new FormGroup({
    vehicleId:new FormControl(null,[Validators.required])
  })

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
  }

  deleteVehicle():void{
    this.isLoading = true;
    if(this.form.value.vehicleId ==null){ 
      this.addAlert(ALERT_TYPES.INFO,"Please provide Registration Number");
      return;
    }
    this._service.deleteVehicle(this.form.value.vehicleId as number).subscribe(
      
      (value) => {
        console.log(value);
        this.addAlert(ALERT_TYPES.SUCCESS, "Deletion Successful");
        this.form.reset();
        this.isLoading = false;
      },
      (error) => {console.error(error);
        this.addAlert(ALERT_TYPES.DANGER , "Deletion Failed");
      this.isLoading = false;}
    ); 
      }    

      addAlert(type:string, msg: string): void {
        if(type==ALERT_TYPES.DANGER) this.toastr.error(msg);
        else if (type==ALERT_TYPES.SUCCESS) this.toastr.success(msg);
        else this.toastr.info(msg)
      }
}
