class User {
    id: number
    name: string;

    constructor(id: number, name: string) {
        console.log('constructor');
        this.id = id;
        this.name = name;
    }

    showName() {
        console.log(this.name);
    }

    showId = () => {
        console.log(this.id);
    }
}

let user1 = new User(1, 'user1');
console.log(user1);
user1.showName();



class Vip extends User {

}
let vip = new Vip(2, 'vip');
console.log(vip);
