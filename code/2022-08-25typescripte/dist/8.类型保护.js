function func(a) {
    if (typeof a === 'string') {
        a.substring(1);
    }
    else {
        a.toFixed(1);
    }
}
//instance
//type
//in
//自定义类型保护
function canEach(data) {
    return data.forEach != undefined;
}
function funElements(elements) {
    if (canEach(elements)) {
        elements.forEach(function (el) {
            el.className = '';
        });
    }
    else {
        elements.className = '';
    }
}
