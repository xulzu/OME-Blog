const ininFrontMatter = require('./node_utils/initFrontMatter')
module.exports = (themeConfig, ctx) => {
    const {sourceDir} = ctx
    // 初始化所有md文件中的frontMatter
    ininFrontMatter(sourceDir) 
    return {
        extend: '@vuepress/theme-default'

    }
}
