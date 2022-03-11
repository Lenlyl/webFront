import style from "./style1.module.css";
function Child1(){
    return <div>
        <h2 id={style.title}>这是child1的title</h2>
        <div className={style.box}>child1-box</div>
        <p className={style.text}>这是child1的p标签</p>
        <p className="text2">全局的text2-child1</p>
    </div>
}

export default Child1;
