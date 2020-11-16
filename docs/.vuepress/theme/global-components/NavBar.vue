<template>
	<div class="Nav-bar">
		<nav>
			<template v-for=" ({text,link,desc},index) of navList">
				<a
					:class="{active:link==curPagePath||(link=='/'&&curPagePath=='/index'),nav:true}"
					:key="index||''"
					:href='$withBase(link)'
					v-html="text||''"
					:title="desc||''"
				></a>
			</template>
		</nav>
	</div>
</template>
<script>
export default {
	name: "Nav-BAr",
	data() {
		return {}
			
	},
	created() {
	},
	computed: {
		navList(){
			return this.$themeConfig.nav
		},
		curPagePath(){
			let arr=this.$page.relativePath.split('.')
			arr.pop()
			arr.unshift('/')
			return arr.join('')
		}
	},
	methods:{
		
	}
};
</script>
<style lang="stylus" scoped>
.Nav-bar
	padding-bottom: 2px
	border-bottom: 1px solid black
	padding-left: 5px
	.nav
		color: #343434
		font-size: 22px
		margin-right: 13px
	.active
		color: black
		font-weight: bolder
</style>