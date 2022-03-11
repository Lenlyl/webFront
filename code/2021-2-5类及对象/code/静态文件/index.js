// 和视图相关的；
// 游戏管理  玩家（登录）  英雄  技能  皮肤 
/*
    game{
        login{
          player{
             heroes:{
                skills
                skins
                }
          }
        }
    }
*/
// 分析对象 --》对象特性（属性及方法）-->抽象成类--->逻辑关系
import Game from './game/game.js';

let game = new Game();
// console.log(game);
// 登录
document.querySelector(".sub").onclick = function () {
    let username = document.querySelector(".username").value;
    // console.log(username);
    game.login(username);
    console.log(game);
    renderHeroes(game.player.heroes);
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    document.querySelector(".chioseusername").innerHTML = username;
}


// 渲染英雄；
function renderHeroes(heroes) {
    document.querySelector(".heroView").innerHTML = "";
    heroes.forEach((hero, index) => {
        let heroItem = document.createElement("div");
        heroItem.setAttribute('key', index);
        heroItem.classList.add("heroItem");
        heroItem.innerHTML = `<img src="${hero.icon}"/>
        <span>${hero.name}</span>`;
        document.querySelector(".heroView").appendChild(heroItem);
    })
}

// 作业 扩展一个鲁班类  且渲染鲁班技能；

//切换英雄点击事件
Function.prototype.

