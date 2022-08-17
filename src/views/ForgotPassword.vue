<template>
  <div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          已经拥有账号？
          <router-link class="router-link" :to="{ name: 'Login' }"
            >登录</router-link
          >
        </p>
        <h2>修改密码</h2>
        <p>忘记密码？请输入邮箱完成更改</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="邮箱" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword" >重置</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: null,
      modalActive: false,
      modalMessage: "",
      loading: null,
    };
  },
  components: {
    email,
    Modal,
    Loading,
  },
  methods: {
    resetPassword(){
      this.loading = true;
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        this.modalMessage = "如果您的账号已注册，您将收到一封邮件";
        this.loading = false;
        this.modalActive = true;
      }).catch(err => {
        this.modalMessage = err.message;
        this.loading = false;
        this.modalActive = true;
      });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>