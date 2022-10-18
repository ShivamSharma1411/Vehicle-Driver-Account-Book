import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-get-available-driver-vehicle',
  templateUrl: './get-available-driver-vehicle.component.html',
  styleUrls: ['./get-available-driver-vehicle.component.css']
})
export class GetAvailableDriverVehicleComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['/executive/login']);
      return;
    }
  }

}
