let template = document.createElement("template");
template.innerHTML = `<div class="k-wrapper"></div>
<div class="k-dialog">
    <div class="k-header">
        <span class="k-title">提示</span><span class="k-close">X</span>
    </div>
    <div class="k-body">
        <span>这是一段文本</span>
        <input class="input-inner" type="text" />
    </div>
    <div class="k-footer">
        <span class="k-cancel">取消</span>
        <span class="k-primary">确定</span>
    </div>
</div> 
<style>
.k-dialog {
    width: 30%;
    z-index: 2001;
    display: block;
    position: absolute;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    margin: 0 auto;
    top: 15vh;
    left:30%;
}

.k-wrapper {
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background: black;
    opacity: 0.4;
    z-index: 2000;
}

.k-header {
    padding: 20px 20px 10px;
}

.k-header .k-title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    float: left;
}

.k-body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
}

.k-footer {
    padding: 10px 20px 30px;
    text-align: right;
}

.k-close {
    color: #909399;
    font-weight: 400;
    float: right;
    cursor: pointer;
}

.k-cancel {
    color: #606266;
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 500;
    margin-right: 10px;
}

.k-cancel:hover {
    color: #409eff;
    background: #ecf5ff;
    border-color: #c6e2ff;
}

.k-primary {
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 500;
    background: #409eff;
    color: #fff;
    margin-left: 10px;
}

.k-primary:hover {
    background: #66b1ff;
}
.k-input{
    width: 100%;
    margin-left: 20px;
    margin-bottom: 20px;
}
.input-inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    margin-top: 20px;
}
</style>
`;
// HTMLElement  继承  EventTarget（自定义事件 myevent）

class MessageBox extends HTMLElement {
    constructor() {
        super();
        this._sd = this.attachShadow({ mode: "open" })
        this._sd.appendChild(template.content.cloneNode(true));
        this.title = this.getAttribute("title");
        this.content = this.getAttribute("content");
        this.drag = this.getAttribute("drag");
        this.exChangeHtml();
        this.addEvent();
        this.addDraggleEvent();
    }
    exChangeHtml() {
        this._sd.querySelector(".k-title").innerHTML = this.title
        this._sd.querySelector(".k-body span").innerHTML = this.content;
    }
    addEvent() {
        let dialog = this._sd.querySelector(".k-dialog");
        dialog.onclick = e => {
            // console.log(e.target);
            switch (e.target.className) {
                case 'k-close':
                    this.#close();
                    break;
                case 'k-cancel':
                    this.#close();
                    break;
                case 'k-primary':
                    this.dispatchEvent(new CustomEvent("success"));
                    this.#close();
                    break;
                default:
                    break;
            }
        }
    }
    //作业：拖拽
    addDraggleEvent() {
        if (this.drag == 'true') {
            console.log('打开了拖拽功能');
            let _dialog = this._sd.querySelector(".k-dialog");
            var _init_left, _init_top, _div_top, _div_left, _box_width, _box_heiht;
            var _win_height = window.screen.height;
            var _win_width = window.screen.width;

            _dialog.addEventListener('touchstart', function (e) {
                _init_left = parseInt(e.touches[0].clientX);
                _init_top = parseInt(e.touches[0].clientY);
                _div_top = _dialog.style.top - document.body.scrollTop;
                _div_left = _dialog.style.left;
                _box_width = document.body.clientWidth;
                _box_heiht = document.body.clientHeight;
                console.log(_div_left, _div_top);
            });



            _dialog.addEventListener('touchmove', function (e) {
                e.preventDefault();
                var _left = parseInt(e.touches[0].clientX);
                var _top = parseInt(e.touches[0].clientY);

                var _need_left = _div_left + (_left - _init_left);
                var _need_top = _div_top + (_top - _init_top);
                
                console.log(_need_left, _need_top);
                
                _dialog.style.left = _need_left + "px";
                _dialog.style.top = _need_top + "px";
            });

            _dialog.addEventListener('touchend', function (e) {

            });

        } else {
            console.log('关闭了拖拽功能');
        }
    }

    #close() {
        this._sd.querySelector(".k-wrapper").style.display = "none";
        this._sd.querySelector(".k-dialog").style.display = "none";
    }
}

customElements.define("message-box", MessageBox);

// data --->在组件里是函数（防止引用）;



