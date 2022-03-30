import './lib/vue.js';
import './lib/axios.js';
import { getCategories } from './api/index.js';

new Vue({
    el: '#app',
    data: {
        title: '商城',
        categories: []
    },
    async created() {
        this.categories = await getCategories();
        console.log('categories', this.categories);
    }
});