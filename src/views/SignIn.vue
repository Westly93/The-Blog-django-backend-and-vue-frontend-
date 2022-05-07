<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <legend>Sign in Now</legend>
      <div class="error-block" v-if="getLoginErrors">
        <strong v-for="error in getLoginErrors" :key="error"
          ><li>{{ error }}</li>
        </strong>
      </div>
      <div class="form-group">
        <label>Username</label>
        <input
          type="text"
          class="form-control"
          placeholder="WestonMf"
          v-model="user.username"
          required
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          required
          v-model="user.password"
        />
      </div>
      <a href="">Forgot your password?</a>
      <button class="btn btn-success">Sign In</button>
      <p>
        You dont have an Account?
        <router-link :to="{ name: 'register' }">Sign Up</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignIn",
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: mapGetters(["getLoginErrors"]),
  methods: {
    ...mapActions(["loginUser"]),
    login() {
      this.loginUser(this.user);
      this.$router.push({ name: "posts" });
    },
  },
  created() {},
};
</script>

<style scoped>
.login-form {
  width: 600px;
  margin: 60px auto;
  padding: 40px;
  color: #333;
}
.form-group {
  margin: 20px 0;
}
.form-group label {
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  display: block;
}
.form-control {
  width: 100%;
  padding: 10px 14px;
  border: none;

  font-size: 14px;
  display: inline-block;
}
.form-control:focus {
  outline: none;
  border-bottom: 1px #bbb solid;
}
legend {
  font-size: 1.4rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 40px;
  text-align: center;
}
.btn {
  border: none;
  margin: 20px auto;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  padding: 10px 12px;
  border-radius: 20px;
  cursor: pointer;
}
.btn-success {
  background: rgb(2, 71, 29);
  color: #fff;
}
.error-block {
  color: red;
  text-align: center;
  letter-spacing: 1px;
  font-size: 0.9rem;
}
</style>
