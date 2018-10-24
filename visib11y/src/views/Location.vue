<template>
	<main>
		<p ref="speak">Your current location is <strong>{{locationName}}</strong></p>
	</main>
</template>

<script>
import speak from '@/speak';
export default {
	data: () => {
		return {
			locationName: "Loading..."
		}
	},
	mounted() {
		if (navigator.geolocation) {
			this.locationName = "Getting GPS signal...";
			navigator.geolocation.getCurrentPosition(position => {
				this.locationName = "Getting location name...";
			fetch(`https://platform.oswaldlabs.com/v1/geocode/${position.coords.latitude}/${position.coords.longitude}`).then(response => response.json()).then(json => {
				this.locationName = json.results[0].formatted_address;
				return this.$refs.speak.focus();
			}).then(() => speak(this.$refs.speak.innerText)).catch(e => {});
			});
		}
	}
}
</script>


<style lang="scss" scoped>
main {
	padding: 5vw;
	font-size: 5vh;
}
</style>
