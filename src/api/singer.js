// 歌手 api
import jsonp from 'jsonp';


export function getSingerList(index) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI6620244305102778&g_tk=798054204&loginUin=1130184209&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data={"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":' + index + ',"sin":0,"cur_page":1}}}';

    return new Promise((resolve, reject) => {
        jsonp(url,{
            param:'callback'
        },(err,data)=>{
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        })
    })
}
