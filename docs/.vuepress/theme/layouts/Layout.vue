<template>
	<div class="theme-container">

		<main class="md-content">
			<div style="width:100%">
				<Header></Header>
				<NavBar></NavBar>
				<!-- 首页文章展示页 -->
				<ArticleList v-if="curPage.path=='/'"></ArticleList>
				<Category v-if="curPage.path=='/category.html'"></Category>
				<Content>
					自定义主题
				</Content>
			</div>

			<Footer></Footer>
		</main>

	</div>
</template>
<script>
export default {
	name: "Home",
	components: {},
	mounted() {
		console.log(this.$site, this.$page, 222);
	},
	computed: {
		curPage() {
			return this.$page;
		},
	},
};
</script>
<style lang="stylus" >
.theme-container
	background-color: @themeColor
	display: flex
	justify-content: center
	min-height: 100vh
	.md-content
		width: 850px
		overflow: hidden
		display: flex
		flex-direction: column
		justify-content: space-between
		min-height: calc(100vh - 15px)
		margin-bottom: 10px
		position: relative
		border-bottom: 1px solid black
@media screen and (max-width: 400px)
	.theme-container
		.md-content
			width: 96vw
</style>