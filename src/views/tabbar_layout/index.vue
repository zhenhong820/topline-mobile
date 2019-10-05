<template>
  <div>
    <!-- 路由 ,显示子路由的内容-->
    <router-view></router-view>

    <!-- 底部的tabber栏 -->
    <van-tabbar v-model="active" class="my-tabbar">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style >
</style>