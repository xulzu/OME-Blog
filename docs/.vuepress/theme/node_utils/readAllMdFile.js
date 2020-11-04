const {
	all
} = require('core-js/fn/promise');
const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
/**
* @desc 读取项目根目录下的所有md文件目录。
* @param {String}dir 
* @return {Array} 
	{
		name:''
		filePath:''
	}
**/
function readAllMdFile(dir, filesList = []) {
	const files = fs.readdirSync(dir);
	files.forEach((item, index) => {
		let filePath = path.join(dir, item);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory() && item !== '.vuepress' && item !== '@pages') {
			readAllMdFile(filePath, filesList); //递归读取文件
		} else {
			const fileNameArr = path.basename(filePath).split('.')
			let name = null,
				type = null;
			if (fileNameArr.length === 2) { //abc.md  包含一个'.'的文件
				name = fileNameArr[0]
				type = fileNameArr[1]
			} else if (fileNameArr.length === 3) { //1.abc.md 包含了两个点的文件
				name = fileNameArr[1]
				type = fileNameArr[2]
			} else {
				console.log(filePath, '文件命名不符合规范')
			}
			if (type === 'md') { // 过滤非md文件
				filesList.push({
					name,
					filePath
				});
			}
		}
	});
	
	return filesList;
}



module.exports = readAllMdFile