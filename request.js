const {request} = require('http')

const myRequest = (url='', data='', method='post') => {
	// http://localhost:8080/blog-deployment/
	const {protocol,host,hostname,port,pathname,search} = new URL(url)
	let options={
		protocol,
		host,
		hostname,
		port,
		path:pathname+search,
		method,
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	}
	// 构建请求实例
	return new Promise((resolve, reject) => {
		let req = request(options,res=>{
			res.setEncoding('utf8')
			res.on('data',data=>{
				// console.log(data)
				resolve(data)
			})
			res.on('end',()=>{})
		})
		req.on('erro',erro=>{
			reject(erro)
		})
		req.write(data?JSON.stringify(data):'')
		req.end()
	})
}
myRequest('http://localhost:9000/','','get')

module.exports = myRequest