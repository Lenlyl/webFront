import './lib/axios.js';
import './lib/nunjucks.js'
import { viewAvatarUpload } from './view/avatar.js';

let avatarEditElement = document.querySelector('.avatar-edit');
let avatarEditFileElement = document.querySelector('.avatar-edit-file')

// 点击上传用户头像的逻辑 
avatarEditElement.onclick = function () {
    // 点击 avatarEditElement 间接的去调用 avatarEditFileElement 的点击
    avatarEditFileElement.click();
}

// 当我们选择了图片以后，触发 avatarEditFileElement 的 change 事件，在这里去请求后端，发送图片
avatarEditFileElement.onchange = function () {
    // 请求后端
    // console.log(this.files);
    viewAvatarUpload(this.files[0]);
}