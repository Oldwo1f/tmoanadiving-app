<template>
	<div>
		<div class="firsthalf">
			<div class="logo"></div>
		</div>
		<div class="secondhalf">

			<h1>Interface Plongeur</h1>
			<ValidationObserver ref="validatorLogin" v-if="!passwordforgot">
				<form @submit.prevent="submitLogin">
					<div class="inputblock">
						<div class="picto1"></div>
						<input type="text" placeholder="Email" v-model="formLogin.emailAddress">
					</div>
					<div class="inputblock">
						<div class="picto2"></div>
						<input :type="passwordVisibility" placeholder="Mot de passe" v-model="formLogin.password">

						<div class="showpasswordbtn" @click="tooglePasswordVisibility">
							<span class='material-icons' v-if="passwordVisibility == 'password'">visibility</span>
							<span class='material-icons' v-if="passwordVisibility == 'text'">visibility_off</span>
						</div>

					</div>



					<a @click="togglepasswordforgot">mot de passe oublié ?</a>
					<div class="separatorsmall"></div>
					<input type="submit" value="Se connecter">
					<Alert />
					<!-- <small>Pas encore de compte ? <a href="">Je m'inscrit</a></small> -->
				</form>
			</ValidationObserver>

			<ValidationObserver ref="validatorRecup" v-else>

				<form @submit.prevent="submitRecup">
					<p style="text-align: center;">Renseigner votre email afin de lancer la récupération de mot de
						passe.</p>

					<div class="inputblock">
						<div class="picto1"></div>
						<input type="text" placeholder="Email" v-model="formRecup.emailAddress">
					</div>

					<Alert />
					<input type="submit" value="Récupérer mon mot de passe">
					<div class="separatorsmall"></div>
					<a @click="togglepasswordforgot">Retour Login ?</a>
					<!-- <small>Pas encore de compte ? <a href="">Je m'inscrit</a></small> -->
				</form>
			</ValidationObserver>
		</div>
	</div>
</template>

<script>
export default {
	layout: "secondary",
	auth: false
}
</script>
<script setup>
import { error } from 'console';

const { $store, $auth, $router, $axios } = useNuxtApp()
const validatorLogin = ref()
const validatorRecup = ref()
const passwordVisibility = ref('password')
const passwordforgot = ref(false)
const tooglePasswordVisibility = () => {

	console.log('toogle password ');
	console.log(passwordVisibility.value);
	if (passwordVisibility.value == 'password') {
		console.log('true');
		passwordVisibility.value = 'text'
	}
	else if (passwordVisibility.value == 'text') {
		passwordVisibility.value = 'password'
	}
	console.log(passwordVisibility.value);
}
const togglepasswordforgot = () => {

	passwordforgot.value = !passwordforgot.value;
}
const formLogin = ref({
	emailAddress: '',
	password: '',
})
const formRecup = ref({
	emailAddress: '',
})

const submitLogin = async (e, context) => {

	validatorLogin.value.validate().then(async (success) => {
		if (!success) {
			return;
		}

		try {
			console.log('----------------------------');
			const datatogo = {
				emailAddress: formLogin.value.emailAddress,
				password: formLogin.value.password
			}
			console.log('datatogo', datatogo);
			let response = await $auth.loginWith('local', { data: datatogo })
			console.log(response);
			$router.push('/');
		} catch (err) {
			console.log('===>', err.response.data)
			$store.dispatch('global/alert', {
				text: err.response.data,
				variant: 'danger',
				countDown: 4
			}, { root: true })
		}

	})
};
const submitRecup = async (e, context) => {

	validatorRecup.value.validate().then(async (success) => {
		if (!success) {
			return;
		}

		try {
			console.log('----------------------------');
			const datatogo = {
				emailAddress: formRecup.value.emailAddress,
			}
			console.log('datatogo', datatogo);
			const response = await $axios.post(process.env.API_URL + 'user/forgotpassword', datatogo)
			console.log('response:', response)
			$store.dispatch('global/alert', {
				text: 'Veuillez suivre la procédure par email.',
				variant: 'success',
				countDown: 6
			}, { root: true })
			passwordforgot.value = false
			// let response = await $auth.loginWith('local', { data: datatogo })
			// console.log(response);
			// $router.push('/');
		} catch (err) {
			console.log('===>error', err)
			$store.dispatch('global/alert', {
				text: 'Une erreur s\'est produite',
				variant: 'danger',
				countDown: 4
			}, { root: true })
		}

	})
};

</script>

<style scoped lang="less">
@import '~static/less/variable.less';

h1 {
	font-size: 1.8em;
	text-transform: uppercase;
	text-align: center;
	color: @blue;
	margin-top: 20px;
	font-weight: bold;
}

.firsthalf {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	height: 50%;
	background: url('assets/images/backgroundLogin.png') no-repeat bottom;
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.firsthalf .logo {
	width: 256px;
	height: 147px;
	background: url('assets/images/logo/logo login.png') no-repeat;

}

.secondhalf {
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	height: 50%;
	background: white;
}

.secondhalf form {
	display: flex;
	flex-direction: column;
	padding: 10px 10%;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
}


.secondhalf form .inputblock {
	width: 100%;
	padding: 10px 15px;
	margin-bottom: 10px;
	border: 4px @blue solid;
	border-radius: 50px;
	color: @blue;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;

}

.secondhalf form .inputblock .picto1 {
	background: url('assets/images/id.png') no-repeat;
	display: inline-block;
	width: 30px;
	height: 30px;
	padding-right: 30px;
}

.secondhalf form .inputblock .picto2 {
	background: url('assets/images/mdp.png') no-repeat;
	display: inline-block;
	width: 30px;
	height: 30px;
	padding-right: 30px;
}

.secondhalf form input {
	font-size: 1.4em;
	border: none;
	color: @blue;
	background: transparent;
	outline: 0;
}

// .secondhalf form input .picto1 {
// 	background: url('assets/images/id.png');
// 	position: absolute;
// 	display: block;
// 	width: 30px;
// 	height: 30px;
// }

.secondhalf form a {

	padding: 10px 30px;
	font-size: 1.2em;
	margin-bottom: 0px;
	color: @blue;
	text-decoration: none;
	font-weight: bold;
}

.secondhalf .separatorsmall {
	width: 60px;
	height: 4px;
	margin-bottom: 20px;
	background: @lightblue;
	text-decoration: none;
	border-radius: 20px;
	;
}

.secondhalf form input[type="submit"] {
	padding: 10px 30px;
	font-size: 1.5em;
	margin-bottom: 10px;
	border: none;
	background: red;
	border-radius: 50px;
	display: inline-block;
	color: white;
	font-weight: bold;
}

.showpasswordbtn {
	position: absolute;
	right: 10px;
}


@media screen and (min-width:800px) {

	.firsthalf {
		width: 100%;
		position: relative;
		top: auto;
		left: auto;
		height: 49vh;
		background: url('assets/images/backgroundLogin.png') no-repeat bottom;
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.secondhalf {
		width: 100%;
		position: relative;
		bottom: auto;
		left: auto;
		height: 49vh;
		background: white;
	}

	.secondhalf form input {
		font-size: 1.4em;
		border: none;
		color: @blue;
		background: transparent;
		outline: 0;
		width: 90%;
	}

}
</style>