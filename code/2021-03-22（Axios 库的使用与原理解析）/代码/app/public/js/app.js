import Kxios from './kxios/index.js';


let btns = document.querySelectorAll('button');

btns[0].onclick = async function () {
    let res = await axios({
        method: 'get',
        url: '/data'
    });

    console.log('res', res);
};

let kxios = new Kxios({
    baseUrl: '',
    // headers: {
    //     'content-type': 'application/json',
    //     'authorization': localStorage.getItem('token')
    // },
    // method: 'Post'
});
// kxios.defaults.headers.authorization = localStorage.getItem('token');
kxios.interceptors.request.use(function (config) {
    // 一般可以对配置对象进行修改
    console.log('request1');
    // config.headers.authorization = localStorage.getItem('token');
    return config;
});

kxios.interceptors.request.use(function (config) {
    console.log('request2');

    return config;
});


kxios.interceptors.response.use(function (res) {
    // 一般可以对配置对象进行修改
    console.log('response1', res);
    // 对返回的数据进行统一的分析和处理
    if (res.status !== 200) {
        alert('出错了');
    }
    return res;
});

kxios.interceptors.response.use(function (res) {
    console.log('response2', res);
    return res;
});

btns[1].onclick = function () {


    // kxios.request({
    //     method: 'post',
    //     url: '/data'
    // });

    // kxios.request({
    // method: 'Get',
    // url: '/user',
    // headers: {
    //     'Authorization': 'Bearer token'
    // }
    // });




    // []
    kxios.request({
        url: '/data'
    }).then(res => {
        console.log('res', res);
    });


}