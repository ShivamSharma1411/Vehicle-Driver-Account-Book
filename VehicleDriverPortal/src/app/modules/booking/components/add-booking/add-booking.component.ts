import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from '../../booking.service';
import { IAlert } from '../../interface/alert';
import { ALERT_TYPES } from '../../interface/alert-types';
import { IBooking } from '../../interface/booking';
import { IDrivervehicle } from '../../interface/drivervehicle';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  alerts : IAlert[] = [];
  isCreated=false;
  danger=false;
  success=false;
  info=false;
  isLoading: boolean = false;

  constructor(private _service: BookingService,private _authService: AuthService,private toastr: ToastrService) { }

  availableDriverVehicle!:IDrivervehicle;
  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
  }
    this._service.getAvailableDriverVehicle().subscribe(value=>{
      console.log(value);
        this.availableDriverVehicle=value;
    });
    this.form.reset();
  }
  form = new FormGroup({
    
    // booking_ID: new FormControl(null, [Validators.required]),
    driverId: new FormControl(0, [Validators.required]),
    vehicleId: new FormControl(0, [Validators.required]),
    startDateTime: new FormControl(null, [Validators.required]),
    endDateTime: new FormControl(null, [Validators.required]),
    fromLocation: new FormControl(null, [Validators.required]),
    toLocation: new FormControl(null, [Validators.required]),
    distance: new FormControl(null, [Validators.required]),
    bookingType: new FormControl(null, [Validators.required]),
    fuelExpense: new FormControl(null, [Validators.required]),
    tripFare: new FormControl(null, [Validators.required]),
    driverShare: new FormControl(null, [Validators.required]),
    remarks: new FormControl(null, [Validators.required]),
  });
  addbooking(): void {
    
    this.isLoading = true;
    this._service.addBooking(this.form.value as IBooking).subscribe(
      (value) => {
        console.log(value);
        this.addAlert(ALERT_TYPES.SUCCESS,"Booking Sucessfully");
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
