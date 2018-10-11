<template>
	<main>
		<div class="article-mode" v-html="content"></div>
	</main>
</template>

<script>
export default {
	data() {
		return {
			content: null
		}
	},
	methods: {
		encode(r) {
			return encodeURIComponent(r);
		}
	},
	mounted() {
		const url = `https://platform.oswaldlabs.com/v1/reader/${encodeURIComponent(this.$route.params.url)}`;
		if (localStorage[url]) {
			if (new Date().getTime() - JSON.parse(localStorage[url]).when < 10 * 60 * 1000) {
				return this.content = JSON.parse(localStorage[url]).content;
			}
		}
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const content = json.content;
				localStorage.setItem(url, JSON.stringify({
					when: new Date().getTime(),
					content
				}));
				this.content = content;
			})
			.catch(error => alert("Error in fetching news..."));
	},
	components: {
	}
}
</script>

<style lang="scss" scoped>
main {
	a {
		display: block;
		font: inherit;
		text-align: left;
		color: inherit;
		background-color: inherit;
		text-decoration: none;
		margin: 0;
		padding: 5vw;
		border: 0;
		border-radius: 0;
	}
	header {
		img {
			height: 6vh;
			padding: 2vh;
			float: left;
		}
		div {
			line-height: 10vh;
			font-weight: 300;
			font-size: 3vh;
		}
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		li {
			line-height: 1.4;
			border-bottom: 1px solid rgba(255, 255, 255, 0.15);
			&:nth-of-type(2n) {
				background-color: #332295;
			}
			.title {
				margin-bottom: 3vw;
				font-weight: 300;
			}
			.source {
				font-size: 85%;
				color: rgba(255, 255, 255, 0.65);
				.name {
					color: #fff;
				}
			}
		}
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
