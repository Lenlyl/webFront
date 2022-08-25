import {a} from "./a.js";
import b from "./b.js";
import readerMeTxt from "./readerMe.txt"
import logo from "./logo.png";
import indexCss from "./index.css";
import indexDoc from "./doc.doc";

a();
b();
console.log(readerMeTxt);
const img = new Image();
img.src = logo;
document.body.appendChild(img);

//style-loader 处理原理，加入后，无需手动转化css 》》 style
// console.log(indexCss.toString());
// const style = document.createElement('style');
// style.innerHTML = indexCss.toString();
// document.body.appendChild(style)

console.log(indexDoc);
document.body.innerHTML += indexDoc;
console.log('server');