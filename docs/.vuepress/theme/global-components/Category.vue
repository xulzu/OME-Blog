<template>
	<div class="categoryBox">
		<template v-if="!isShowAll">
			<div
				:key="i"
				class="articleBox"
				 v-for="({title,desc,pages,allPages},i) in showBoxs"
			>
				<div
					class="articleBox-title"
					v-html="title"
				>
				</div>
				<div
					v-for="({title,path},index) in pages"
					:key="index"
				><i v-if="path">-</i>
					<a :href="path" class="a-link">
						&nbsp;&nbsp;{{title}}
					</a>
				</div>
				<a
					class="a-link"
					title="更多"
					@click="showAllContent(title,allPages)"
					v-if="pages.length >maxlength"
				>--  more  --</a>
			</div>
			<div
				class="articleBox"
				v-if="showBoxs.length&1"
			></div>
		</template>
		<div v-else style="width:100%">
			<div class="detailTopOperate">
				<span class="detailTitle">
				{{title}}
				</span>
 				<el-button @click="isShowAll=false" class="toback" title="返回" size="small" type="text" icon="el-icon-d-arrow-left" circle></el-button>
				</el-button>
			</div>
			<ArticleList :isUseSelfData='detailData'></ArticleList>


		</div>

	</div>
</template>
<script>
export default {
	data() {
		return {
			maxlength: 12,
			showBoxs:[],
			isShowAll:false,
			detailData:[],
			title:''
			
		};
	},
	computed: {
		categoryList() {
			return this.$themeConfig.category;
		},
		allPages() {
			return this.$site.pages;
		},
	},
	created() {
		this.categoryList.forEach((item) => {
			let pages = [];
			for (let page of this.allPages) {
				if(page.frontmatter.type) continue
				if (
					item.key.includes(page.frontmatter.key) ||
					(!page.frontmatter.key && item.title == "Other")
				) {
					pages.push(page);
				}
			}
			item.allPages=pages	
			item.pages = pages.slice(0, this.maxlength);
			if (pages.length > this.maxlength) {
				item.pages.push({
					title: "··· ···",
				});
			}
			if(pages.length){
				this.showBoxs.push(item)
			}
		});
	},
	methods: {
		showAllContent(title,allItems){
			this.title=title
			this.detailData=allItems
			this.isShowAll=true
		}
	},
};
</script>
<style lang="stylus" scoped>
.categoryBox
	width: 100%
	margin-top: 10px
	display: flex
	flex-wrap: wrap
	justify-content: center
	align-items: flex-start
	a
		color: black
.detailTopOperate
	display flex
	justify-content space-between
	align-items center
	/deep/ .toback
		color black  !important 

.detailTitle
	font-size 22px
	font-weight bolder
.articleBox
	width: 45%
	height: 300px
	margin-left: 15px
	margin-right: 15px
.articleBox-title
	display: flex
	border-bottom: 1px dashed black
	padding-bottom: 5px
	margin-bottom: 10px
	font-size: 20px
.a-link
	padding-bottom: 2px
	position: relative
	cursor pointer
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
@media screen and (max-width: 400px)
	.categoryBox
		flex-direction: column
		justify-content: flex-start
		align-items: center
	.articleBox
		width: 100%
</style>