<template>
  <div v-if="allPosts.length">
    <div v-for="post in allPosts" :key="post.id">
      <Post :post="post" :profile="getProfile" />
    </div>
  </div>
  <div v-else>Loading....</div>
</template>

<script>
import { computed } from "vue";
import { mapGetters, mapActions } from "vuex";
import Post from "./Post";
export default {
  name: "Posts",
  components: {
    Post,
  },
  data() {
    return { posts: [] };
  },
  computed: mapGetters(["allPosts", "getProfile"]),
  methods: {
    ...mapActions(["fetchPosts", "myProfile"]),
  },
  created() {
    this.fetchPosts();
    this.myProfile();
  },
};
</script>

<style></style>
