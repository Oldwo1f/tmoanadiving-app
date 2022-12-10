<template>
  <div class="contentInside">
    
		
		<div class="blocksHome">
			<BlockHome1 :date="$dayjs( $calculateDateExpi($auth.user,$dayjs)).format('DD MMMM YYYY')" :credit="$calculateCredit($auth.user,$dayjs)"/>
			<nuxt-link to="/qrcode">
				<BlockHome2 qrcode=""/>
			</nuxt-link>
			<div class="blocksline">
				<nuxt-link class="blockhome3" to="/map">
					<div class="picto"></div>
					<div class="text">Trouver un centre</div>
					
				</nuxt-link>
				<nuxt-link class="blockhome4" to="/profil">
					<div class="picto"></div>
					<div class="text">Mon compte</div>
					
				</nuxt-link>
			</div>	
		

		</div>

		<CarouselClub :items="state.partenaires.partenaires"/>

		<!-- <div class="carouselClub">
				<div class="text">Plus de 14 club de plongées en Polynésie française</div>
				<div class="slider">
					<div class="logoclient"></div>
					<div class="logoclient"></div>
					<div class="logoclient"></div>
				</div>
		</div> -->
		<a href="https://www.temoanadiving.com/" target="_BLANK" class="lepass">
			<div class="text">Le Temoana Pass</div>
			<div class="picto"></div>
		</a>
  </div>
</template>

<script setup>

  const { $store } = useNuxtApp()
  const { state } = $store


$store.dispatch('partenaires/fetchPartenaires')

//   const items= computed({
// 		set: (val) => {},
// 		get:() =>  state.jeux.jeux,
// 	})

 
</script>

<style scoped lang="less">
@import '~static/less/variable.less';
.contentInside{
      top: 0;
      bottom: 0;
      
        padding:40px 0px 70px 0px;
            background: url('assets/images/bg1.png') no-repeat;
            background-size: cover;
}
.blocksHome {
	
	margin-top: 40px;
	margin-bottom: 40px;
}


.blocksline {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	width:80%;
	margin-left: 10%;
}


.blockhome3 {
	width: 48%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
	background: white;
	border-radius: 20px;
	margin-top: 20px;
	padding: 20px 10px;

}

.blockhome3 .text {
	font-size: 1.2em;
	font-weight: bold;
	text-align: center;
	line-height: 22px;
	color: #004D61;
}

.blockhome3 .picto {
	width: 40px;
	height: 40px;
	background: url('assets/images/plonge bleu.png') no-repeat;
	background-size: contain;
	margin-bottom: 10px;
}

.blockhome4 {
	width: 48%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
	background: white;
	border-radius: 20px;
	margin-top: 20px;
	padding: 20px 10px;

}

.blockhome4 .text {
	font-size: 1.2em;
	font-weight: bold;
	text-align: center;
	line-height: 22px;
	color: #004D61;
}

.blockhome4 .picto {
	width: 40px;
	height: 40px;
	background: url('assets/images/user.png') no-repeat;
	background-size: contain;
	margin-bottom: 10px;
}


</style>