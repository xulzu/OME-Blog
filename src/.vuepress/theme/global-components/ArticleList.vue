<template>

	<div class="ArticleList">
		<div>
			<div
				class="articleBox"
				:key="index"
				v-for="({title,frontmatter,path},index) of list"
			>
				<span style="width:25px">
					{{pageNum*pageSize+index+1}}.
				</span>

				<span class="a-link">
					<a
						class="art-item"
						:href="$withBase(path)"
					>{{title}}</a>
				</span>

				<i class="art-item">{{new Array(500).fill('.').join('')}}</i>
				<span class="art-item">{{frontmatter&&timeForMatter(frontmatter.time)}}</span>
			</div>

		</div>

		<!-- 分页 -->
		<div class="pagination">
			<el-pagination
				small
				layout="prev, pager, next"
				:total="allArticle.length"
				@current-change='currentChange'
				hide-on-single-page
				:page-size='pageSize'
			>
			</el-pagination>

		</div>

	</div>
</template>
<script>
import { timeForMatter } from "../utils/utils";
export default {
	name: "ArticleList",
	data() {
		return {
			pageNum: 0,
			list: [],
			pageSize: 50,
		};
	},
	props: {
		// 使用自定义的数据展示，还是所有md文件展示
		isUseSelfData: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		allArticle() {			
			return this.isUseSelfData.length
				? this.isUseSelfData
				: this.$site.pages.filter((page) => !page.frontmatter.type).sort((a,b)=>a.frontmatter.time-b.frontmatter.time);
		},
	},
	created() {},
	mounted() {
		if (
			window.navigator.userAgent.match(/Android/i) ||
			window.navigator.userAgent.match(/webOS/i) ||
			window.navigator.userAgent.match(/iPhone/i) ||
			window.navigator.userAgent.match(/iPad/i) ||
			window.navigator.userAgent.match(/iPod/i) ||
			window.navigator.userAgent.match(/BlackBerry/i) ||
			window.navigator.userAgent.match(/Windows Phone/i)
		) {
			this.pageSize = 30;
		}
		this.list = this.allArticle.slice(0, this.pageSize);
		console.log(this.list,3)
	},
	methods: {
		currentChange(val) {
			this.pageNum = val - 1;
			this.list = [
				...this.allArticle.slice(
					this.pageNum * this.pageSize,
					this.pageNum * this.pageSize + this.pageSize
				),
			];
		},
		timeForMatter,
	},
};
</script>
<style lang="stylus" scoped>
.ArticleList
	display: flex
	flex-direction: column
	// background-color red
	min-height: calc(100vh - 125px)
	justify-content: space-between
.articleBox
	display: flex
	margin-top: 3px
	justify-content: space-between
	i
		overflow: hidden
		flex: 1
		margin: 0 5px 0 5px
	.art-item
		text-decoration: none
		color: black
	span, i
		cursor: default
.a-link
	padding-bottom: 2px
	position: relative
.a-link:hover::after
	content: ' '
	width: 100%
	position: absolute
	left: 0
	bottom: -2px
	height: 5px
	background: linear-gradient(135deg, transparent 0% 25%, black 25% 35%, transparent 35% 100%), linear-gradient(45deg, transparent 0% 75%, black 75% 85%, transparent 85% 100%)
	background-size: 5px 5px
	background-repeat: repeat-x
/deep/ .el-pagination
	.number
		color: #797979
	.active
		color: black !important
.pagination
	display: flex
	margin-top: 20px
	justify-content: center
</style>