<template>
	<main>
		<Camera class="cam" ref="camera" :facingMode="camera" :height="height" :width="width" />
		<div class="caption" v-if="caption">{{ caption }}</div>
		<footer>
			<button v-if="loading">
				<font-awesome-icon icon="sync-alt" spin />
				Loading...
			</button>
			<button v-else @click.prevent="findObjects">
				<font-awesome-icon icon="camera" />
				Click
			</button>
		</footer>
	</main>
</template>

<script>
import speak from "@/speak";
import Camera from "vue-html5-camera";
export default {
	data() {
		return {
			loading: false,
			width: window.innerWidth,
			height: 0.9 * window.innerHeight,
			camera: "environment",
			caption: ""
		}
	},
	methods: {
		findObjects() {
			this.caption = "";
			this.loading = true;
			const image = this.$refs.camera.click();
			fetch("https://platform.oswaldlabs.com/v1/objects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"dataUri": image
				})
			})
				.then(response => response.json())
				.then(json => {
					const labels = json.labels;
					if (labels.length && labels.length >= 4) {
						let string = "Image may contain ";
						for (let i = 0; i < 4; i++) {
							string += labels[i].Name + ", ";
						}
						string += "etc.";
						speak(string);
						this.caption = string;
						setTimeout(() => {
							this.caption = "";
						}, 7500);
					}
				})
				.catch(error => alert(error))
				.then(() => this.loading = false);
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
	.caption {
		position: fixed;
		background-color: #332295;
		padding: 5vw;
		font-size: 4vh;
		left: 5vw;
		right: 5vw;
		top: 12.5vh;
		z-index: 3;
	}
}
</style>
