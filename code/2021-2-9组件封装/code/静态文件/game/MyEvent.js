export default class MyEvent{
    constructor(){
        // 保存事件
        this.handles = {};
        // {click:[],mouseover:[],mousemove:[] }
    }
    addEvent(eventName,fn){
        if(typeof this.handles[eventName]==="undefined"){
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(fn);
    }
    // 触发
    trigger(eventName){
        this.handles[eventName].forEach(fn=>{
            fn();
        })
    }
    // 移除指定自定义事件(作业)；
    removeEvent(eventName,fn){
        // 需要实现....
        if(!eventName in this.handles){
            return ;
        }
        for(let i=0;i<this.handles[eventName].length;i++){
            if(this.handles[eventName][i]===fn){
                this.handles[eventName].splice(i,1);
                break;
            }
        }
    }
}