function showOrHide(el, attr, value) {
    //...
}
var div2 = document.querySelector('div');
if (div2) {
    showOrHide(div2, 'display', 'block');
    // showOrHide(div2, 'display', 1); //2种规则不能交叉
    showOrHide(div2, 'opacity', 1);
}
function css2(el, attr, value) {
    //...
}
var div3 = document.querySelector('root');
div3 && css2(div3, { 'width': 100 }); //2参数
div3 && css2(div3, 'width', 100); //3参数
