<template>
	<div class="carouselcentre">
		<div class="text">Plus de 14 centre de plongées en Polynésie française</div>
		<div class="slider">
		<NoSsr>
			<carousel :autoplay="true" :loop="true">
				<slide class="logoclient" v-for="item in items" :key="item.id" >
					<img :src="$config.apiURL +'image/'+item.logos[0].filename" @click="linkcentre(item.id)" alt="">
				</slide>
			</carousel>

		</NoSsr>
		</div>
	</div>
</template>
<script setup>
 const router = useRouter()
	  

const props = defineProps({
	items:{type:Array}
})

const linkcentre = (id) => {
	console.log('LINK centre');
	router.push('/centres/'+id)
}



</script>

<style lang="less">
@import '~static/less/variable.less';
.VueCarousel{
	width:100%;
}.VueCarousel-wrapper{
	width:100%;
}
.VueCarousel-dot-container{
	margin-top: -20px !important;
	height: 10px;
}
.VueCarousel-dot{
	margin-top: 0px !important;
	height: 10px;
}
.carouselcentre {
	background: white;
	width: 100%;
	text-align: center;
	padding-top: 5px;
	padding-bottom: 5px;
	.text {
		font-size: 1.2em;
		color: @blue;

	}

	.slider {
		margin-top: 10px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		.logoclient {
			position: relative;
			
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			img{
				width: 100%;
				width: 120px;
			}
		}
	}

}
.lepass {

	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	background: white;
	border-radius: 30px;
	margin-top: 20px;
	padding: 15px 20px;
	background: @lightblue;
	text-transform: uppercase;
	width: 70%;
	margin-left: 15%;



	.text {
		font-size: 1.5em;
		font-weight: bold;
		text-align: center;
		line-height: 0.8em;
		color: white;
		margin-right: 15px;
	}

	.picto {
		width: 20px;
		height: 20px;
		background: url('assets/images/pictoweb.png') no-repeat;
		background-size: contain;
	}
}
</style>