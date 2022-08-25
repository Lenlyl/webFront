/*
?wd=开课吧&rsv_spt=1&rsv_iqid=0x8013a58000104150&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=14&rsv_sug1=15&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&inputT=4352&rsv_sug4=4352

    路由参数：
        当组件是被 Route 调用时，Route 就会把相关的路由信息传递给组件
        history:
            action: "PUSH"||"POP"||"REPLACE"
                "PUSH"：应用内通过连接跳转到当前视图的，或 通过 push 方法跳转到当前视图
                "POP"：直接输入地址跳转到当前应用
                "REPLACE": 通过重定向跳转或者通过 replace 方法跳转
            go: ƒ go(n) 跳转历史记录 n 步
            oBack: ƒ goBack() 返回历史记录上一步
            goForward: ƒ goForward() 前进历史记录下一步
            length  当前源在历史记录中记录的条目数
            push: ƒ push(path[, state]) 跳转视图：向历史记录中，添加新的一条记录，从而影响视图
            replace: ƒ replace(path[, state]) 跳转视图：替换掉历史记录中当前这条 
        location:
            hash: "" hash 值
            pathname: "/about" 当前的url
            search: "" 当前的 search值
            state: undefined push 或 replace 传递的信息
        match: 匹配信息
            isExact: true 单签 route 是否是精确匹配
            params: {} 动态路由的参数
            path: "/about" 当前 route 的 path 值
            url: "/about" 当前 url 中，被当前 path 匹配成功的部分

*/

function AboutView(props){
    console.log(props,"about");
    const {history} = props;
    return <div>
        <h1>关于</h1>
        <button onClick={()=>{
            history.push("/join","这是push传递的信息");
        }}>push到join</button>
        <button onClick={()=>{
            history.replace("/join",{info:"这是replace传递的信息"})
        }}>replace到join</button>
    </div>
}

export default AboutView;
