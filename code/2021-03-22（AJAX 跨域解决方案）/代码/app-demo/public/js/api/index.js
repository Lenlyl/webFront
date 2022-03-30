axios.defaults.baseURL = 'http://localhost:8888';

export async function getCategories() {
    let res = await axios({
        url: '/categories'
    });
    return res.data;
}


export async function getItems(page = 1) {
    let res = await axios({
        url: '/items',
        params: {
            page
        }
    });
    return res.data;
}


export async function signIn() {
    let res = await axios({
        method: 'POST',
        url: '/signin',
        data: {
            username: 'zMouse',
            password: '123'
        },
        withCredentials: true
    });
    return res.data;
}

export async function postComment() {
    let res = await axios({
        method: 'POST',
        url: '/comment/1',
        data: {
            content: 'aaaa'
        },
        withCredentials: true
    });
    return res.data;
}


export async function avatarUpload(data) {
    let res = await axios({
        method: 'post',
        url: '/avatar',
        data
    });

    return res.data;
}