function showOrHide(el: HTMLDivElement, attr: 'display', value: 'block' | 'none'): void;
function showOrHide(el: HTMLDivElement, attr: 'opacity', value: number): void;
function showOrHide(el: HTMLDivElement, attr: any, value: any) {
    //...
}

let div2 = document.querySelector('div');
if (div2) {
    showOrHide(div2, 'display', 'block');
    // showOrHide(div2, 'display', 1); //2种规则不能交叉
    showOrHide(div2, 'opacity', 1);
}


//还可以定义不定餐约束
interface obj {
    [key: string]: string | number
}
function css2(el: Element, attr: obj): void;
function css2(el: Element, attr: string, value: string | number): void;
function css2(el: Element, attr: any, value?: any) {
    //...
}

let div3 = document.querySelector('root');
div3 && css2(div3, { 'width': 100 }); //2参数
div3 && css2(div3, 'width', 100); //3参数