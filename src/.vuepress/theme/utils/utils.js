// 小于10补0
function zero(d) {
	return d.toString().padStart(2, '0')
}
//将时间格式化为2020年01月10日这种格式
function timeForMatter(time) {
	if (typeof time == 'string') {
		time = time.replace(/-/g, '/')
	}
	let date = new Date(time || '')
	if (date.getTime()) {
		return date.getFullYear() + '年' + zero((date.getMonth() + 1)) + '月' + zero(date.getDate()) + '日'
	}
	return ''
}
export {
	timeForMatter,
}