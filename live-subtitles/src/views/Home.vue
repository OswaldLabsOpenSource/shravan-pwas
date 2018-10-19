<template>
	<main>
		<Camera class="cam" :facingMode="camera" :height="height" :width="width" />
		<footer ref="footer">
			<vue-speech />
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
		setInterval(() => {
			try {
				this.$refs.footer.scrollTo(0, this.$refs.footer.scrollHeight);
			} catch (e) {}
		}, 1000);
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
	top: 0;
	left: 0; right: 0;
	bottom: 0;
	overflow: hidden;
	footer {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: fixed;
		mask-image: linear-gradient(transparent 50%, white);
		z-index: 1;
		overflow: auto;
		bottom: 0;
		left: 0; right: 0;
		text-shadow: 0 0 25px rgba(0, 0, 0, 0.75);
		padding: 5vw;
		top: 0;
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
