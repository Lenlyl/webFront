class Vue{
    constructor(options) {
        this.$options = options;
        this._data = options.data;
        this.observe(this._data);
        this.compile();
    }
    observe(data) {
        let keys = Object.keys(data);
        // let _this = this;
        // 收集wather 触发watcher
        keys.forEach(key => {
            let value = data[key];
            let dep = new Dep();
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    console.log("get");
                    // 收集订阅者
                    if(Dep.target){
                        dep.addSub(Dep.target); 
                    }
                    return value;
                },
                set(newValue) {
                    console.log("set", newValue);
                    // 发布订阅者
                    // console.log(dep);
                    dep.notify(newValue);
                    // _this.dispatchEvent(new CustomEvent(key,{
                    //     detail:newValue
                    // }))
                    value = newValue;
                }
            })
        })
    }
    compile() {
        let ele = document.querySelector(this.$options.el);
        this.compileNodes(ele);
    }
    compileNodes(ele) {
        let childNodes = ele.childNodes;
        // console.log(childNodes)
        childNodes.forEach(node => {
            if (node.nodeType === 1) {
                // 获取属性；
                let attrs = node.attributes;
                // console.log(attrs)
                [...attrs].forEach(attr=>{
                    let attName = attr.name;
                    let attrValue = attr.value;
                    // console.log(attName,attrValue)
                    if(attName==="v-model"){
                        node.value = this._data[attrValue];
                        node.addEventListener("input",e=>{
                            // console.log(e.target.value);
                            // {message:"数据"}
                            this._data[attrValue] = e.target.value;
                        })
                    }else if(attName==="v-html"){
                        node.innerHTML = this._data[attrValue];
                        new Watcher(this._data,attrValue,(newValue)=>{
                            // console.log("v-html Watcher",newValue);
                            node.innerHTML = newValue;
                        })
                    }
                })

                // console.log("元素节点");
                if (node.childNodes.length > 0) {
                    this.compileNodes(node);
                }
            } else if (node.nodeType === 3) {
                // console.log("文本节点");
                // 查找特殊的 "{{}}"
                let reg = /\{\{([^\{\}\s]+)\}\}/g;
                // console.log(node.textContent);
                if (reg.test(node.textContent)) {
                    // console.log("有花括号");
                    let $1 = RegExp.$1;
                    // console.log($1);
                    // node.textContent = this._data[$1];
                    node.textContent = node.textContent.replace(reg, this._data[$1]);
                    // 生成watcher
                    new Watcher(this._data,$1,(newValue)=>{
                        // console.log("Watcher的callback",newValue);
                        let oldValue = this._data[$1];
                        node.textContent = node.textContent.replace(oldValue,newValue);
                    })

                    // this.addEventListener($1,e=>{
                    //     // console.log(e)
                    //     // 响应式渲染；
                    //     let newValue = e.detail;
                    //     let oldValue = this._data[$1];
                    //     // console.log(newValue,oldValue);
                    //     node.textContent = node.textContent.replace(oldValue,newValue);
                    // })
                }
            }
        })
    }
}

// 发布订阅模式
// 观察者模式

// 收集器
class Dep{
    // 收集订阅者；
    constructor(){
        this.subs = [];
    }
    addSub(sub){
        this.subs.push(sub);
    }
    // 发布；
    notify(newValue){
        this.subs.forEach(sub=>{
            sub.update(newValue);
        })
    }
}
// 订阅者；
class Watcher{
    constructor(data,key,cb){
        Dep.target = this;
        // 人为触发get
        data[key];  //触发了get
        this.cb = cb;
        Dep.target = null;
    }
    update(newValue){
        this.cb(newValue);
    }
}