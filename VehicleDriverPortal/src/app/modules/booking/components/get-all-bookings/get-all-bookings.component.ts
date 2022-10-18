import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from '../../booking.service';
import { ALERT_TYPES } from '../../interface/alert-types';
import { IBooking } from '../../interface/booking';

@Component({
  selector: 'app-get-all-bookings',
  templateUrl: './get-all-bookings.component.html',
  styleUrls: ['./get-all-bookings.component.css']
})
export class GetAllBookingsComponent implements OnInit {
  public bookings:IBooking[]=[];
  isLoading: boolean = true;
  constructor(private _service: BookingService,private _authService: AuthService,private toastr: ToastrService) { 

  }
  

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
    this.getAllBookings();
  }
  
 getAllBookings():void{
  
  this.isLoading = true;
    this._service.getAllBookings().subscribe(
      
      (value) => {
        console.log(value);
        this.bookings = value;
        if(value.length==0) this.addAlert(ALERT_TYPES.INFO,"No Record Found");
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
