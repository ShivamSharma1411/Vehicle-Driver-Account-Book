import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    if (!this._authService.isAuthenticated()) {
      this._authService.navigate(['']);
      return;
    }
  }

}
