<template>
  <van-cell-group>
    <van-nav-bar title="登录" />

    <!-- 表单  -->
    <form class="form-wrap">
      <van-cell-group>
        <van-field
          v-model="form.mobile"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
          :error-message="errorMsg"
          @blur="errorMsg=/0?(13|14|15|18|17)[0-9]{9}/.test(form.mobile) ? '' : '请输入正确的手机号' "
        />
        <van-field
          v-model="form.code"
          label="验证码"
          placeholder="请输入验证码"
          required
          :error-message="errorMsg2"
          @blur="errorMsg2=/^\d{6}$/.test(form.code) ? '' :'请输入正确6位数字'"
        />
      </van-cell-group>

      <!-- 登录按钮  类似于submit要阻止默认跳转 -->
      <van-button
        class="login-btn"
        @click.prevent="doLogin"
        color="linear-gradient(35deg, #641790, #a795ff)"
      >登录</van-button>
    </form>
  </van-cell-group>
</template>

<script>
//导入axios
// import axios from "axios";

//导入抽取出来做登录的请求模块
import { login } from "../../api/login.js";
//导入存储模块
import { setUser } from "../../utils/storage/";
//18801185985  13911111111 13800138000
export default {
  data() {
    return {
      errorMsg: "",
      errorMsg2: "",
      form: {
        mobile: "13800138000",
        code: ""
      }
    };
  },
  methods: {
    async doLogin() {
      //验证所有是不是符合规则
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.mobile)) {
        //不通过验证
        this.errorMsg = "请输入正确的手机号";
      }
      if (!/^\d{6}$/.test(this.form.code)) {
        //不通过验证
        this.errorMsg2 = "请输入正确6位数字";
      }
      //如果前面两个表单中的内容, 提示为空表示通过
      if (this.errorMsg == "" && this.errorMsg2 == "") {
        try {
          //得到 promise 对象用 await来修饰
          let res = await login(this.form);
          // console.log(res);

          //调用存储模块 token
          setUser(res.data.data);

          //跳转页面
          this.$router.push("/home");
        } catch {

          //弹出失败提示
          this.$toast.fail('手机号或验证码错误');
          // console.log(this);
          
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form-wrap {
  padding: 15px;
  margin-top:46px;
  .login-btn {
    width: 100%;
    border-radius: 10px;
    margin-top: 20px;
  }
}
</style>