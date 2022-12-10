<template>
	<div class="plongeur">
		<div class="header">
			<div class="picto" :class="{ 'second' :props.type=='second'}"></div>
			<div class="text" v-if="props.type=='first'">Plongeur principal</div>
			<div class="text" v-if="props.type=='second'">Plongeur secondaire</div>
			<!-- <div class="button">Modifier</div> -->
		</div>
		<div class="contenu" v-if="props.type=='first'">
			<div class="line"><label for="">Nom</label> <span>{{user.lastName}}</span></div>	
			<div class="line"><label for="">Prénom</label> <span>{{user.firstName}}</span></div>	
			<div class="line"><label for="">Date de naissance</label> <span>{{user.birthDate}}</span></div>	
			<div class="line"><label for="">Téléphone</label> <span>{{user.phone}}</span></div>	
			<div class="line"><label for="">Mail</label> <span>{{user.emailAddress}}</span></div>	
			<div class="line"><label for="">Pays</label> <span> {{user.country}}</span></div>	
			<div class="line"><label for="">Niveau</label> <span> {{user.level}} </span></div>	
		</div>
		<div class="contenu" v-if="props.type=='second'">
			<div class="line"><label for="">Nom</label> <span>{{user.lastName2}}</span></div>	
			<div class="line"><label for="">Prénom</label> <span>{{user.firstName2}}</span></div>	
			<div class="line"><label for="">Date de naissance</label> <span>{{user.birthDate2}}</span></div>	
			<div class="line"><label for="">Téléphone</label> <span>{{user.phone2}}</span></div>	
			<div class="line"><label for="">Mail</label> <span>{{user.emailAddress2}}</span></div>
			<div class="line"><label for="">Pays</label> <span> {{user.country2}}</span></div>	
			<div class="line"><label for="">Niveau</label> <span> {{user.level2}} </span></div>
		</div>
	</div>
</template>
<script setup>

	  

const props = defineProps({

	type: { type:String,default:'first'},
	user: { type:Object},
  
})
</script>

<style lang="less">
@import '~static/less/variable.less';

.plongeur {
	width: 80%;
	margin-left: 10%;
	text-align: center;
	margin-top: 20px;
	color: @blue;
	position: relative;


	.header {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 10px;
	}

	.header .picto {
		width: 40px;
		height: 40px;
		background: url('assets/images/plongeur principal.png') no-repeat;
		background-size: contain;
		margin-right: 20px;

		&.second{
			background: url('assets/images/plongeur secondaire.png') no-repeat;
			background-size: contain;
		}
	}

	.header .text {
		font-size: 1.5em;
		font-weight: bold;
	}

	.header .button {
		font-size: 1em;
		font-weight: normal;
		position: absolute;
		right: 0px;
	}


	.contenu {
		text-align: left;
	}

	.line {
		margin-bottom: 0px;
		line-height: 0.9em;
	}

	.contenu label {
		margin-left: 60px;
		font-size: 1.2em;
		font-weight: normal;
	}

	.contenu label:after {
		content: " :";
		font-size: 1.1em;
		font-weight: normal;
	}
	.contenu span {
		font-size: 1.1em;
		font-weight: normal;
		margin-left: 15px;
	}
}
</style>