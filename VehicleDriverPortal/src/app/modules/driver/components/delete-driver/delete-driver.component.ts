import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ALERT_TYPES } from 'src/app/modules/booking/interface/alert-types';
import { IDriver } from 'src/app/modules/booking/interface/driver';
import { DriverService } from '../../driver.service';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']
})
export class DeleteDriverComponent implements OnInit {

  public isLoading: boolean=true;
  
  constructor( private _service:DriverService,private _authService: AuthService,private toastr: ToastrService) { }
  form = new FormGroup({
    driverId:new FormControl(null,[Validators.required])
  })

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
  }
  deleteDriver():void{
    this.isLoading = true;
    if(this.form.value.driverId ==null)
    { 
      this.addAlert(ALERT_TYPES.INFO,"Please provide License Number");
      return;
    }
    this._service.deleteDriver(this.form.value.driverId as number).subscribe(
      
      (value) => {
        console.log(value);
        this.form.reset();
        this.addAlert(ALERT_TYPES.SUCCESS, "Deletion Successful");
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
