import './lib/axios.js';
import './lib/nunjucks.js';
import { viewItems } from './view/items.js';

let paginationElement = document.querySelector('.pagination');

viewItems();

paginationElement.onclick = (e) => {
    // console.log(e.target.innerText);
    viewItems(Number(e.target.innerText))
}