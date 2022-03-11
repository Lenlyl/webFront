import Hero from './hero.js';

import S1 from '../skills/luban/s1.js'
import S2 from '../skills/luban/s2.js'
import S3 from '../skills/luban/s3.js'

import Skin1 from '../skins/luban/skin1.js'
import Skin2 from '../skins/luban/skin2.js'

export default class Luban extends Hero{
    constructor(){
        let opts = {
            name:"鲁班",
            ico:"./sources/heroes/luban1.png",
            skills:[new S1(),new S2(),new S3()],
            skins:[new Skin1(),new Skin2()]
        }
        super(opts);
        this.height = "150cm"
        // this.name = "鲁班";
        // this.ico = "./sources/heroes/luban1.png"
        // this.skills = [new S1(),new S2(),new S3()];
        // this.skins = [new Skin1(),new Skin2()]
    }

}