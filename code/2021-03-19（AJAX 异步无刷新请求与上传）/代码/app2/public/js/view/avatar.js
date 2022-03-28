import { avatarUpload } from '../api/index.js'


export async function viewAvatarUpload(avatarFile) {
    let avatarBgElement = document.querySelector('.avatar-bg');

    // 利用 js 中的 FormData 的对象来构造 表单 formdata格式的数据
    let fd = new FormData();
    // fd.append('a', 1);
    // fd.append('b', 2);
    fd.append('avatar', avatarFile);


    let avatarUrl = await avatarUpload(fd);
    // console.log(avatarUrl);


    avatarBgElement.style.backgroundImage = `url('${avatarUrl}')`;


}