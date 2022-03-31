function ajax(options) {

    let opts = Object.assign({
        dataType: 'none',
        method: 'get',
        url: '',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        jsonp: "cb",
        data: '',
        success: function(){},
    }, options);

    //处理jsonp跨域请求
    if (opts.dataType == 'jsonp') {
        jsonpFn(opts.url, opts.data, opts.jsonp, opts.success);
        return false;
    }

    function jsonpFn(url, data, cbName, cbFn) {
        //挂载回调函数到window上，重命名函数接替
        let fnName = 'jQuery' + Math.random().toString().substring(2);
        window[fnName] = cbFn;
        let sp = document.createElement('script');
        sp.src = `${url}?${o2u(data)}&${cbName}=${fnName}`
        document.querySelector('head').appendChild(sp);
    }



    //非跨域请求处理
    let xhr = new XMLHttpRequest();
    if (options.method == "get") {
        let data = o2u(opts.data)
        options.url = options.url + "?" + data;
    }
    xhr.open(options.method, options.url, true);
    for (let key in opts.headers) {
        xhr.setRequestHeader(key, opts.headers[key]);
    }
    let sendData;
    switch (opts.headers['content-type']) {
        case 'application/x-www-form-urlencoded':
            sendData = o2u(opts.data);
            break;
        case 'application/json':
            sendData = JSON.stringify(opts.data);
            break;
    }
    xhr.onload = function () {
        let resData;
        if (xhr.getResponseHeader("content-type").includes("xml")) {
            resData = xhr.responseXML;
        } else {
            resData = JSON.parse(xhr.responseText);
        }
        options.success(resData);
    }
    if (options.method == "get") {
        xhr.send();
    } else {
        xhr.send(sendData);
    }
}

function o2u(data) {
    let keys = Object.keys(data);
    let values = Object.values(data);
    return keys.map((k, index) => {
        return `${k}=${values[index]}`;
    }).join('&');
}