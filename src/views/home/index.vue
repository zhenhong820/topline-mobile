<template>
  <div class="home">
    <van-nav-bar title="首页" />

    <van-tabs v-model="tabActive" @change="onTabChange">
      <van-tab v-for="item in channelList" :title="item.name">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
          <!-- 列表-->
          <van-list v-model="loading" :finished="finished" finished-text="我是有底线的!" @load="onLoad">
            <van-cell v-for="(item,index) in articlList" :key="index" :title="item.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <!-- 图标 -->
      <div class="my-right-tab" slot="nav-right">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
//导入请求列表工具
import { getChannel } from "@/api/channel.js";
//导入获取列表请求
import { getArticlesByTime } from "@/api/articles.js";

export default {
  name: "home",
  data() {
    return {
      pullLoading: false,
      //跟 tabs 绑定的下标
      tabActive: 0,
      //加载动画
      loading: false,
      //是否加载完成文字
      finished: false,
      //频道列表数据
      channelList: [],
      //列表新闻
      articlList: []
    };
  },
  methods: {
    //点击 tab发生改变
    async onTabChange(name, title) {
      //点击后 去加载频道下面的新闻，然后渲染到列表
      let res = await this.loadArticle();
      // console.log(res);
      this.articlList = res.data.data.results;
    },

    //封装加载文章数据的方法 
    async loadArticle() {
      //以当前时间发请求
      //获取列表的id 
      let channel_id = this.channelList[this.tabActive].id;
      let timestamp = Date.now();
      let with_top = 1;

      let res = await getArticlesByTime({ channel_id, timestamp, with_top });
      //内容的长度为0 就不加载list内容
      if(res.data.data.results.length == 0){
        this.finished
      }
      //返回出去
      return res;
    },

    //下拉刷新
    //触发这个事件会自动把它绑定加载状态改成 true需要手动修改
    async onRefresh() {
      //因为loadArticle 用了 async返回的是promise对象,所以这里也要用await,要等它里面执行完
      let res = await this.loadArticle();

      this.articlList.unshift(...res.data.data.results);
      this.pullLoading = false;
    },

    //本质上是 ,格子还没铺满就会调用这个事件, 会自动先把loading改成true
    async onLoad() {
      let res = await this.loadArticle();
      //把数组展开用push
      this.articlList.push(...res.data.data.results);
      this.loading = false;

      //如果需要设置底线,把这个代码加上,只想无限刷去掉
      // if (this.articlList.length >= 40) {
      //   this.finished = true;
      // }
    }
  },

  async created() {
    //一进来就发请求 获取列表数据
    let res = await getChannel();
    // console.log(res);
    this.channelList = res.data.data.channels;
  }
};
</script>

<style lang="less" scoped>
//scoped 对于自己组件里的组件没用,因为组件里面的组件也有scoped
//让自己的组件里的组件也用上样式,vue 提供一个选择器深度选择器/deep/
.home {
  margin-top: 99px;
  margin-bottom: 46px;

  /deep/ .van-tabs__wrap {
    position: fixed;
    left: 0;
    top: 46px;
    z-index: 99;
    width: 90%;
  }
  .my-right-tab {
    position: fixed;
    right: 10px;
    top: 55px;
  }
}
</style>