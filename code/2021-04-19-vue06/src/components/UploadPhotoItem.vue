<template>
  <div class="uploadPhotoItem">
    <span class="myProgress">
      <span class="plan"></span>
      30%
    </span>
    <img :src="imgUrl" />
    <span class="pictureName"> {{ item.name }} </span>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      imgUrl: "",
    };
  },
  created() {
    const render = new FileReader();
    //   file -> base64
    // file
    render.onload = () => {
      this.imgUrl = render.result;
    };
    render.readAsDataURL(this.item);
  },
};
</script>

<style></style>
