import { hello } from './a';
import md from './data/data.md';
// import css from './css/index.css';
import './css/index.css';


hello();
hello();

console.log('md', md);

document.body.innerHTML = md;

// console.log('css', css.toString());

// let styleElement = document.createElement('style');
// styleElement.innerHTML = css;
// document.head.appendChild(styleElement);