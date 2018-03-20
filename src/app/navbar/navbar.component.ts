import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../core/auth.service';
import store from '../stores/store';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {
	store = store;
	constructor(public auth: AuthService) {}

	ngOnInit() {}
}
