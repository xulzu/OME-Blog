const process = require('child_process')
const myRequest = require('./request.js')

/**
 * @desc 执行命令
 * @param {string} command ,要执行的命令 如 git log 
 * @return {}
 **/
const executeCommand = (command) => {
	return new Promise((resolve, reject) => {
		process.exec(command, {
			cwd: __dirname
		}, function (err, stdout, stderr) {
			if (err) {
				console.warn('命令执行失败')
				return reject(err)
			}
			stdout=stdout||'1 今日主要修改禅道bug,清理垃圾代码'
			return resolve({
				stdout,
				stderr
			})
		})
	})
}

const getCommandString = (author = '', startTime, endTime) => {
	let date = new Date()
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	if(!startTime||!endTime) return `git log --author=${author}  --oneline`
	startTime = startTime || [year, month, day].join('-')
	endTime = endTime || [year, month, day + 1].join('-')
	return `git log --author=${author} --since=${startTime}  --until=${endTime} --oneline`
}

/**
 * @desc 
 * @param {String} author 自己Git的用户名
 * @param {} startTime 和 endTime 是前闭后开。如2020-9-1,2020-9-2指的是查询九月一号的history。不传默认查询当日
 * @return {Promise} resolve一个数组，数组中保存每一条查询的commit history
 **/
const getCommitHistory = async (author = '', startTime, endTime) => {
	const command = getCommandString(author, startTime, endTime)
	let commitHistoy = await executeCommand(command)
	let ansList = commitHistoy.stdout
		.split('\n')
		.filter(item => item)
		.map(item => {
			let midList = item.split(' ')
			midList.shift()
			return midList.join(' ')
		})
		//排除掉git merge的commit记录
		.filter(item => !/^Merge/.test(item))
		.map((item, index) => {
			if (/^[0-9]+\.+/.test(item)) {
				return item
			} else {
				return (index + 1) + '.' + item
			}
		})
	// console.log(ansList)
	return ansList
}

//查询某一天的commit记录并将访问接口
async function doOnceQueryAndRequest(author,startTime,endTime){
	return new Promise( async(resolve,reject)=>{
		let commitHistory =await getCommitHistory(author, startTime, endTime)
		// console.log(commitHistory,startTime+'至'+endTime+'的commit记录')
		let req= myRequest('http://localhost:9000/', commitHistory.join('\n'), 'post')
		Promise.all([commitHistory,req]).then(res=>{
			resolve(res)
		}).catch(error=>{
			reject(error)
		})
	})
}
const getYearMonthDay=(time=new Date())=>{
	let date = new Date(time)
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	return [year, month, day].join('-')
}
async function saveOrUpdateJobLog() {
	//设置参数
	let author = 'guizai';//设置git用户名
	let startTime = '' //2020-11-23
	let endTime = '' //2020-11-24 开始时间和结束时间是前开后闭的 .如2020-9-1,2020-9-2指的是查询九月一号的history。
	//

	let sinceTime=new Date(startTime).getTime()
	let untilTime=new Date(endTime).getTime()
	// 没有设置时间，那么就执行一次查询方法查询当天的commit记录并推送到数据库
	let res
	if(!startTime||!endTime){
		res = await doOnceQueryAndRequest(author)
		console.log(res,'成功推送')
		return
	}else{
		let allAxios=[]
		for(sinceTime;sinceTime<untilTime;sinceTime+=24*60*60*1000){
			// 排除掉双休日
			if([5,6].includes(new Date(sinceTime).getUTCDay())) continue
			res=doOnceQueryAndRequest(author,getYearMonthDay(sinceTime),getYearMonthDay(sinceTime+24*60*60*1000))
			allAxios.push(res)
		}
		Promise.all(allAxios).then(res=>{
			console.log(res,'推送成功')
		})
	}
}
saveOrUpdateJobLog()