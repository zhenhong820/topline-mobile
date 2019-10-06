<template>
  <!-- 弹出层信息  v-model是否显示-->
  <van-popup v-model="show">
    <van-row>
      <van-col span="8">
        <van-icon name="cross" @click="doClose " />
      </van-col>
    </van-row>

    <van-row class="two-row">
      <van-col span="12">我的频道</van-col>
      <van-col span="12" style="text-align:right; ">
        <van-button color="red" round plain size="mini" @click="doEdit">{{editText}}</van-button>
      </van-col>
    </van-row>

    <van-row gutter="5">
      <van-col span="6" v-for="(item,index) in myList">
        <van-button
          size="large"
          color="#f4f5f6"
          class="my-channel"
          :class="{'checked':index == active}"
          @click="$emit('update:active',index)"
        >
          {{item.name}}
          <van-icon @click="doDel(item)" v-show="isEdit && item.name != '推荐'" name="clear" />
        </van-button>
      </van-col>
    </van-row>

    <van-row class="two-row">
      <van-col span="12">频道推荐</van-col>
    </van-row>

    <van-row gutter="5">
      <van-col span="6" v-for="item in newList">
        <van-button
          :disablad="!isEdit"
          @click="addChannel(item)"
          size="large"
          color="#f4f5f6"
        >{{item.name}}</van-button>
      </van-col>
    </van-row>
  </van-popup>
</template>

<script>
//导入获取用户频道  及 修改频道
import { getAllChannel, changeChannel } from "@/api/channel.js";

export default {
  name: "channel",
  //父组件传来的值
  props: ["show", "myList", "active"],

  model: {
    prop: "show",
    event: "change-show"
  },
  data() {
    return {
      allList: [],
      //默认不显示编辑状态
      isEdit: false,
      editText: "编辑"
    };
  },
  methods: {
    //点击频道推荐添加到添加 频道
    addChannel(item) {
      // console.log(item);
      this.myList.push(item);
    },
    // 编辑被点
    async doEdit() {
      // 判断当前状态是否为编辑状态，如果是，就保存数据
      if (this.isEdit) {
        //保存数据
        // 先切割掉推荐
        // slice方法：切割数组，参数1是从哪个下标开始截取，参数2是截取到哪个下标为止，如果不传代表截取到最后
        let channels = this.myList.slice(1).map((item, index) => {
          return {
            id: item.id,
            // 因为0是固定的推荐，所以我们的顺序应该从1开始，1开始就是+1
            seq: index + 1
          };
        });

        // 发请求
        let res = await changeChannel(channels);
      }

      this.isEdit = !this.isEdit;

      this.editText = this.isEdit ? "完成" : "编辑";

      //判断是不是非编辑状态
    },
    //删除
    doDel(item) {
      for (let i = 0; i < this.myList.length; i++) {
        if (this.myList[i].id == item.id) {
          //用数组来删除,不是用 [i]来删除
          this.myList.splice(i, 1);
          break;
        }
      }
    },
    //点击关闭保存
    async doClose() {
      this.$emit("change-show", false);
    }
  },
  computed: {
    //点击频道 计算是否又重复
    newList() {
      // let arr = [];

      // for (let i = 0; i < this.allList.length; i++) {
      //   //跪求打脸
      //   let flag = true;
      //   for (let j = 0; j < this.myList.length; j++) {

      //     if (this.allList[i].id == this.myList[j].id) {
      //       //不相等(重复 id )
      //       flag = false;
      //       break;
      //     }
      //   }
      //   if (flag) {
      //     //相等
      //     arr.push(this.allList[i]);
      //   }
      // }
      // return arr;

      //拿到所有频道的 id 组成新的数组
      let ids = this.myList.map(item => item.id);
      //相当于就是取反  判断ids中不包含某一个频道id 的话,就代表没有我的频道
      return this.allList.filter(item => !ids.includes(item.id));
    }
  },
  async created() {
    let res = await getAllChannel();
    // console.log(res);
    this.allList = res.data.data.channels;
  }
};
</script>

<style lang="less" scoped>
.van-popup {
  width: 100%;
  height: 100%;
  /* 内减盒子 */
  box-sizing: border-box;
  padding: 15px;

  .van-row {
    margin-bottom: 20px;

    .van-col {
      margin-bottom: 10px;

      .my-channel {
        position: relative;
        &.checked {
          .van-button__text {
            color: orangered;
          }
        }
        .van-icon {
          position: absolute;
          right: -5px;
          top: -5px;
        }
      }

      .van-button__text {
        color: black;
      }
    }
  }
  .two-row {
    font-size: 14px;
  }
}
</style>