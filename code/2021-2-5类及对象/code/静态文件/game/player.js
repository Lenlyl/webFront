import Yase from './heroes/yase.js';
import Luban from './heroes/luban.js';


export default class Player{
    constructor(username){
        this.username = username;;
        this.heroes = [new Yase(), new Luban()];
    }
}