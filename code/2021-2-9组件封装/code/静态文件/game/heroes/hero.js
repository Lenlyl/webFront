import MyEvent from '../MyEvent.js'
export default class Hero extends MyEvent{
    constructor({name,ico,skills,skins}){
        super();
        this.name = name;
        this.ico = ico
        this.skills = skills;
        this.skins = skins;
        // 绑定自定义事件（作业）
        this.addEvent("init",this.init);
        // this.addEvent("init",this.init);
        // this.addEvent("init",this.init);
    }
    // 需要在登录的时候执行（自定义事件）
    init(){
        console.log("初始化");
    }
}