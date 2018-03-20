import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

interface Item {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private itemsCollection: AngularFirestoreCollection<Item>;
  private itemDoc: AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;
  item: Observable<Item>;
  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();

    this.itemDoc = afs.doc<Item>('items/1');
    this.item = this.itemDoc.valueChanges();
  }
  handleSubmit(e) {
    e.preventDefault();

    if (e.target.name.value) {
      this.addItem(e.target.name.value);
      e.target.reset();
      e.target.name.focus();
    }
  }
  addItem(name: string) {
    // Persist a document id
    const id = this.afs.createId();
    const item: Item = { id, name };
    this.itemsCollection.add(item);
  }
  update(item: Item) {
    this.itemDoc.update(item);
  }
}
