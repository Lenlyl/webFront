
export async function getCategories() {
    let res = await axios({
        // method: 'get'
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


export async function avatarUpload(data) {
    let res = await axios({
        method: 'post',
        url: '/avatar',
        data
    });

    return res.data;
}