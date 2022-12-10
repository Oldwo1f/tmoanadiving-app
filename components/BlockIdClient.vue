<template>
	<div >
		<div class="textnoblock">
			<strong>OU</strong>
			<div class="text">Communiquer leur votre identifiant client</div>
		</div>
		<div class="blockidentifiant">
			<div class="text">{{props.idclient}}</div>
		</div>
	</div>
</template>
<script setup>

	  

const props = defineProps({

	idclient: { type:String,},
  
})
</script>

<style lang="less">
@import '~static/less/variable.less';
.textnoblock {
	margin-top: 20px;
	line-height: 40px;
	margin-bottom: 20px;
	color: white;
	font-size: 1.2em;
	text-align: center;
	font-weight: bold;
}

.blockidentifiant {
	width: 90%;
	margin-left:5%;
	margin-bottom: 20px;
	border-radius: 20px;
	color: white;
	font-size: 3em;
	font-weight: bold;
	text-align: center;
	border: 5px solid red;
	padding: 10px 20px;
	background: @blue;
	background: linear-gradient(230deg, @blue 0%, @lightblue 100%);
}



</style>