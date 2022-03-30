import './lib/vue.js';
import './lib/axios.js';
import { signIn } from './api/index.js';

new Vue({
    el: '#app',
    data: {
        username: '',
        password: ''
    },
    methods: {
        async doSignIn(e) {
            e.preventDefault();

            let rs = await signIn();
            console.log('rs', rs);
        }
    }
})