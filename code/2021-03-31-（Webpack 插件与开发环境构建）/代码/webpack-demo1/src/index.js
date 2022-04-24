import { hello } from './libs/a';
import { world } from './libs/b';
import './assets/css/index.css';


// hello();

// document.onclick = function () {
//     let xhr = new XMLHttpRequest();

//     // xhr.open('get', 'http://localhost:8787/info');
//     xhr.open('get', '/api/info');

//     xhr.onload = function () {
//         console.log(this.responseText);
//     }

//     xhr.send();
// }


document.onclick = hello;


// HMR 的更新规则是需要自己实现的
// console.log(module.hot);
if (module.hot) {

    // 实际：header.vue
    // import Header from './header.vue'
    // module.hot.accept('./header.vue', () => {
    //     // console.log('a 模块更新了');
    //     Header.render();
    // });

    module.hot.accept('./libs/a', () => {
        console.log('a 模块更新了');
        document.onclick = hello;
    });

    module.hot.accept('./libs/b', () => {
        console.log('b 模块更新了');
    });
}