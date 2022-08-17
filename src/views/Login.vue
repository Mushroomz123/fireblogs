<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        还没有账号？
        <router-link class="router-link" :to="{ name: 'Register' }"
          >注册</router-link
        >
      </p>
      <h2>登录FireBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="邮箱" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="密码" v-model="password" />
          <password class="icon" />
        </div>
        <div v-if="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >忘记密码</router-link
      >
      <button @click.prevent="signIn" >登录</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Login",
  components: {
    email,
    password,
  },
  data() {
    return {
      email: null,
      password: null,
      error: "",
      errorMsg: "",
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Home" });
          this.error = false;
          this.errorMsg = "";
        }).catch(err => {
          this.error = true;
          this.errorMsg = err.message;
        });
    },
  },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: black;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 1rem;
          position: absolute;
          left: 8px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: black;
      cursor: pointer;
      font-size: 14px;
      margin: 12px 0;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;
      &:hover {
        border-color: #303030;
      }
    }

    button {
      margin-top: 12px;
      width: 120px;
    }

    .angle {
      display: none;
      position: absolute;
      transform: rotate(3deg);
      background-color: #fff;
      width: 60px;
      right: -30px;
      height: 102vh;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url("../assets/background.png");
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>