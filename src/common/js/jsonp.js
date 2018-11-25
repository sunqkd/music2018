// https://github.com/webmodules/jsonp
import originJSONP from 'jsonp'; // 引入jsonp

export default function jsonp(url, datas, option) { // 对外暴露一个方法

   url += (url.indexOf('?') < 0 ? '?': '&') + params(datas);

  // url 为地址 data 为参数  option 为配置
    return new Promise((resolve, reject) => {
        // jsonp 插件三个参数 第一个表示url 第二个回调函数名字  第三个表示回调函数
        originJSONP(url, option, (err, data) => {
            if(!err){ // 回调成功
                resolve(data);
            }else{ // 回调失败
                reject(err);
            }
        })
    })
}


// 参数拼接 到url上
function params(data){
    let url = '';
    for(var k in data){  // 遍历对象
        let value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
}