<template>
    <div class="contentInside" v-if="club" v-touch:swipe.right="swipeHandler" v-touch:swipe.left="swipeHandler">
		<div class="top" :class="'logo-'+Math.floor(Math.random() * (6 - 1 + 1) + 1)" v-if="club.logos" >

			<!-- {{club.images.length?club.images[0].filename : ''}} -->
			<div class="logo" >
				<img :src="$config.apiURL +'image/'+club.logos[0].filename" alt="">
			</div>
			
		</div>
		<div class="center">
			
			<h1>{{club.name}}</h1>
			<div class="island">{{club.city}} <span v-if="club.city && club.island"> , </span> {{club.island}}</div>

			<div class="coordonees">
				<div class="left">
					<label for="">Téléphone</label>
					<div class="info" v-if="club.phone"> {{club.phone}}</div>
					<div class="info" v-if="club.phoneM"> {{club.phoneM}}</div>
				</div>
				<div class="right">
					<label for="">Email</label>
					<div class="info"> {{club.email}}</div>
				</div>
			</div>
			<a v-if="club.website" :href="club.website" target="_BLANK" class="website"> <div class="picto"></div> <span>{{club.website}}</span></a>
			<div class="separator"></div>
			<div class="content" v-html="club.description">
			</div>
		</div>
		<Alert />
		<div class="map">
      <GmapMap
          ref="gMap"
          language="fr"
          :center="{ lat: club.lat, lng: club.lng }"
          :options="{ fullscreenControl: false, disableDefaultUI: true }"
          :zoom="8"
          class="map"
        >
         <GmapMarker
           
            :position="{
              lat: club.lat,
              lng: club.lng,
            }"
            :options="{
              icon: '../markersmall.png',
              title: club.name,
            }"
          >
            
          </GmapMarker>
           
         
        </GmapMap>
    </div>

  </div>
</template>

<script setup>

  const { $store} = useNuxtApp()
  const { state } = $store

  const route = useRoute()
  const router = useRouter()
console.log('$route.params.id=',route.params.id);
const club = ref({});

 $store.dispatch('partenaires/fetchPartenaire',{id:route.params.id})
watchEffect(() => { console.log('watchEffect'); club.value = { ...state.partenaires.currentPartenaire } })

const swipeHandler = () => {
	console.log('SWIPE');
	router.back()
}
 
</script>

<style scoped lang="less">

@import '~static/less/variable.less';
.contentInside{
      top: 0;
      bottom: 0;
      
        padding:40px 0px 10px 0px;
            // background: url('assets/images/bg1.png') no-repeat;
            // background-size: cover;
}

.top{
	width:100%;
  aspect-ratio: 3/2;
	background:none;
	background-position: center center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
	

	&.logo-1{
		background-image:url('assets/images/blur/1.jpg');
	}
	&.logo-2{
		background-image:url('assets/images/blur/2.jpg');
	}
	&.logo-3{
		background-image:url('assets/images/blur/3.jpg');
	}
	&.logo-4{
		background-image:url('assets/images/blur/4.jpg');
	}
	&.logo-5{
		background-image:url('assets/images/blur/5.jpg');
	}
	&.logo-6{
		background-image:url('assets/images/blur/6.jpg');
	}
}
.logo{
	width:250px;
	padding: 0px 20px;
	background: rgba(255,255,255,0.6);
	img{
		width:100%;
	}
	

}
div.center{
	text-align: center;
}
.edit{
	margin-top: 20px;
	color:white;
	background-color:@lightblue;
	display: inline-flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	padding : 5px 20px;
	border-radius: 50px;
	
	.text{
		font-size: 1.5em;
		font-weight: bold;
		margin-left: 20px;
		color:white;
	}
	
}
h1{
	margin-top: 20px;
	margin-bottom: 0;
	color:@blue;
	font-weight: bold;
	font-size: 2.8em;
}
.island{
	margin-top: 0px;
	margin-bottom: 0;
	color:@lightblue;
	font-weight: normal;
	font-size: 1.5em;
}
.coordonees{
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	width : 80%;
	margin-left: 10%;
	margin-top: 10px;

	.left{
		display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	}
	.right{
		display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	}

	label{
		font-weight: bold;
		font-size: 1.2em;
		color:@blue;
		margin-bottom: 0;
	}
	.info{
		color:grey;
	}
}
.website{
	
	margin-top: 20px;
	color:@blue;
	font-weight: bold;
	font-size: 1.6em;
	display: flex;
    align-items: center;
    justify-content: center;

	.picto{
		background:url('assets/images/pictoweb.png') no-repeat;
		background-size: contain;
		width: 20px;height: 20px;
		display: inline-block;
		margin-right: 10px;
	}
}
.separator{
	margin-top: 5px;
	height: 4px;
	width: 50%;
	margin-left: 25%;
	background: red;
}

.content{
	margin-left: 10%;
	width: 80%;
	text-align: left;
	margin-top: 20px;
	color:@blue;
}
.map{
  min-height : 400px;
}
</style>