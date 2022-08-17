<template>
  <div class="admin">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="container">
      <div class="admin-info">
        <h2>添加管理员</h2>
        <div class="input">
          <input
            placeholder="输入要被设置为管理员的用户邮箱"
            type="text"
            id="addAdmins"
            v-model="adminEmail"
          />
        </div>
        <span>{{ functionMsg }}</span>
        <button @click="addAdmin" class="button">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
import db from "../firebase/firebaseInit";
import "firebase/auth";
export default {
  name: "Admin",
  components: {
    Modal,
    Loading,
  },
  data() {
    return {
      adminEmail: "",
      functionMsg: null,
      loading: null,
      modalActive: false,
      modalMessage: "",
    };
  },
  methods: {
    async addAdmin() {
      this.loading = true;
      db.collection("users")
        .where("email", "==", this.adminEmail)
        .get()
        .then((data, uid) => {
          let doc = data.docs[0];
          if (doc.data.isAdmin === true) {
            this.functionMsg = "用户已经是管理员";
            db.collection("users").doc(uid).update({
              isAdmin: true,
            });
            this.loading = false;
            this.modalActive = true;
            this.modalMessage = `已经成功将邮箱${this.adminEmail}为管理员!`;
            return new Promise(() => {});
          }
        })
        .catch((err) => {
          this.functionMsg = "无法查询到该用户！";
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },
    closeModal() {
    this.modalActive = !this.modalActive;
    this.adminEmail = "";
  },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      text-align: center;
      span {
        font-size: 14px;
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>