<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        已经拥有账号？
        <router-link class="router-link" :to="{ name: 'Login' }"
          >登录</router-link
        >
      </p>
      <h2>创建FireBlogs账户</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="姓名" v-model="Name" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="用户名" v-model="username" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="邮箱" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="密码" v-model="password" />
          <password class="icon" />
        </div>
        <div v-if="error" class="error">{{this.errorMsg}}</div>
      </div>
      <button @click.prevent="register" >注册</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      Name: "",
      username: "",
      email: "",
      password: "",
      error: "",
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.Name !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth =await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          Name: this.Name,
          username: this.username,
          email: this.email,
        })
        this.$router.push({name:"Home"})
        return;
      }
      this.error = true;
      this.errorMsg = "请填写所有输入框！";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>