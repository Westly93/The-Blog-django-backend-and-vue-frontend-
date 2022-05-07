import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home";
import PostDetail from "../views/PostDetail";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Profile from "../views/Profile";

const routes = [
  {
    path: "",
    name: "posts",
    component: Home,
    beforeEnter(to, from, next) {
      if (store.state.posts.token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/posts/:id",
    name: "postDetail",
    component: PostDetail,
    props: true,
    beforeEnter(to, from, next) {
      if (store.state.posts.token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/sign-in",
    name: "login",
    component: SignIn,
    beforeEnter(to, from, next) {
      if (store.state.posts.token) {
        next({ name: "posts" });
      } else {
        next();
      }
    },
  },
  {
    path: "/sign-up",
    name: "register",
    component: SignUp,
    beforeEnter(to, from, next) {
      if (store.state.posts.token) {
        //console.log("positive");
        next({ name: "posts" });
      } else {
        //console.log(to);
        next();
      }
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter(to, from, next) {
      if (store.state.posts.token) {
        //console.log("positive");
        next();
      } else {
        //console.log(to);
        next({ name: "login" });
      }
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
