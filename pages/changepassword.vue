<template>
  <div class="contentInside">
     
    <form action="" >
				
				

				<div class="spacer"></div>
				<label for="">Changement de mot de passe</label>
				<div class="line">
					<input type="text" v-model="formdata.password" placeholder="Mot de passe actuelle" >
				</div>
				<div class="line">
					<input type="text" v-model="formdata.newpassword" placeholder="Nouveau mot de passe" >
				</div>
				<div class="line">
					<input type="text" v-model="formdata.newpasswordcomfirm" placeholder="Comfirmation mot de passe" >
				</div>
			
				
			</form>

			
			<div class="btnValid" @click="savePassword">Enregistrer</div>
      <div class="spacer"></div>
      <Alert />
  </div>
</template>

<script setup>
  const { $store ,$auth, $axios} = useNuxtApp()
const { state } = $store;
const router = useRouter();

const formdata = ref({
  password:'',
newpassword:'',
newpasswordcomfirm:''
});

const savePassword = async () => {
  console.log('formdata.value',formdata.value);
    const edit = await $axios.patch('user/changepassword/' + $auth.user.id, formdata.value ).then(function (rep) {
			console.log('rep axios', rep);
			if (rep.status === 200) {

			
				// state.commit('setCurentUser', rep.data)

				$store.dispatch('global/alert', {
					text: 'Nouveau mot de passe enregistré',
					variant: 'success',
					countDown: 2
        }, { root: true })
        setTimeout(() => {
          router.push('/profil')
        },2000)
        
      } 
		}) .catch(function (error) {
    // en cas d’échec de la requête
      console.log(error);
      $store.dispatch('global/alert', {
					text: 'L\'opération n\'a pus aboutir. Vérifier votre saisie',
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
            text-shadow: 2px 2px 3px rgba(0,0,0,0.5);
            // margin-top: 20px;
          }
    .btnValid{
      background: red;
        padding: 10px 15px;
        width: 60%;
        border-radius: 50px;
        box-shadow:none;
        border:none;
        margin-top: 25px;
        outline:0;
        text-align: center;
        font-weight: bold;
        color:white;
        text-transform: uppercase;
        font-size: 1.8em;
    }
    .line{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      input{
        margin:0px 2px;
        width: 100%;
        padding: 6px 10px;
        border:2px solid @blue;
        border-radius: 10px;
        font-weight: bold;
        box-shadow: 3px 3px 10px rgba(0,0,0,0.15);
      }
      label{
        color:@blue;
        font-size: 1em;
        font-weight: bold;
        // margin-top: 20px;
        display: block;
        margin-bottom: 0;
      }
    }
    .spacer{
      height : 20px;
    }
    small{
      padding-left: 5px;
    }
}


</style>