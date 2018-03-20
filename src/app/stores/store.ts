import { types, onSnapshot } from 'mobx-state-tree';
import { AuthService } from '../core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

const Store = types
	.model('RootStore', {
		title: types.string,
		uid: types.string
	})
	.actions((self) => ({
		setUser(user) {
			self.uid = user.uid;
			//console.log('setUser in mobx tree:' + self.uid);
		},
		logout() {
			self.uid = '';
			//console.log('logout user in mobx tree: ' + self.uid);
		}
	}));

const initialState = {
	title: 'Matchday',
	uid: ''
};

// create an instance from a snapshot
const store = Store.create(initialState);

export default store;
