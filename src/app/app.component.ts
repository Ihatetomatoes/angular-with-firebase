import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSpinner: boolean = true;
  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.showSpinner = false;
    });
  }
}
