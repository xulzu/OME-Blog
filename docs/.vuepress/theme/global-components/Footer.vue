<template>
	<div
		v-if="footer"
		class="xu-footer"
	>
		{{footer}}
	</div>
</template>
<script>
export default {
	name: "xu-foot",
	computed: {
		footer() {
			return this.$themeConfig.footer || '';
		},
	},
};
</script>
<style lang="stylus" scoped>
.xu-footer
	width: 100%
	height 30px
	// position absolute
	left 0
	bottom -30px
	line-height 30px
	text-align: center

</style>