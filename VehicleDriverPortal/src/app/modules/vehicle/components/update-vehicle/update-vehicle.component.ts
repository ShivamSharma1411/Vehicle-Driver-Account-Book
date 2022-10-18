import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ALERT_TYPES } from 'src/app/modules/booking/interface/alert-types';
import { IUpdateVehicle } from '../../interface/updateVehicle';
import { IVehicle } from '../../interface/vehicle';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  public vehicles:IVehicle[]=[];
  constructor(private _service:VehicleService, private _authService: AuthService,private toastr: ToastrService){}
  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
    this._service.getAllVehicles().subscribe(value=>{
      console.log(value);
        this.vehicles=value;
    });
    this.form2.reset();
  }
  form=new FormGroup({
    vehicleId: new FormControl(0, [Validators.required]),
  })
  form2= new FormGroup({
    
    modelName: new FormControl('', [Validators.required]),
    vehicleType: new FormControl('', [Validators.required]),
    numberOfSeat: new FormControl(0, [Validators.required]),
    acAvailable: new FormControl('', [Validators.required]),
    
  });
   handleVehicleChange(){
    if(this.form.invalid) return;
    console.log(this.form.value);
    const vehicle :IVehicle=this.vehicles.find(x=>x.registrationNo==this.form.value.vehicleId,) as IVehicle;
    this.form2.setValue({
      modelName:vehicle.modelName || '',
      vehicleType:vehicle.vehicleType || '',
      numberOfSeat:vehicle.numberOfSeat || 0,
      acAvailable:vehicle.acAvailable || ''
    })

   }
   updateVehicle():void{
    this._service.updateVehicle(this.form.value.vehicleId as number,this.form2.value as IUpdateVehicle).subscribe(
      (value)=>{
        console.log(value);
        this.addAlert(ALERT_TYPES.SUCCESS,"Record Updated Successfully");
        this.form2.reset();
      },
      (error) => {
        this.addAlert(ALERT_TYPES.DANGER,"Updation Failed");
        console.error(error);}
    )    
    }

    addAlert(type:string, msg: string): void {
      if(type==ALERT_TYPES.DANGER) this.toastr.error(msg);
      else if (type==ALERT_TYPES.SUCCESS) this.toastr.success(msg);
      else this.toastr.info(msg)
    }
   }
  
    

