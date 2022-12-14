const axios = require('axios').default;

export const state = () => ({
	currentPartenaire: {},
	partenaires: [],
	partenairesClose: [],
})


export const mutations = {

	setCurentPartenaire(state, payload) {
		console.log('setCurentPartenaire', payload);
		state.currentPartenaire = payload;
	},


	setPartenaires(state, payload) {
		console.log('setCurentPartenaires', payload);
		state.partenaires = payload;
	},
	setPartenairesClose(state, payload) {
		console.log('setPartenairesClose', payload);
		state.partenairesClose = payload;
	},

}


export const actions = {
	// toogleMenuCollapsed(state) {

	// 	console.log('STORE ACTION');
	// 	state.commit('toogleMenuCollapsed')
	// },
	// async fetchUsers(state, payload) {
	// 	state.commit('setIsBusy', true)
	// 	console.log('payload', payload);
	// 	// setTimeout(async function () {
	// 	const users = await axios.get('users?archive=' + payload.archive)

	// 	console.log('STORE ACTION');
	// 	state.commit('setUsers', users.data)
	// 	state.commit('setRows')
	// 	state.commit('setupTotalRows')
	// 	state.commit('setIsBusy', false)
	// 	// }, 1000)

	// },
	async addCurrent(state, payload) {
		console.log('addCurrent', payload);
		state.commit('setCurentPartenaire', payload.part)
	},
	async fetchPartenaires(state, payload) {
		// state.commit('setIsBusy', true)
		console.log('payload', payload);
		// setTimeout(async function () {
		const partenaires = await axios.get(process.env.API_URL + 'club')

		console.log('STORE ACTION');
		state.commit('setPartenaires', partenaires.data)
		// state.commit('setRows')
		// state.commit('setupTotalRows')
		// state.commit('setIsBusy', false)
		// }, 1000)

	},
	async FetchClubByPosition(state, payload) {
		// state.commit('setIsBusy', true)
		console.log('FetchClubByPosition', payload);
		// setTimeout(async function () {
		const partenaires = await axios.post(process.env.API_URL + 'club/byPosition', payload)

		console.log(partenaires)
		console.log('STORE ACTION');
		state.commit('setPartenairesClose', partenaires.data)
		// state.commit('setRows')
		// state.commit('setupTotalRows')
		// state.commit('setIsBusy', false)
		// }, 1000)

	},
	async fetchPartenaire(state, payload) {
		console.log('mypayload', payload);
		const part = await axios.get(process.env.API_URL + 'partenaire/' + payload.id)

		console.log('STORE ACTION setCurentPartenaire');
		state.commit('setCurentPartenaire', part.data)
	},
	async updateCurrentPartenaire(state, payload) {
		console.log('mypayload', payload);
		console.log(state);
		// console.log(state.state.currentUser);
		let part = {};
		part = payload.formdata.value
		console.log('part', part);
		const edit = await axios.patch(process.env.API_URL + 'partenaire/' + part.id, { datas: part }).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {

				// const users = [...state.state.users];
				// console.log('users', users);
				// var index = _.findIndex(users, { id: rep.data.id });
				// console.log('index=', index);
				// users.splice(index, 1, rep.data);
				// state.commit('setUsers', users)
				state.commit('setCurentPartenaire', rep.data)

				state.dispatch('global/alert', {
					text: 'Fiche club enregistr??',
					variant: 'success',
					countDown: 2
				}, { root: true })
			}
		})
	},
	// async removeOneUser(state, payload) {
	// 	console.log('mypayload removeOneUser', payload);
	// 	console.log(state);
	// 	// console.log(state.state.currentUser);
	// 	// const user = { ...state.state.currentUser };
	// 	// user[payload.key] = payload.val
	// 	// console.log('user', user);
	// 	const deleted = await axios.delete('user/' + payload.id).then(function (rep) {
	// 		console.log('rep axios', rep);
	// 		if (rep.status === 200) {

	// 			const users = [...state.state.users];
	// 			console.log('users', users);
	// 			var index = _.findIndex(users, { id: rep.data });
	// 			console.log('index=', index);
	// 			users.splice(index, 1);
	// 			state.commit('setUsers', users)
	// 			state.commit('setCurentUser', {})

	// 			state.dispatch('global/alert', {
	// 				text: 'Utilisateur supprim??',
	// 				variant: 'success',
	// 				countDown: 2
	// 			}, { root: true })
	// 		}
	// 	})
	// },
	// async updateUserStatus(state, payload) {
	// 	console.log('mypayload', payload);
	// 	let valueToupdate = ''
	// 	let responseValue = ''

	// 	switch (payload.action) {
	// 		case 'archiver':
	// 			valueToupdate = 'archive';
	// 			responseValue = 'Utilisateur archiv??';
	// 			break;
	// 		case 'desarchiver':
	// 			valueToupdate = 'inactif';
	// 			responseValue = 'Utilisateur d??sarchiv??';
	// 			break;
	// 		case 'activer':
	// 			valueToupdate = 'actif';
	// 			responseValue = 'Utilisateur activ??';
	// 			break;
	// 		case 'desactiver':
	// 			valueToupdate = 'inactif';
	// 			responseValue = 'Utilisateur d??sactiv??';
	// 			break;

	// 		default:
	// 			break;
	// 	}

	// 	const edit = await axios.patch('user/' + payload.id, { datas: { status: valueToupdate } }).then(function (rep) {
	// 		console.log('rep axios', rep);
	// 		if (rep.status === 200) {

	// 			const users = [...state.state.users];
	// 			console.log('users', users);
	// 			var index = _.findIndex(users, { id: rep.data.id });
	// 			console.log('index=', index);
	// 			users.splice(index, 1, rep.data);
	// 			state.commit('setUsers', users)
	// 			// state.commit('setCurentUser', rep.data)

	// 			state.dispatch('global/alert', {
	// 				text: responseValue,
	// 				variant: 'success',
	// 				countDown: 2
	// 			}, { root: true })
	// 		}
	// 	})
	// },
	// async resetPassword(state, payload) {
	// 	console.log('mypayload resetPassword', payload);
	// 	const edit = await axios.patch('user/resetPassword/' + payload.id, {}).then(function (rep) {
	// 		console.log('rep axios', rep);
	// 		if (rep.status === 200) {

	// 			// const users = [...state.state.users];
	// 			// console.log('users', users);
	// 			// var index = _.findIndex(users, { id: rep.data.id });
	// 			// console.log('index=', index);
	// 			// users.splice(index, 1, rep.data);
	// 			// state.commit('setUsers', users)
	// 			// state.commit('setCurentUser', rep.data)

	// 			state.dispatch('global/alert', {
	// 				text: 'Password r??initialis?? et envoy?? par email ?? l\'utilisateur',
	// 				variant: 'success',
	// 				countDown: 4
	// 			}, { root: true })
	// 		}
	// 	})
	// },
	// async createUser(state, payload) {

	// 	// return { toto: 'toto' }
	// 	console.log('mypayload createUser', payload);
	// 	return await axios.post('user', payload.formdata).then(function (rep) {
	// 		console.log('rep axios', rep);
	// 		if (rep.status === 200) {

	// 			// const users = [...state.state.users];
	// 			// console.log('users', users);
	// 			// var index = _.findIndex(users, { id: rep.data.id });
	// 			// console.log('index=', index);
	// 			// users.splice(index, 1, rep.data);
	// 			// state.commit('setUsers', users)
	// 			// state.commit('setCurentUser', rep.data)

	// 			state.dispatch('global/alert', {
	// 				text: 'Utilisateur ajout??',
	// 				variant: 'success',
	// 				countDown: 2

	// 			}, { root: true })

	// 			console.log(' rep.data.id', rep.data.id);

	// 			return { success: true, id: rep.data.id };
	// 		}

	// 	}).catch(
	// 		function (err, v) {
	// 			console.log(err);
	// 			console.log(err.response);
	// 			if (err.response.status === 409) {

	// 				console.log('heyho');
	// 				state.dispatch('global/alert', {
	// 					text: 'Adresse email d??j?? utilis??e',
	// 					variant: 'danger',
	// 					countDown: 5
	// 				}, { root: true })
	// 				return { err: 'Adresse email d??j?? utilis??e' };

	// 			}
	// 			if (err.response.status === 400) {

	// 				console.log('heyho');
	// 				state.dispatch('global/alert', {
	// 					text: 'Une erreur s\'est produite, v??rifier votre saisie',
	// 					variant: 'danger',
	// 					countDown: 5
	// 				}, { root: true })
	// 				return { err: 'Une erreur s\'est produite, v??rifier votre saisie' };

	// 			}
	// 		}
	// 	)
	// }
}