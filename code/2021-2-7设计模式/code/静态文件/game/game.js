import Player from './player.js';
// 游戏管理类
 export default class Game{
    constructor(){
        this.player = null;
    }
    login(username){
        // 触发初始化事件（作业）
        this.player = new Player(username);
    }
}

