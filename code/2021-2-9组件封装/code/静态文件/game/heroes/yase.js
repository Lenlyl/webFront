// 父类 基类
import Hero from './hero.js';

import S1 from '../skills/yase/s1.js'
import S2 from '../skills/yase/s2.js'
import S3 from '../skills/yase/s3.js'

import Skin1 from '../skins/yase/skin1.js'
import Skin2 from '../skins/yase/skin2.js'

export default class Yase extends Hero{
    constructor(){
        let opts = {
            name:"亚瑟",
            ico:"./sources/heroes/yase1.png",
            skills:[new S1(),new S2(),new S3()],
            skins:[new Skin1(),new Skin2()]
        }
        super(opts);
        this.trigger("init");
        // this.name = "亚瑟";
        // this.ico = "./sources/heroes/yase1.png"
        // this.skills = [new S1(),new S2(),new S3()];
        // this.skins = [new Skin1(),new Skin2()]
    }
}

