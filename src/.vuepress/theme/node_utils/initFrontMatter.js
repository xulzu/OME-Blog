/* 初始化.md文件中的 frontMatter */
const fs = require('fs'); // 文件模块
const matter = require('gray-matter'); 
const readAllMdFile=require('./readAllMdFile')  
const {getBirthtime}=require('./utils')
/**
* @desc 
* @param {String} sourceDir 项目根目录 一般指docs文件夹所在的目录
* @return {}
**/
function initFrontMatter(sourceDir){
	let fileList=readAllMdFile(sourceDir)
	fileList.forEach(file=>{
		const fileContent=fs.readFileSync(file.filePath,'utf8')
		const stat = fs.statSync(file.filePath);
		let {content,data={}}=matter(fileContent)//{content:'',data:{title:''}}
		// 如果没有日期则使用文件的创建
		data.time=data.time||getBirthtime(stat)
		let newFrontMatter=matter.stringify(content,data)
		fs.writeFileSync(file.filePath,newFrontMatter)
	})
}
module.exports=initFrontMatter