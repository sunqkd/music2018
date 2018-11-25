import jsonp from 'common/js/jsonp';  // 引入封装的函数

import {commonParam,options} from './config.js'; // 公共参数

export function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({},commonParam,{
        uin: 0,
        platform: 'h5',
        needNewCode: 1
    })

    return jsonp(url,data,options);
}