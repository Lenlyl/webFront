<template>
  <div class="photo">
    <!-- 展示相关 -->
    <div class="container">
      <div class="photoHeader">
        <div class="imgContainer">
          <img class="photoName" src="public/img/1.jpg" />
        </div>
        <div class="btnContainer">
          <span class="photoTitle">相册名称</span>
          <button class="mybtn" @click="showUploadPhotoView = true">
            上传照片
          </button>
        </div>
      </div>

      <div class="photoContainer">
        <template v-for="item in photos">
          <router-link
            :key="item.id"
            :to="{ name: 'Details', params: { item } }"
          >
            <div class="photoItem">
              <img :src="item.imgUrl" />
              <span> {{ item.name }} </span>
            </div>
          </router-link>
        </template>
      </div>
    </div>
    <!-- 上传相关 -->
    <UploadPhotoView
      :visible.sync="showUploadPhotoView"
      @upload-completed="uploadCompleted"
    ></UploadPhotoView>
  </div>
</template>

<script>
import UploadPhotoView from "../components/UploadPhotoView";
import { apiGetPhotos } from "../api";

export default {
  components: {
    UploadPhotoView,
  },
  data() {
    return {
      photos: [],
      showUploadPhotoView: false,
    };
  },
  methods: {
    // 如何写"好代码"
    // 1. 不能有重复
    // 2. 表达出代码的意图
    // 1 <重构> 《代码大全》
    uploadCompleted() {
      this.updatePhotos();
    },

    async updatePhotos() {
      const { data } = await apiGetPhotos();
      this.photos = data.data.photos;
    },
  },
  async created() {
    this.updatePhotos();
  },
};
</script>

<style></style>
