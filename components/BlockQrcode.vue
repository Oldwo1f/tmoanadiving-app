<template>
	<div class="blockQR">
			<div class="text">Présenter ce qr code <br>dans votre centre de plongée</div>
			<div class="QRCODE">
				<img :src="qrcodeurl" alt="">
			</div>
	</div>
</template>
<script setup>

	  

const props = defineProps({

	qrcodeurl: { type:String,},
  
})
</script>

<style lang="less">
@import '~static/less/variable.less';

.blockQR {
	background: @blue;
	background: linear-gradient(184deg, @blue 0%, @lightblue 100%);
	width: 90%;
	margin-left: 5%;
	border-radius: 20px;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	margin-top: 30px;
	position: relative;


	.text {
		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.2em;
		text-align: center;
		line-height: 1.2em;
		margin-bottom: 10px;

	}

	.QRCODE {
		width: 95%;
		border-radius: 20px;
		background: white;
		aspect-ratio: 1/1;

		img{width:100%;}
	}
}




</style>