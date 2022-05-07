import axios from "axios";
import router from "@/router";

const state = {
  posts: [],
  post: null,
  profile: null,
  token: window.localStorage.getItem("token"),
  loginErrors: [],
  registrationErrors: [],
};
const getters = {
  getProfile: (state) => state.profile,
  allPosts: (state) => state.posts,
  getPost: (state) => state.post,
  token: (state) => state.token,
  getLoginErrors: (state) => state.loginErrors,
  getRegistrationErrors: (state) => state.registrationErrors,
};

const actions = {
  //GET LOGGED IN USER PROFILE
  async myProfile({ commit, state }) {
    const response = await fetch("http://127.0.0.1:8000/accounts/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + String(state.token),
      },
    });
    if (response.status === 200) {
      let data = await response.json();
      commit("setProfile", data);
    }
  },
  // CREATING NEW USERB ACTION
  async addUser({ commit }, user) {
    const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    //console.log(response);
    if (response.status === 200) {
      let data = await response.json();
      commit("newUser", data);
      router.push({ name: "login" });
    } else if (response.status === 400) {
      let data = await response.json();
      //console.log(data);
      commit("setRegistrationErrors", data);
    }
  },
  //LOGIN USER BY ACQUIRING THE TOKEN FROM THE API
  async loginUser({ commit }, user) {
    const res = await fetch("http://127.0.0.1:8000/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    //console.log(res);
    if (res.status === 200) {
      const data = await res.json();
      //console.log(data.key);
      commit("newToken", data.key);
      router.push({ name: "posts" });
    } else {
      const data = await res.json();
      //console.log(data.non_field_errors);
      commit("setLoginErrors", data.non_field_errors);
    }
  },
  //LOGOUT USER BY DELETING THE TOKEN FROM THE LOCAL STORAGE ACTION
  async logoutUser({ commit }) {
    commit("removeToken");
    router.push({ name: "login" });
  },
  //LIKE POST ACTION
  async likePost({ commit, state }, id) {
    const res = await fetch(`http://127.0.0.1:8000/blog/post/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + String(state.token),
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      commit("updatePost", data);
    }
  },
  //DISLIKE POST ACTION
  async dislikePost({ commit, state }, id) {
    const res = await fetch(`http://127.0.0.1:8000/blog/post/${id}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + String(state.token),
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      commit("updatePost", data);
    }
  },
  // FETCHING ALLL POST FORM THE API ACTION
  async fetchPosts({ commit, state }) {
    //console.log(state.token);
    const response = await fetch("http://127.0.0.1:8000/blog/post/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + String(state.token),
      },
    });
    const data = await response.json();
    commit("setPosts", data);
  },
  //FETCHING A SINGLE POST FROM THE API
  async fetchPost({ commit, state }, id) {
    const response = await fetch(`http://127.0.0.1:8000/blog/post/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + String(state.token),
      },
    });
    if (response.status === 200) {
      let data = await response.json();
      commit("setPost", data);
    } else {
      console.log("Ooops couldnot find the data requested!");
    }
  },
  //UPDATE POST
  async updatePost({ commit, state }, updPost) {
    const response = await fetch(
      `http://127.0.0.1:8000/blog/post/${updPost.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + String(state.token),
        },
        body: JSON.stringify(updPost),
      }
    );
    //console.log(response);
    if (response.status === 200) {
      let data = await response.json();
      commit("updatePost", updPost);
    } else {
      let data = await response.json();
      console.log(data);
    }
  },
  // DELETING POST ACTION
  async deletePost({ commit, state }, id) {
    //console.log(token);
    if (confirm("Are you sure you want to delete the post?")) {
      const response = await fetch(`http://127.0.0.1:8000/blog/post/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + String(state.token),
        },
      });
      //console.log(response);
      if (response.status === 204) {
        commit("removePost", id);
        console.log("Deleted successfully!");
      } else {
        console.log("Oops something went wrong!");
      }
    }
  },
  // ADDING POST ACTION
  async addPost({ commit, state }, post) {
    const response = await fetch("http://127.0.0.1:8000/blog/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + String(state.token),
      },
      body: JSON.stringify(post),
    });
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      commit("newPost", data);
    } else {
      console.log("Error occured adding the post!");
    }
  },
};
const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setPost: (state, post) => (state.post = post),
  newPost: (state, post) => state.posts.unshift(post),
  setProfile: (state, profile) => (state.profile = profile),
  newToken: (state, data) => {
    state.token = data;
    window.localStorage.setItem("token", data);
  },
  setRegistrationErrors: (state, errs) => (state.registrationErrors = errs),
  setLoginErrors: (state, err) => (state.loginErrors = err),
  removeToken: (state) => {
    state.token = null;
    window.localStorage.removeItem("token");
  },
  updatePost: (state, updPost) => {
    const index = state.posts.findIndex((post) => post.id === updPost.id);
    if (index !== -1) {
      state.posts.splice(index, 1, updPost);
    }
  },
  removePost: (state, id) =>
    (state.posts = state.posts.filter((post) => post.id !== id)),
  //setToken: (state, token) => (state.token = token),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
