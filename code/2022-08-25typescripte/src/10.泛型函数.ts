// function getValue(obj, k) {
//     return obj[k];
// }

// let obj1 = {
//     name: 'lllll',
//     age: 25
// }

// let obj3 = {
//     x: 100,
//     y: 200
// }

// getValue(obj1, 'x');

// T 即为泛型参数
interface IResponseData<T> {
    code: number,
    message: string,
    data: T
}

interface IUserData {
    id: number,
    name: string,
    age: number
}

interface IListData {
    page: number,
    data: any,
    hasNext: number
}

async function getData<U>(url:string) {
    let response = await fetch(url);
    let data : Promise<IResponseData<U>> = await response.json();
    return data;
}

(async function () {
    let userData = await getData<IUserData>('/user');
    userData.data.name;

    let listData = await getData<IListData>('/list');
    listData.data.hasNext;
})()