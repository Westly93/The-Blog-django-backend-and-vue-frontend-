<template>
  <div class="main-container">
    <div class="container">
      <h1>Welcome to the blog app</h1>
      <button
        :class="{ 'show-add-post': showAddPost }"
        @click="toggleShowAddPost"
      >
        {{ msg }}
      </button>
      <AddPost v-if="showAddPost" />
      <div>
        <Posts />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Posts from "../components/Posts";
import AddPost from "../components/AddPost";
import Tags from "../components/Tags";
export default {
  name: "Home",
  components: { Posts, AddPost, Tags },
  data() {
    return {
      err: "",
      tags: null,
      showAddPost: false,
      msg: "Add Post",
    };
  },
  methods: {
    toggleShowAddPost() {
      this.showAddPost = !this.showAddPost;
      if (this.showAddPost) {
        this.msg = "Close";
      } else {
        this.msg = "Add Post";
      }
    },
  },

  created() {},
  mounted() {
    //this.getTags();
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  position: relative;
  max-width: 90vw;
}
.add-post {
  width: 300px;
  margin: 60px 20px;
  padding: 20px;
}
.container {
  width: 90%;
  margin: 60px 20px;
  padding: 20px;
  position: relative;
}
h1 {
  text-align: center;
  margin-bottom: 60px;
  color: #333;
  letter-spacing: 1px;
  font-weight: 400;
  font-size: 1.6rem;
  text-transform: uppercase;
}
.tags {
  margin: 60px auto;
  width: 200px;
}
.tags h3 {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 300;
  color: #333;
  text-align: center;
}
.tag-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.container button {
  position: absolute;
  right: 20px;
  top: 80px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
}
.show-add-post {
  background: #612;
  color: #aaa;
}
</style>
