// let config = {}

class Jq {
    constructor(arg, root) {
        if (typeof root == "undefined") {
            this['prevObject'] = [document];
        } else {
            this['prevObject'] = root
        }

        // this.ele = document.querySelector(arg);
        if (typeof arg === "string") {
            // 多个元素；
            let eles = document.querySelectorAll(arg);
            this.addEles(eles);
        } else if (typeof arg === "object") {
            // 对象
            // this.eles = [arg];
            // console.log("object")
            if (typeof arg.length === "undefined") {
                // this.eles = [arg];
                this[0] = arg;
                this.length = 1;
            } else {
                // this.eles = arg; 
                this.addEles(arg);
            }
        } else if (typeof arg === 'function') {
            window.addEventListener("DOMContentLoaded", arg);
        }
        console.log(this);
    }
    addEles(eles) {
        for (let i = 0; i < eles.length; i++) {
            this[i] = eles[i];
        }
        this.length = eles.length;
    }

    click(fn) {
        // this.ele.addEventListener("click",fn);
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener("click", fn);
        }
    }
    on(eventName, fn) {
        let eventArr = eventName.split(" ");
        //   console.log(eventArr)
        // 多个元素 ，多个事件；
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < eventArr.length; j++) {
                this[i].addEventListener(eventArr[j], fn);
            }
        }
        return this;
    }
    eq(index) {
        // return this[index];
        return new Jq(this[index], this);
    }
    get() {
        return this[index];
    }
    end() {
        return this['prevObject'];
    }
    css(...args) {
        if (args.length === 1) {
            if (typeof args[0] === 'string') {
                // 获取样式1
                return this.getStyle(this[0], args[0]);
            } else {
                // 设置样式3 对象 --多个元素 、多个样式；
                for (let i = 0; i < this.length; i++) {
                    for (let j in args[0]) {
                        this.setStyle(this[i], j, args[0][j])
                    }
                }
            }

        } else {
            // 设置样式2 2个参数
            // 多个节点
            for (let i = 0; i < this.length; i++) {
                this.setStyle(this[i], args[0], args[1]);
            }

        }
        return this;
    }
    getStyle(ele, styleName) {
        if (styleName in $.cssHooks) {
            $.cssHooks[styleName].get(ele);
        }

        return getComputedStyle(ele, null)[styleName];
    }
    setStyle(ele, styleName, styleValue) {
        if (styleName in $.cssHooks) {
            $.cssHooks[styleName].set(ele, styleValue);
        }

        if (typeof styleValue === "number" && !$.cssHooks[styleName]) {
            styleValue = styleValue + "px";
        }
        ele.style[styleName] = styleValue;
    }
    animate(style, fn, timeout = 1000) {

        let that = this;
        if (typeof style === 'object') {
            // 设置样式 对象 --多个元素 、多个样式；
            for (let i = 0; i < this.length; i++) {
                let ele = this[i];
                for (let j in style) {

// this.setStyle(ele, j, style[j]);

                    let time_px = 1;
                    let currentStyleV = parseFloat(getComputedStyle(ele, null)[j].replace("px", ""));
                    let newStyleV = 0;
                    if (typeof style[j] === "number") newStyleV = style[j]
                    if (typeof style[j] === "string") newStyleV = parseFloat(style[j].replace("px", ""))
                    let difference = newStyleV - currentStyleV;

                    if (difference !== 0) {
                        console.log('动画开始');
                        let time_px = parseInt(timeout / Math.abs(difference));

                        let j_id = setInterval(function () {
                            if(currentStyleV !== newStyleV){
                                that.setStyle(ele, j, difference > 0 ? currentStyleV+=1 : currentStyleV-=1)
                            }
                        }, time_px)

                        //默认1.5秒后关闭动画
                        setTimeout(() => {
                            that.setStyle(this[i], j, style[j])
                            clearInterval(j_id)
                            fn && fn()
                        }, timeout);
                    }
                }
            }
        }
    }
}


function $(arg) {
    // return {
    //     click(fn){
    //         // fn();
    //         document.querySelector(arg).onclick = function(){
    //             fn && fn();
    //         }
    //     }  
    // }
    return new Jq(arg);
}

$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}
// axios();  axios.get post put delete 
$.cssHooks = {};