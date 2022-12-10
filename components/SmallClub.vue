<template>
	<div class="club" @click="linkClub(props.id)" :class="'logo-'+Math.floor(Math.random() * (6 - 1 + 1) + 1)">
		<div class="logo"><img :src="$config.apiURL + 'image/' + props.logo" alt=""></div>
		<div class="distance" v-if="props.distance > 0">{{ props.distance }} km</div>
		<div class="infos">
			<div class="title">{{ props.title }}</div>
			<div class="subtitle"> {{ props.city }}
				<br> {{ props.address }}
			</div>
		</div>
	</div>
</template>
<script setup>

const router = useRouter()
const linkClub = (id) => {
	console.log('LINK club');
	router.push('/clubs/' + id)
}


const props = defineProps({

	distance: { type: Number, default: 0 },
	title: { type: String, default: 'ClubName' },
	city: { type: String, default: 'Clubcity' },
	address: { type: String, default: 'ClubAddress' },
	imageUrl: { type: String },
	logo: { type: String },
	id: { type: String },

})
</script>

<style lang="less">
@import '~static/less/variable.less';

.club {
	border-radius: 20px;
	// background: orangered;
	// height: 350px;
	aspect-ratio: 2/3;
	width: 40%;
	position: relative;
	background-size: cover;
	margin-bottom: 20px;
	// background-image:url('assets/images/bgblurblue.jpg');

	cursor: pointer;


	display: flex;
	align-items: center;
	justify-content: center;

	&.logo-1 {
		background-image: url('assets/images/blur/1.jpg');
	}

	&.logo-2 {
		background-image: url('assets/images/blur/2.jpg');
	}

	&.logo-3 {
		background-image: url('assets/images/blur/3.jpg');
	}

	&.logo-4 {
		background-image: url('assets/images/blur/4.jpg');
	}

	&.logo-5 {
		background-image: url('assets/images/blur/5.jpg');
	}

	&.logo-6 {
		background-image: url('assets/images/blur/6.jpg');
	}


	.logo {
		margin-bottom: 90px;
		padding: 0px 10px;
		background: rgba(255, 255, 255, 0.2);

		img {
			width: 100%;
			opacity: 1;
		}
	}


	.distance {
		border-radius: 20px;
		padding: 7px 10px;
		background: @lightblue;
		font-weight: bold;
		color: white;
		position: absolute;
		bottom: 10px;
		z-index: 990;
		right: 10px;
	}

	.infos {
		border-radius: 20px;
		padding: 15px 0px;
		background: white;
		font-weight: bold;
		position: absolute;
		bottom: -1px;
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
		width: 100%;

		.title {
			padding-left: 15px;
			font-weight: bold;
			margin-bottom: 10px;
			;
		}

		.subtitle {
			padding-left: 15px;
			font-weight: normal;
		}
	}
}
</style>