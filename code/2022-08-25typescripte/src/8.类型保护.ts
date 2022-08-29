function func(a: string | number) {
    if (typeof a === 'string') {
        a.substring(1);
    } else {
        a.toFixed(1);
    }
}

//instance
//type
//in

//自定义类型保护
function canEach(data: any): data is Element[] | NodeList {
    return data.forEach != undefined;
}

function funElements(elements: Element[] | NodeList | Element) {
    if(canEach(elements)){
        elements.forEach((el: Element) => {
            el.className = '';
        })
    }else{
        elements.className = '';
    }
}
