<template>
  <div class="uploadPhotoView" v-show="visible">
    <div class="masking"></div>
    <div class="addPhotoContainer"></div>
    <div class="addController">
      <h3 class="addTitle">
        上传照片-普通上传(H5)<span class="close" @click="closeView">╳</span>
      </h3>
      <div class="photoTitles">
        <span class="uploadTo">上传到</span>
        <div class="photoSelect">
          <img class="showPhoto" src="public/img/1.jpg" />
          相册名称
        </div>
      </div>

      <!-- 上传按钮 -->
      <div class="showContainer" v-show="showContainer">
        <div class="uploadContainer">
          <span class="fileinput-button">
            <span>上传图片</span>
            <input
              class="imgFile"
              type="file"
              name=""
              multiple="multiple"
              @change="addPhoto"
            />
          </span>
          <span class="hint"> 按住Ctrl可多选 </span>
        </div>
      </div>

      <!-- 显示待上传图片  -->
      <div class="loadContainer" v-show="!showContainer">
        <div class="wantUpload">
          <template v-for="(item, index) in uploadPhotos">
            <UploadPhotoItem :item="item" :key="index"></UploadPhotoItem>
          </template>
        </div>
        <div class="addStyle">
          <!-- <span class="fileinput-add">
              <span></span>
              <input class="imgFile-add" type="file" multiple="multiple" />
            </span> -->
        </div>
        <!-- 开始上传按钮 -->
        <div class="bottomStyle">
          <span class="uploadBtn" @click="upload">开始上传</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadPhotoItem from "./UploadPhotoItem";
import { apiUpload } from "../api";
export default {
  props: ["visible"],
  components: {
    UploadPhotoItem,
  },
  data() {
    return {
      uploadPhotos: [],
    };
  },
  computed: {
    showContainer() {
      return this.uploadPhotos.length === 0;
    },
  },
  methods: {
    async upload() {
      // 串行
      for (const photo of this.uploadPhotos) {
        await apiUpload(photo);
      }
      // 并行
      //TODO Promise.all()
      this.uploadComleted();
    },
    reset() {
      this.uploadPhotos = [];
    },
    uploadComleted() {
      this.reset();
      this.$emit("upload-completed");
    },
    closeView() {
      this.$emit("update:visible", false);
    },
    addPhoto(e) {
      this.uploadPhotos.push(...e.target.files);
      console.log(this.uploadPhotos);
    },
  },
};
</script>

<style></style>
