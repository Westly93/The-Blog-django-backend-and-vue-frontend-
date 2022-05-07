<template>
  <div class="navbar">
    <div class="container">
      <div class="logo">
        <p>Weston<span>Mf</span></p>
        <router-link v-if="token" :to="{ name: 'posts' }">Posts</router-link>
      </div>

      <div class="navbar-nav">
        <li v-if="!token" class="nav-item">
          <router-link :to="{ name: 'register' }" class="nav-link"
            >SignUp</router-link
          >
        </li>

        <li v-if="!token" class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link"
            >Sign In</router-link
          >
        </li>
        <li v-if="token" class="nav-item">
          <router-link :to="{ name: 'profile' }" class="nav-link"
            >Profile</router-link
          >
        </li>
        <button v-if="token" @click="logoutUser">Logout</button>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  computed: mapGetters(["token"]),
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logoutUser"]),
  },
  created() {},
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.logo p {
  color: #bbb;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.5rem;
  font-weight: 400;
}
.logo span {
  color: #156;
}
.navbar {
  height: 60px;
  margin: 0 auto;
  background: rgb(1, 53, 31);
}
.container {
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;
  margin: 0 auto;
  width: 1100px;
  top: sticky;
}
.navbar-nav {
  display: flex;
  justify-content: space-evenly;
}
.nav-item {
  list-style: none;
  padding: 10px 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.nav-link {
  color: #bbb;
  text-decoration: none;
  margin-top: 4px;
  transition: 0.5s;
}

.nav-link:hover {
  color: #156;
  border-bottom: 1px #333 solid;
  transition: 0.5s;
}
button {
  padding: 4px 12px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  background: transparent;
  color: #bbb;
  transition: 0.5s;
}
button:hover {
  background: #156;
  transition: 0.5s;
}
.logo a {
  text-decoration: none;
  color: #bbb;
  transition: 0.5s;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-left: 10px;
  margin-top: 8px;
}
.logo {
  display: flex;
}
@media (max-width: 700px) {
  .container {
    width: 100%;
  }
}
</style>
