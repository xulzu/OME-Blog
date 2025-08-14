// 小于10补0
function zero(d) {
	return d.toString().padStart(2, '0')
}
/**
 * @desc 获取文件创建时间
 * @param {fs.stats} stat
 * @return {}
 **/
function getBirthtime(stat) {
	// 在一些系统下无法获取birthtime属性的正确时间，使用atime代替
	let date = new Date(stat.birthtime.getFullYear() != 1970 ? stat.birthtime : stat.atime)
	return `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(date.getDate())} ${zero(date.getHours())}:${zero(date.getMinutes())}:${zero(date.getSeconds())}`
}
module.exports = {
	getBirthtime,

}