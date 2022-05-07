<template>
  <form @submit.prevent="newPost" class="post-form">
    <div class="form-group">
      <label>Title</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter title here"
        v-model="title"
        name="title"
        required
      />
    </div>
    <div class="form-group">
      <label>Body</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter body here"
        v-model="body"
        name="body"
        required
      />
    </div>
    <div class="form-group">
      <label>Tags</label>
      <input
        type="text"
        class="form-control"
        placeholder="Press alt + , to add another tag"
        v-model="tempTag"
        @keyup.alt="addTags"
      />
      <div class="all-tags">
        <span v-for="tag in tags" :key="tag">#{{ tag }}</span>
      </div>
    </div>
    <button class="submit-btn">Save</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddPost",
  components: {},
  methods: {
    ...mapActions(["addPost"]),
    newPost() {
      if (!this.title) {
        console.log("please enter the post title");
        return;
      }
      if (!this.body) {
        console.log("please enter the body");
        return;
      }
      const post = {
        title: this.title,
        body: this.body,
        tags: this.tags,
      };
      this.addPost(post);
      //console.log(newPost);
      this.title = "";
      this.body = "";
      this.tags = [];
    },
    addTags(e) {
      if (e.key === "," && this.tempTag) {
        this.tags.push(this.tempTag);
        this.tempTag = "";
      }
    },
  },
  data() {
    return {
      tempTag: "",
      body: "",
      title: "",
      tags: [],
    };
  },
};
</script>

<style scoped>
.post-form {
  color: #333;
}
.form-group {
  margin-top: 10px;
  margin: 20px auto;
}
.form-group label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.form-control {
  width: 90%;
  padding: 10px 12px;
  border: none;
}
.form-control:focus {
  outline: none;
  border: 1px #156 solid;
  border-radius: 5px;
}
.submit-btn {
  padding: 6px 15px;
  cursor: pointer;
  border-radius: 5px;
  background: #156;
  border: none;
}
</style>
