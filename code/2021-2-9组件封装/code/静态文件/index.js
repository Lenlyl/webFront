import Game from './game/game.js';
let game = new Game();
console.log(game);

document.querySelector(".sub").onclick = function(){
    let username = document.querySelector(".username").value;
    game.login(username);
    console.log(game);
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    document.querySelector(".chioseusername").innerHTML = username;
    renderHeroes(game.player.heroes);
}

// 渲染英雄
function renderHeroes(heroes){
    document.querySelector(".heroView").innerHTML = "";
    heroes.forEach(hero=>{
        let heroItem = document.createElement("div");
        heroItem.classList.add("heroItem");
        heroItem.innerHTML = ` <img src="${hero.ico}" />
        <span>${hero.name}</span>`;
        document.querySelector(".heroView").appendChild(heroItem);
        heroItem.onclick = function(){
            document.querySelector(".heroShow").innerHTML = `<img src="${hero.ico}" />`
            console.log("渲染技能");
            renderSkills(hero.skills);
            renderSkins(hero.skins);
        }
    })
}
// 渲染技能
function renderSkills(skills){
    document.querySelector(".skillsView").innerHTML = "";
    skills.forEach(skill=>{
        let img = new Image();
        img.src = skill.ico;
        document.querySelector(".skillsView").appendChild(img);
        img.onclick = function(){
            console.log("点击了"+skill.name);
        }
    })
}

function renderSkins(skins){
    document.querySelector(".skinView").innerHTML = "";
    skins.forEach(skin=>{
        let div = document.createElement("div");
        div.classList.add("skinItem");
        div.innerHTML = ` <img src="${skin.ico}" />
        <span>${skin.name}</span>`;
        document.querySelector(".skinView").appendChild(div);
        div.onclick = function(){
            document.querySelector(".skinShow").innerHTML = `<img src="${skin.img}" />`;
        }
    })
}


document.querySelector(".heroBtn").onclick = function(){
    document.querySelector(".heroContainer").style.display = "block";
    document.querySelector(".skinContainer").style.display = "none";
}

document.querySelector(".skinBtn").onclick = function(){
    document.querySelector(".heroContainer").style.display = "none";
    document.querySelector(".skinContainer").style.display = "block";
}


// mvvm （m vm v）  mvc（m v c） 

// 分析对象  ： 玩家（用户名、英雄）  英雄 （ 技能（名称、ico）  皮肤 ）管理对象（玩家、login）；
// 抽象成类 --》模块化划分---》组织逻辑--》渲染视图
// 英雄类 技能类  皮肤类
// 对象--->抽象---> 鲁班类 亚瑟类 -->抽象 --(extends)--->父类（基类）
// 1.继承（扩展）; 







