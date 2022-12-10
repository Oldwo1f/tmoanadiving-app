<template>
  <div class="contentInside">
    <div class="popUpOverlay">
      <div class="popup">
        <div class="picto"></div>
        <h3>Cette action est irréversible.</h3>
        <div class="text">
          Supprimer votre comptre entrainera la perte <br>de vos crédits de plongée restants.
        </div>
        <div class="textConfirm">
          Etes vous sûre ?
        </div>
        <div class="btns">
          <div class="btnY" @click="valid"><div class="picto"></div></div>
          <nuxt-link class="btnN" to="/profil"><div class="picto"></div></nuxt-link>
        </div>
        <Alert />
      </div>
    </div>
      
  </div>
</template>

<script setup>
import { f } from 'ohmyfetch/dist/error-d4c70d05';

  const { $store ,$auth, $axios} = useNuxtApp()
  const { state } = $store


const valid = async () => {
 
    const edit = await $axios.delete('user/removeme/' + $auth.user.id ).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {
				$store.dispatch('global/alert', {
					text: 'Votre compte a été supprimé. Vous allez être déconnecté',
					variant: 'success',
					countDown: 2
        }, { root: true })
        setTimeout(() => {
          $auth.logout()
        },3000)
      }
		}) .catch(function (error) {
      console.log(error);
      $store.dispatch('global/alert', {
					text: 'L\'opération n\'a pus aboutir.',
					variant: 'danger',
					countDown: 2
				}, { root: true })
    })
}

		
 
</script>

<style scoped lang="less">

@import '~static/less/variable.less';
.contentInside{
      top: 0;
      bottom: 0;
      
      padding:40px 0px 50px 0px;
      background: url('assets/images/bgblur.png') no-repeat;
      background-size: cover;
      min-height:100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

            form{
              width: 80%;
              // margin-left: 10%;
              // background: red;
            }

            label{
            color:white;
            font-size: 1.7em;
            font-weight: bold;
            text-align: center;
            // margin-top: 20px;
          }
}


.popUpOverlay {
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0px;
	bottom: 0px;
	width: 100%;
	z-index: 1010;
	display: flex;
	align-items: center;
	justify-content: center;
}

.popUpOverlay .popup {
	border-radius: 20px;
	width: 80%;
	min-height: 200px;
	background: rgb(0, 88, 111);
	background: linear-gradient(270deg, rgba(0, 88, 111, 1) 0%, rgba(0, 111, 139, 1) 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: white;
	padding: 30px;

}

.popUpOverlay .popup .picto {
	width: 150px;
	height: 150px;
	background: url('assets/images/danger.png') no-repeat center center;
	margin-top: 50px;
	margin-bottom: 50px;

}

.popUpOverlay .popup h3 {

	font-weight: bold;
	font-size:1.7em;
	margin-bottom: 20px;
  white-space: nowrap;
}

.popUpOverlay .popup .text {
	font-weight: normal;
	font-size: 1.3em;
	line-height: 1.3em;
	text-align: center;
	margin-bottom: 20px;
}

.popUpOverlay .popup .textConfirm {
	font-weight: bold;
	font-size: 20px;
	line-height: 28px;
	text-align: center;
	margin-bottom: 20px;
}

.popUpOverlay .popup .textConfirm {
	font-weight: bold;
	font-size: 20px;
	line-height: 28px;
	text-align: center;
	margin-bottom: 20px;
}

.popUpOverlay .popup .btns {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
  margin-bottom: 10px;
}

.popUpOverlay .popup .btns .btnY {
	width: 70px;
	height: 70px;
	border-radius: 70px;
	background: white;
	margin-right: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.popUpOverlay .popup .btns .btnY .picto {
	width: 30px;
	height: 30px;
	background: url('assets/images/checkmark.png') no-repeat  0px 5px;
	background-size: contain;
}

.popUpOverlay .popup .btns .btnN {
	width: 70px;
	height: 70px;
	border-radius: 70px;
	background: white;
	margin-left: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.popUpOverlay .popup .btns .btnN .picto {
	width: 30px;
	height: 30px;
	background: url('assets/images/crossmark.png') no-repeat;
	background-size: contain;
}


</style>