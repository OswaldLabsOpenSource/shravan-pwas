<template>
	<main>
		<Camera class="cam" :facingMode="camera" :height="height" :width="width" />
		<footer>
			<button @click.prevent="changeCamera">
				<font-awesome-icon icon="sync-alt" />
				Camera
			</button>
		</footer>
	</main>
</template>

<script>
import Camera from "vue-html5-camera";
export default {
	data() {
		return {
			width: window.innerWidth,
			height: 0.9 * window.innerHeight,
			camera: "environment"
		}
	},
	mounted() {
		this.resize();
	},
	methods: {
		resize() {
		},
		changeCamera() {
			this.camera = this.camera === "environment" ? "user" : "environment";
		}
	},
	components: {
		Camera
	}
}
</script>

<style lang="scss" scoped>
main {
	position: fixed;
	top: 10vh;
	left: 0; right: 0;
	bottom: 0;
	overflow: hidden;
	.cam {
		transform: scale(3);
	}
	footer {
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 0; right: 0;
		background-color: #270680;
		button {
			font: inherit;
			border: 0;
			background: none;
			padding: 3vh;
			text-align: center;
			border-radius: 0;
			width: 100%;
			display: block;
			color: #fff;
			font-size: 5vh;
			svg {
				margin-right: 3vw;
			}
		}
	}
}
</style>
