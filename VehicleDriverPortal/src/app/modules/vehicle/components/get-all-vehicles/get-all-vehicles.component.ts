import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IVehicle } from '../../interface/vehicle';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-get-all-vehicles',
  templateUrl: './get-all-vehicles.component.html',
  styleUrls: ['./get-all-vehicles.component.css']
})
export class GetAllVehiclesComponent implements OnInit {
  public vehicles:IVehicle[]=[];
  isLoading: boolean = true;
  constructor(private _service: VehicleService, private _authService: AuthService) { 

  }
  

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
    this.getAllVehicles();
  }
  getAllVehicles():void{
  
    this.isLoading = true;
      this._service.getAllVehicles().subscribe(
        
        (value) => {
          console.log(value);
           
          this.vehicles = value;
          this.isLoading = false;
        },
        (error) => {console.error(error);
        this.isLoading = false;}
      ); 
        }
}
