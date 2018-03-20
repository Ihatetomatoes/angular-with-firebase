import { Component } from '@angular/core';
import { AuthService, User } from '../core/auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { Player } from '../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
	private playersCollection: AngularFirestoreCollection<Player>;
	private itemDoc: AngularFirestoreDocument<Player>;
	players: Observable<Player[]>;
	player: Observable<Player>;
	user: User;
	constructor(private afs: AngularFirestore, public auth: AuthService) {
		this.auth.user.subscribe((user) => {
			if (user) {
				this.user = user;
				this.playersCollection = afs.collection<Player>('players', (ref) =>
					ref.where('createdBy', '==', this.user.uid).orderBy('name')
				);
				this.players = this.playersCollection.valueChanges();
				this.itemDoc = afs.doc<Player>('players/1');
				this.player = this.itemDoc.valueChanges();
			}
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		if (e.target.name.value) {
			this.addPlayer(e.target.name.value);
			e.target.reset();
			e.target.name.focus();
		}
	}
	addPlayer(name: string) {
		// Persist a document id
		const id = this.afs.createId();
		const item: Player = {
			id,
			name,
			createdBy: this.user.uid
		};
		this.playersCollection.add(item);
	}
	update(item: Player) {
		this.itemDoc.update(item);
	}
}
