<template>
  <div class="post-update">
    <form @submit.prevent="updPost" class="update-form">
      <div class="form-group">
        <label>Title</label>
        <input class="form-control" type="text" v-model="title" />
      </div>
      <div class="form-group">
        <label>Body</label>
        <input class="form-control" type="text" v-model="body" />
      </div>
      <div class="footer">
        <button class="btn btn-success">Save</button>
        <button @click="this.$emit('toggle-edit-post')" class="btn btn-danger">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditForm",
  props: ["post"],
  components: {},
  data() {
    return {
      title: this.post.title,
      body: this.post.body,
    };
  },
  methods: {
    ...mapActions(["updatePost"]),
    updPost() {
      if (!this.title) {
        alert("Please provide the title");
        return;
      }
      if (!this.body) {
        alert("Please provide the body");
        return;
      }
      const updatedPost = {
        id: this.post.id,
        title: this.title,
        body: this.body,
      };
      //console.log(updatedPost);
      this.updatePost(updatedPost);
      this.$emit("edit-post");
    },
  },
};
</script>

<style scoped>
.update-form legend {
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 400;
  border-bottom: 1px #333 solid;
  text-align: center;
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
  border: none;
  padding: 10px 12px;
  border-bottom: 1px #333 solid;
}
.footer {
  text-align: right;
}
.btn {
  padding: 4px 12px;
  margin: 10px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #aaa;
}
.btn-success {
  background: rgb(2, 71, 29);
}
.btn-danger {
  background: #612;
}
</style>
