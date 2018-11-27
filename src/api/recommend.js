import jsonp from 'common/js/jsonp';  // 引入封装的函数

import {commonParam,options} from './config.js'; // 公共参数

import axios from 'axios';

export function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({},commonParam,{
        uin: 0,
        platform: 'h5',
        needNewCode: 1
    })

    return jsonp(url,data,options);
}

export function getDiscList() {
    const url = '/api/getDiscList';
    const data = Object.assign({},commonParam,{
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 167,
        rnd:Math.random()
    })
    // console.log(data)
    return axios.get(url,{
        params:data
    }).then((res)=>{
        return Promise.resolve(res.data);
    })
}