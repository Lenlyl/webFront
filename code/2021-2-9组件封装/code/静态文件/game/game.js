import Player from './player.js';
// 游戏管理类
 export default class Game{
    constructor(){
        this.player = null;
    }
    login(username){
        this.player = new Player(username);
         // 触发初始化事件（作业）
        // this.player.heroes.forEach(hero=>{
        //     hero.trigger("init");
        // })
    }
}



//一句话： 类里的this指向实例化对象 
