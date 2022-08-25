const navs = [
    {
      path: "/",
      title: "首页",
      isActive(pathname){
          return pathname === "/"||pathname === "/index"||pathname === "/home"
      }
    },{
      path: "/getstart",
      title: "新手入门"
    },{
      path: "/api",
      title: "API"
    },{
      path: "/about",
      title: "关于"
    }
  ];
  const indexNavs = [
    {
      path: "/?tab=all",
      title: "全部"
    },{
      path: "/?tab=good",
      title: "精华"
    },{
      path: "/?tab=share",
      title: "分享"
    },{
      path: "/?tab=ask",
      title: "问答"
    },{
      path: "/?tab=job",
      title: "招聘"
    }
  ];


  export {navs,indexNavs}
