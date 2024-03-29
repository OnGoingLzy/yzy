import CryptoJS from 'crypto-js';

const appid = 'yzy';
const appsecret = '2418ea23a370ed8547a8fa0cbfd9da8a';

// 基础URLs
const baseURLs = { 
	yzy_app: 'https://localhost:44363',
   //yzy_app:'https://lyhapi.dyb.yn.cn'
	//yzy_app: 'https://yzy.dyb.yn.cn'  
};

// 创建签名
function createSign(body, service_method, appid, appsecret, timestamp, nonce) { 
	// console.log("body是"+body)
	let content_md5 = CryptoJS.MD5(body).toString(CryptoJS.enc.Base64);
	// console.log("content_md5是"+content_md5)
	let stringToSign = "x-ca-key:" + appid + "&x-ca-nonce:" + nonce + "&x-ca-timestamp:" + timestamp +
		"&x-content-md5:" + content_md5 + "&x-service-method:" + service_method;
	// console.log("stringToSign是"+stringToSign)
	let signature = CryptoJS.HmacSHA256(stringToSign, appsecret).toString(CryptoJS.enc.Base64);
	return signature; 
}

// 发送请求
function request(service, url, method, data) {
	// 生成随机数和时间戳
	const nonce = Math.random().toString(36).substr(2, 15);
	const timestamp = parseInt(Date.now());//以毫秒为单位
	
	// 创建签名
	let sign = createSign(JSON.stringify(data), url, appid, appsecret, timestamp, nonce);

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURLs[service] + url,
			method: method,
			data: {
				"Body": JSON.stringify(data),
				"ServiceMethod": url,
				"AppId": appid,
				"Timestamp": timestamp,
				"Nonce": nonce,
				"Signature": sign
			},
			header: {
				'x-ca-key': appid,
				'x-ca-nonce': nonce,
				'x-ca-timestamp': timestamp,
				'x-ca-signature': sign,
				'Content-Type': 'application/json',
				'X-Service-Method': url
			},
			success: (response) => {
				//正常返回
				if (response.statusCode == 200) {
					resolve(response.data);
				} 
				//签名认证错误
				else if(response.statusCode == 401) {
					reject(response.data);
				} 
				else{
					reject(response.errMsg);
				}
			},
			fail: (error) => {
				reject(error);
			},
		});
	});
}

//智慧药房做账
function requestZhyf(service, url, method, data) {
	// 生成随机数和时间戳
	const nonce = Math.random().toString(36).substr(2, 15);
	const timestamp = parseInt(Date.now() / 1000);

	// 创建签名
	let sign = createSign(JSON.stringify(data), url, appid, appsecret, timestamp, nonce);

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURLs[service] + url,
			method: method,
			data: {
				"Body": data,
				"ServiceMethod": url,
				"AppId": appid,
				"Timestamp": timestamp,
				"Nonce": nonce,
				"Signature": sign
			},
			header: {
				'x-ca-key': appid,
				'x-ca-nonce': nonce,
				'x-ca-timestamp': timestamp,
				'x-ca-signature': sign,
				'Content-Type': 'application/json',
				'X-Service-Method': url
			},
			success: (response) => {
				//正常返回
				if (response.statusCode == 200) {
					resolve(response.data);
				} 
				//签名认证错误
				else if(response.statusCode == 401) {
					reject(response.data);
				} 
				else{
					reject(response.errMsg);
				}
			},
			fail: (error) => {
				reject(error);
			},
		});
	});
}

export default request;

/* 请求模板
	const url = '/url-endpoint';
	const method = 'POST'; 
	const data = {
	  key1: 'value1',
	  key2: 'value2',
	  // 其他参数...
	};

	try {
	  const response = await request('service1', url, method, data);
	  // 处理响应数据...
	} catch (error) {
	  console.error(error);
	}
*/
