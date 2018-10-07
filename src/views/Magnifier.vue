<template>
	<main>
		<div>Magnifier</div>
		<video autoplay="true" ref="video" />
		<select v-model="camera">
			<option v-for="(device, index) in devices" :key="index">{{device}}</option>
		</select>
	</main>
</template>

<script>
export default {
	data: () => {
		return {
			devices: [],
			camera: ""
		}
	},
	watch: {
		camera() {
			this.setStream();
		}
	},
	mounted() {
		if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
			navigator.mediaDevices.enumerateDevices()
				.then(devices => {
					const list = [];
					devices.forEach(device => device.kind === "videoinput" && list.push(device.deviceId));
					this.devices = list;
					this.camera = list.length > 0 ? list[0] : "";
				})
				.catch(e => console.log(e));
		}
	},
	methods: {
		setStream() {
			if (navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia({ video: true })
					.then(stream => {
						const track = stream.getVideoTracks()[0];
						track.applyConstraints({
							video: {deviceId: this.camera ? {exact: this.camera} : undefined}
						}).then(() => {
							this.$refs.video.srcObject = stream;
						}).catch(e => {
							console.log(e);
						});
					})
					.catch(e => console.log(e));
			}
		}
	}
}
</script>

<style lang="scss" scoped>
video {
	width: 100%;
	position: fixed;
	left: 0; right: 0;
	z-index: 1;
	top: 10vh; bottom: 0;
	opacity: 0.5;
}
main {
	height: 90vh;
}
select {
	background-color: #fff;
	z-index: 2;
	position: fixed;
	left: 0; right: 0;
	bottom: 0;
	width: 100%;
	padding: 1rem;
	border-radius: 0;
	font: inherit;
}
</style>

