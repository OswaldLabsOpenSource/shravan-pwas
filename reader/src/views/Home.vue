<template>
	<main>
		<header>
			<img alt="" src="https://static.oswaldlabs.com/shravan-icons/reader/generated/android-chrome-144x144.png">
			<div>Reader</div>
		</header>
		<!-- <div v-if="articleMode" class="article-mode">
			<button @click="listMode">&larr; Back</button>
			<div>
				<h1>{{articles[activeArticle].title}}</h1>
				<p>{{articles[activeArticle].content}}</p>
				<img alt="" :src="articles[activeArticle].urlToImage">
			</div>
		</div> -->
		<ul>
			<li v-for="(article, index) in articles" :key="index"><router-link :to="'/read/' + encode(article.url)">
				<div class="title">{{article.title}}</div>
				<div class="source">
					<timeago :datetime="article.publishedAt" :auto-update="60" /> from
					<span class="name">{{article.source.name}}</span>
				</div>
				<!-- {{article}} -->
			</router-link></li>
		</ul>
	</main>
</template>

<script>
export default {
	data() {
		return {
			articles: []
		}
	},
	methods: {
		encode(r) {
			return encodeURIComponent(r);
		}
	},
	mounted() {
		if (localStorage.news) {
			if (new Date().getTime() - JSON.parse(localStorage.news).when < 10 * 60 * 1000) {
				return this.articles = JSON.parse(localStorage.news).articles;
			}
		}
		fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=502386c09f314efe9dcbf1cc906eff41")
			.then(response => response.json())
			.then(json => {
				const articles = json.articles;
				localStorage.setItem("news", JSON.stringify({
					when: new Date().getTime(),
					articles
				}));
				this.articles = articles;
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
	.article-mode {
		padding: 5vw;
		button {
			background-color: rgb(250, 46, 90) !important;
			padding: 2vw 3vw;
			color: #fff !important;
			margin-bottom: 3vh;
			border-radius: 1vw;
		}
		h1 {
			margin-top: 0;
			font-weight: 300;
		}
		img {
			width: calc(100% + 10vw);
			margin: 0 -5vw;
		}
	}
}
</style>
