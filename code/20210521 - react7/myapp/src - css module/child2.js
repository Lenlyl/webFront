import style from "./style2.module.css";
function Child2(){
    return <div>
        <h2 id={style.title}>这是child2的title</h2>
        <div className={style.box}>child2-box</div>
        <p className={style.text}>这是child2的p标签</p>
        <p className="text2">全局的text2-child2</p>
        <p className={style.text3}>全局的text2-child2</p>
    </div>
}

export default Child2;
