import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from '../../booking.service';
import { ALERT_TYPES } from '../../interface/alert-types';
import { IBooking } from '../../interface/booking';

@Component({
  selector: 'app-get-booking-by-date-time',
  templateUrl: './get-booking-by-date-time.component.html',
  styleUrls: ['./get-booking-by-date-time.component.css']
})
export class GetBookingByDateTimeComponent implements OnInit {
  public isLoading: boolean=true;
  public bookings : IBooking[]=[];
  constructor(private _service:BookingService,private _authService: AuthService,private toastr: ToastrService) { }
  
  
  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
  }
  form = new FormGroup({
    startDateTime:new FormControl(new Date(),[Validators.required]),
    endDateTime:new FormControl(new Date(),[Validators.required]),
    
  });
  getAllBookingsByDateTime():void{
    this.isLoading = true;
    this._service.getBookingByDateTime(this.form.value.startDateTime as Date,this.form.value.endDateTime as Date).subscribe(
      
      (value) => {
        console.log(value);
        this.bookings = value;
        if(value.length==0) this.addAlert(ALERT_TYPES.INFO,"No Record Found");
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
