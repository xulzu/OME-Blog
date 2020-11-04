<template>
	<div
		v-if="header"
		class="xu-footer"
	>
		{{header}}
	</div>
</template>
<script>
export default {
	name: "xu-foot",
	computed: {
		header() {
			console.log(this.$site)
			return this.$site.title || '';
		},
	},
};
</script>
<style lang="stylus" scoped>
.xu-footer
	width: 100%
	padding 10px
	font-size 30px
	font-style italic
	text-align: center
</style>