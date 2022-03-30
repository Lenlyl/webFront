import { avatarUpload } from "../api/index.js";

export async function viewAvatarUpload(file) {

    let fileData = new FormData();
    fileData.append('avatar', file);
    let fileUrl = await avatarUpload(fileData);
    console.log(fileUrl);

    let avatarBgElement = document.querySelector('.avatar-bg');
    avatarBgElement.style.backgroundImage = `url(${fileUrl})`;


}