<template>
  <div class="contentInside">
	<!-- <div class="blockName">
			<div class="profilepicture"><avatar :username="$auth.user.firstName +' '+ $auth.user.lastName" inline></avatar></div>
			<div class="blocktext">
				<div class="name"> {{$auth.user.firstName}} {{$auth.user.lastName}}</div>
				<div class="adresse"> {{$auth.user.country}}</div>
			</div>
				
		</div> -->
		<div class="blockcredit">
			<h3>Mes crédits</h3>
			<div class="text"><span class="number">{{$calculateCredit($auth.user,$dayjs)}}</span> plongées</div>
			<div class="ddateexpi">à utiliser avant <strong>le {{$dayjs( $calculateDateExpi($auth.user,$dayjs)).format('DD MMMM YYYY')}}</strong> </div>
		</div>	
		<div class="passacheter" v-if="$auth.user.passacheter">
			<div class="pass" v-for="pass in $auth.user.passacheter" :key="pass.id">
				<!-- <div class="left">
					<div class="pictoPass">Pass acheté</div>
					<a :href="$config.apiURL+'facturepass/'+pass.id"   class="facture">Télécharger la facture</a>
				</div> -->
				<div class="right">
					<div class="line"><label for="">Nb plongée achetée : </label> <span>{{pass.nbplongee}}</span></div>
				<div class="line"><label for="">Nb plongée restante : </label> <span>{{pass.nbplongeerestant}}</span></div>
				<div class="line"><label for="">Tarif résident : </label> <span>{{pass.resident?'oui':'non'}}</span></div>
				<div class="line"><label for="">Date achat : </label> <span>{{$dayjs(pass.createdAt).format('DD/MM/YYYY')}}</span></div>
				<div class="line"><label for="">Date d'effet : </label> <span>{{$dayjs(pass.dateeffect).format('DD/MM/YYYY')}}</span></div>
				</div>
			</div>
		</div>
		<Plongeur type="first" :user="$auth.user"/>
		<div class="plongueurseparator"></div>
		<Plongeur type="second" :user="$auth.user"/>
		<div class="redseparator"></div>

		<div class="plongees">
			<h3>Liste des plongées</h3>
			<div class="plongee" v-for="plongee in $auth.user.plongees" :key="plongee.id">
					<span class="a">{{$dayjs(plongee.createdAt).format('DD/MM/YYYY')}}</span> 
					<span class="b">{{plongee.partenaire.name}}</span> 
					<span class="c">x{{plongee.nbPlongeur}}</span> 
			</div>
		</div>
		
		<div class="logoutBtn" @click="$auth.logout()">
			<div class="picto"></div>
			<div class="text">Déconnexion</div>
		</div>
		<nuxt-link to="/changepassword" class="changepasswordbtn">
			<div class="picto"></div>
			<div class="text">Changer mon mot de passe</div>
		</nuxt-link>
		<nuxt-link to="/removeaccount" class="removeaccountBtn">
			<div class="text">Supprimer mon compte</div>
		</nuxt-link>
		
  </div>
</template>

<script setup>
import CarouselClub from '../components/CarouselClub.vue';
import Avatar from 'vue-avatar'
  const { $store} = useNuxtApp()
  const { state } = $store




//   const items= computed({
// 		set: (val) => {},
// 		get:() =>  state.jeux.jeux,
//   })

// const logout = () => {
	
// }

 
</script>

<style scoped lang="less">
@import '~static/less/variable.less';

.contentInside{
      top: 0;
      bottom: 0;
      
        padding:40px 0px 50px 0px;
            // background: url('assets/images/bg1.png') no-repeat;
            // background-size: cover;
}
.blockName {
	color: white;
	background: @blue;
	background: linear-gradient(180deg, @blue 0%, @lightblue 100%);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	padding:7px;

	.profilepicture {
		width: 50px;
		height: 50px;
		border-radius: 50px;
		// background: red;
	}

	.blocktext {
		margin-left: 30px;
		line-height: 1em;
	}
	.name {
		color: white;
		font-size: 1.5em;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.adresse {
		color: white;
		font-size: 1.2em;
		font-weight: normal;
	}

}



.blockcredit {
	width: 80%;
	margin-left: 10%;
	text-align: center;
	margin-top: 10px;
	color: @blue;
	border-bottom: 4px solid red;
	padding-bottom: 10px;

	h3 {
	text-transform: uppercase;
	margin-bottom: 20px;
	font-size: 2.3em;
	font-weight: bold;
	}
	.text {
		font-size: 1.8em;
		font-weight: bold;
		line-height: 1em;
		span {
			font-size: 2.5em;
			font-weight: bold;
		}
	}
	.ddateexpi {
		margin-top: 10px;
		font-size: 1.2em;
		font-weight: normal;
		strong {
			font-size: 1.2em;
			font-weight: bold;
		}
	}
}







.plongueurseparator {
	height: 3px;
	width: 80%;
	margin-left: 10%;
	text-align: center;
	background: lightgrey;
	margin-top: 30px;
	margin-bottom: 10px;
}

.plongees{
	width: 80%;
	margin-left: 10%;
	text-align: center;
	h3{
		font-weight: bold;
		font-size: 1.5em;
		color:@blue;
		margin-top: 10px;
	}
	.plongee{
		border : 1px dashed @blue;
		margin-bottom: 2px;
		padding : 10px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 5px;
	}

}

.changepasswordbtn {
	margin-top: 10px;
	display: inline-flex;
	align-items: center;
	justify-content: space-evenly;
	border: 3px solid @blue;
	padding: 7px 15px;
	border-radius: 50px;
	width: 80%;
	margin-left: 10%;

	.picto {
		background: url('assets/images/mdp.png') no-repeat;
		display: inline-block;
		width: 30px;
		height: 30px;
	}
	.text {
		font-weight: bold;
		font-size: 1.3em;
		color: @blue;
		width: 200px;
		text-align: center;
	}
}
.logoutBtn {
	margin-top: 10px;
	display: inline-flex;
	align-items: center;
	justify-content: space-evenly;
	border: 3px solid red;
	padding: 7px 15px;
	border-radius: 50px;
	width: 80%;
	margin-left: 10%;
	cursor: pointer;
	text-decoration: none;

	.picto {
		background: url('assets/images/deco-red.png') no-repeat center 2px;
		display: inline-block;
		width: 30px;
		height: 30px;
	}
	.text {
		font-weight: bold;
		font-size: 1.3em;
		color: red;
		font-weight: bold;
		font-size: 1.4em;
		line-height: 1.2em;
		width: 200px;
		text-align: center;
	}
}




.removeaccountBtn {
	margin-top: 10px;
	display: inline-block;
	font-size: 0.6em;
	margin-left: 50%;
	transform: translateX(-50%);
}

.removeaccountBtn .text {
	color: red;
	text-decoration: underline;
	text-align: center;
	font-weight: bold;
	font-size: 1.4em;
	line-height: 1.2em;
}

.logoutBtn {
	margin-top: 20px;

	margin-left: 50%;
	transform: translateX(-50%);
}


.redseparator{
	border-bottom: 4px solid red;padding-bottom: 20px;
	width: 80%;
    margin-left: 10%;
}
.passacheter{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border-bottom: 4px solid red;padding-bottom: 20px;
	width: 80%;
    margin-left: 10%;
	.pass{
		margin-top: 20px;
		border : 3px solid @blue;
		border-radius: 20px;
		padding:10px 10px;
		display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
		.left{
			display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	margin-right: 10px;
			.pictoPass{
				color:@blue;
				font-size: 1.8em;
				font-weight: bold;
				margin-bottom: 10px;
			}
		}
		.right{
			padding:5px;
			background:rgba(0,0,0,0.05);
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			.line{
				label{
					margin-bottom: 0;
				}
				span{font-weight: bold;}
			}
		}
		
	}
}


</style>