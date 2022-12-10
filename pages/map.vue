<template>
  <div class="contentInside">
    <div class="promptmessage" v-if="!geolocActive">
        Veuillez activer votre géolocalisation afin de profiter de toutes les
        fonctionnalités de l'application.
        <br />
        Selon les navigateurs, un rechargement de la page peut être nécessaire.
      </div>
    <div class="map" v-if="showMap">
      <div class="mapContent">
        
      <div class="MAP" v-if="geolocActive">
        <GmapMap
          ref="gMap"
          language="fr"
          :center="{ lat: Number(currentPos[0]), lng: Number(currentPos[1]) }"
          :options="{ fullscreenControl: false, disableDefaultUI: true }"
          :zoom="zoom"
          class="map"
        >
         <GmapMarker
            v-for="part in partenairesClose"
            :key="part.id"
            :position="{
              lat: part.location.coordinates[1],
              lng: part.location.coordinates[0],
            }"
            :options="{
              icon: 'markersmall.png',
              title: part.name,
            }"
            @click="linkPart(part.id)"
          >
            
          </GmapMarker>
           
          <GmapMarker
            :position="{
              lat: currentPos[0],
              lng: currentPos[1],
            }"
            :options="{
              icon: 'centermarkersmall.png',
            }"
          >
          </GmapMarker>
        </GmapMap>
        
      </div>
      <div class="MAP" v-else>
        <GmapMap
          ref="gMap"
          language="fr"
          :center="{ lat: Number(currentPos[0]), lng: Number(currentPos[1]) }"
          :options="{ fullscreenControl: false, disableDefaultUI: true }"
          :zoom="zoom"
          class="map"
        >
         <GmapMarker
            v-for="part in partenaires"
            :key="part.id"
            :position="{
              lat: part.location.coordinates[1],
              lng: part.location.coordinates[0],
            }"
            :options="{
              icon: 'markersmall.png',
              title: part.name,
            }"
            @click="linkPart(part.id)"
          >
            
          </GmapMarker>
           
          
        </GmapMap>
        
      </div>

      </div>
    </div>

		<!-- <div class="filter">
			<div class="aroundMeBtn">
				<div class="text">Autour de moi</div>	
			</div>
			<div class="input">
				<select name="" id="">
					<option value="">Par Ile</option>
					<option value="Bora Bora">Bora Bora</option>
					<option value="Tahiti">Tahiti</option>
					<option value="Fakarava">Fakarava</option>
					<option value="Morea">Morea</option>
				</select>
			</div>
		</div> -->
    <!-- <img class="test" src="assets/images/centermarkersmall.png" alt=""> -->

		<div class="closestClub" v-if="geolocActive">
      <SmallClub  :logo="part.logos[0].filename" :imageUrl="part.images[0] ? part.images[0].filename :'bgblurblue.jpg'" :distance="Math.round(part.dist.calculated/1000)" :title="part.name" :city="part.city"  :address="part.island" v-for="part in partenairesClose" :key="part.id" :id="part.id"/>
		</div>
		<div class="closestClub" v-else>
      <SmallClub  :logo="part.logos[0].filename" :imageUrl="part.images[0] ? part.images[0].filename :'bgblurblue.jpg'"  :title="part.name" :city="part.city"  :address="part.island" v-for="part in partenaires" :key="part.id" :id="part.id"/>
		</div>

    <CarouselClub :items="state.partenaires.partenaires" />
		
  </div>
</template>

<script setup>

import { gmapApi } from "vue2-google-maps";
  const { $store, $geolocation, $auth } = useNuxtApp()
const { state } = $store
const router = useRouter();



 const currentPos= ref([-18.535368082013193, -149.56712075059588])
 const showMap= ref(true)
 const geolocActive= ref(true)
 const zoom= ref(10)
 const partenairesClose= ref([])
 const partenaires= ref([])
$store.dispatch('partenaires/fetchPartenaires')

// if ($geolocation.supported) {
//   const permission = await navigator.permissions
//     .query({ name: "geolocation" })
//     .then(function (result) {
//       if (result.state === "granted") {
//         console.log("granted");

//         self.geolocActive = true;
//         return "toto";
//       } else if (result.state === "prompt") {
//         console.log("prompt");

//         self.geolocActive = true;
//         return "toto2";
//       } else {
//         console.log("not granted");
//         self.errorPrompt2 = true;
//         console.log(self.errorPrompt2);
//         self.geolocActive = false;
//         return "toto3";
//       }
//       // Don't do anything if the permission was denied.
//     });
// }

// watchEffect(async () => {
//   // console.log('watchEffect CurrentPost',    currentPos.value = state.users.currentPos);
//   currentPos.value = state.users.currentPos;
  

// })

          
watchEffect(async () => {
  console.log('watchEffect Closest');
  partenairesClose.value = state.partenaires.partenairesClose;
 

})          

const linkPart = (id) => {

  console.log(id, 'ttttttttttttttttttttttttttttttttt');
  router.push('/clubs/'+id)
}


   const geolocFunc = async function (){
        
      
      const geoloc = await navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("COOL");
          console.log("position");
          console.log(position);
          //     const position = await self.$geolocation.getCurrentPosition();
          // console.log("position", position);
          // currentPos.value[0] = parseFloat(position.coords.latitude);
          // currentPos.value[1] = parseFloat(position.coords.longitude);
          showMap.value = true;
          geolocActive.value = true;
          console.log('coords',position.coords);

          currentPos.value = [position.coords.latitude, position.coords.longitude]
          // await $store.dispatch('users/setPosition',{lat:position.coords.latitude,lng:position.coords.longitude}).then(async function(t){
          //   console.log('reponse', t);
          //   return t;
          // })

          await $store.dispatch('partenaires/FetchClubByPosition',{lat:position.coords.latitude,lng:position.coords.longitude}).then(async function(t){
            console.log('reponse', t);
            return t;
          })
          
        },
        async (error) => {
          showMap.value = false;
          console.log("errorposistion:");
          console.log(error);
          console.log($auth.user.id);
          geolocActive.value = false;
          
          currentPos.value = [-16.53356967464921, -147.93186234715637]
          
          zoom.value = 6
          // setTimeout(function () {
          showMap.value = true;
          watchEffect(async () => {
            console.log('watchEffect Closest Part');
            partenaires.value =  state.partenaires.partenaires;
            

          })
          // },1000)
         
        }
      );

      // console.log("permission", permission);
      // console.log("self.geolocActive", self.geolocActive);
      // console.log(geoloc);
   }
geolocFunc();
    
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
img.test{
      width: 100px;
      height: 100px;
      
        padding:40px 0px 50px 0px;
            background: url('assets/images/centermarkersmall.png') no-repeat;
            // background-size: cover;
}
div.map {
	width: 100%;
	// height: 500px;
	position: relative
}
div.map:after {
  content: "";
  display: block;
	padding-bottom:100%;
}
.mapContent{
  position: absolute;
  left: 0;right: 0;top: 0;bottom: 0;
	// background: yellow;

}

div.filter {
	background: @blue;
	width: 80%;
  margin-left: 10%;
	height: 40px;
	padding: 5px 5px;
	margin-top: 20px;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

  .aroundMeBtn {
    background: @lightblue;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding : 5px 10px 5px 5px;

    .picto {
      background: yellow;
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
    .text {
      font-family: Montserrat;
      color: white;
      font-weight: 600;
    }
  }

  .input {
    background: @blue;
    // width: 250px;
    height: 30px;
    border-radius: 10px;
    position: relative;
    border: none;

    select {
      padding-right: 20px;
      width: 100%;
      height: 100%;
      background: @blue;
      border: none;
      color: white;
      outline: 0;
      font-size: 1.4em;
      line-height: 1.4em;

    }
  }
}


.closestClub {
	margin-top: 20px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	margin-bottom: 20px;
  flex-wrap: wrap;
}




</style>