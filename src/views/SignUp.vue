<template>
  <div class="signup-form">
    <form @submit.prevent="register">
      <legend>Join Today</legend>
      <div v-if="getRegistrationErrors.username" class="pass-error">
        <li v-for="err in getRegistrationErrors.username" :key="err">
          <small>{{ err }}</small>
        </li>
      </div>
      <div class="form-group">
        <label>Username</label>
        <input
          type="text"
          class="form-control"
          required
          placeholder="admin"
          v-model="user.username"
        />
      </div>
      <div v-if="getRegistrationErrors.email" class="pass-error">
        <li v-for="err in getRegistrationErrors.email" :key="err">
          <small>{{ err }}</small>
        </li>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          required
          placeholder="admin@example.com"
          v-model="user.email"
        />
      </div>
      <div v-if="getRegistrationErrors.password1" class="pass-error">
        <li v-for="err in getRegistrationErrors.password1" :key="err">
          <small>{{ err }}</small>
        </li>
      </div>
      <div v-if="getRegistrationErrors.non_field_errors" class="pass-error">
        <li v-for="err in getRegistrationErrors.non_field_errors" :key="err">
          <small>{{ err }}</small>
        </li>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          required
          v-model="user.password1"
        />
      </div>
      <div class="form-group">
        <label>Confirm password</label>
        <input
          type="password"
          class="form-control"
          required
          v-model="user.password2"
        />
      </div>
      <button class="btn btn-primary">register</button>
      <p class="login-link">
        Already have an account?
        <router-link :to="{ name: 'login' }">Sign In</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignUp",
  components: {},
  computed: mapGetters(["getRegistrationErrors"]),
  data() {
    return {
      user: {
        username: "",
        email: "",
        password1: "",
        password2: "",
      },
    };
  },
  methods: {
    ...mapActions(["addUser"]),
    register() {
      this.addUser(this.user);
    },
  },
};
</script>

<style scoped>
.signup-form {
  width: 600px;
  margin: 60px auto;
  padding: 40px;
  color: #333;
}
legend {
  font-size: 1.4rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 40px;
  text-align: center;
}
.form-group {
  margin: 20px auto;
}
.form-group label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  font-weight: 300;
}
.form-control {
  width: 100%;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
}
.form-control:focus {
  outline: none;
  border-bottom: 1px #bbb solid;
}
.btn {
  padding: 8px 12px;
  width: 100%;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.btn-primary {
  background: #161;
  border-radius: 5px;
}
.login-link {
  margin-top: 20px;
  border-top: 1px #bbb solid;
}
.pass-error {
  color: red;
  font-weight: 600;
  margin: 10px 30px;
}
</style>
