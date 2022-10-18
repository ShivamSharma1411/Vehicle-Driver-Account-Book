import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from '../../booking.service';
import { ALERT_TYPES } from '../../interface/alert-types';
import { IBooking } from '../../interface/booking';

@Component({
  selector: 'app-get-booking-by-id',
  templateUrl: './get-booking-by-id.component.html',
  styleUrls: ['./get-booking-by-id.component.css']
})
export class GetBookingByIdComponent implements OnInit {
   booking !:IBooking ;
  public isLoading: boolean=true;
  constructor( private _service:BookingService,private _authService: AuthService,private toastr: ToastrService) { }

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
  }
  
  form = new FormGroup({
    booking_ID:new FormControl(null,[Validators.required]),
  });
    
    
  
  getBookingById():void{
    this.isLoading = true;
    if(this.form.value.booking_ID ==null){ 
      this.addAlert(ALERT_TYPES.INFO,"Please Provide the Booking Id");
      return;
    }
    this._service.getBookingById(this.form.value.booking_ID as number).subscribe(
      
      (value) => {
        console.log(value);
        this.booking = value;
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
