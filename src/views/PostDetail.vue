<template>
  <div v-if="getPost" class="post-detail">
    <h3>{{ getPost.title }}</h3>
    <p>{{ getPost.body }}</p>
    <div class="post-tags">
      <span v-for="tag in getPost.tags" :key="tag.id">#{{ tag.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import Post from "../components/Post";
export default {
  name: "PostDetail",
  components: { Post },
  props: ["id"],
  data() {
    return {};
  },
  computed: mapGetters(["getPost"]),
  methods: {
    ...mapActions(["fetchPost"]),
  },
  mounted() {
    this.fetchPost(this.id);
  },
};
</script>

<style scoped>
.post-detail {
  background: #fff;
  color: #333;
  width: 80%;
  margin: 100px auto;
  padding: 40px;
  border-radius: 20px;
  background: #eee;
}
.post-detail h3 {
  letter-spacing: 1px;
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
  text-transform: uppercase;
}
.post-detail p {
  margin-bottom: 40px;
  font-style: italic;
  font-size: 1rem;
  line-height: 20px;
}
.post-tags span {
  margin: 20px 12px;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 14px;
  background: #7c5;
  transition: 0.5s;
  border-radius: 20px;
}
.post-tags span:hover {
  color: #47c;
  transition: 0.5s;
}
</style>
