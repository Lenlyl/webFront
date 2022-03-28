import './lib/axios.js';
import './lib/nunjucks.js'
import { viewItems } from './view/item.js';

let paginationElement = document.querySelector('.pagination');

viewItems();

paginationElement.onclick = function (e) {
    // console.log(e.target)
    viewItems(Number(e.target.innerHTML));
}