class Vue extends EventTarget{
    constructor(options) {
        super();
        this.$options = options;
        this._data = options.data;
        this.observe(this._data);
        this.compile();
    }
    observe(data) {
        let keys = Object.keys(data);
        let _this = this;
        keys.forEach(key => {
            let value = data[key];
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    console.log("get");
                    return value;
                },
                set(newValue) {
                    console.log("set", newValue);
                    _this.dispatchEvent(new CustomEvent(key,{
                        detail:newValue
                    }))
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

                    this.addEventListener($1,e=>{
                        // console.log(e)
                        // 响应式渲染；
                        let newValue = e.detail;
                        let oldValue = this._data[$1];
                        // console.log(newValue,oldValue);
                        node.textContent = node.textContent.replace(oldValue,newValue);
                    })
                }
            }
        })
    }
}

// 发布订阅模式
// 观察者模式