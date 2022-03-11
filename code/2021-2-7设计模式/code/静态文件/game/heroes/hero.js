export default class Hero{
    constructor({name,ico,skills,skins}){
        this.name = name;
        this.ico = ico
        this.skills = skills;
        this.skins = skins;
        // 绑定自定义事件（作业）
        this.init = this.init.bind(this);
        console.log('Hero constr');
    }
    // 需要在登录的时候执行（自定义事件）
    init(){
        console.log("初始化");
    }
}