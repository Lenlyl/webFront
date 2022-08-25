export default function b(params) {
    console.log('这里是b.js的方法');
}

import {a as A} from './a.js';
A();