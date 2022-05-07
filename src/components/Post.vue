<template>
  <div class="post-info">
    <EditPost
      @edit-post="this.editPost = !this.editPost"
      v-if="editPost"
      :post="post"
    />
    <div v-else>
      <div class="user-info">
        <img :src="`http://127.0.0.1:8000${post.thumbnail_url}`" />
        <div>
          <h4>{{ post.author.username }}</h4>
          <small> {{ post.date_posted }}</small>
        </div>
      </div>
      <router-link :to="{ name: 'postDetail', params: { id: post.id } }">
        <h3>{{ post.title }}</h3>
      </router-link>
      <p>{{ snippet }}</p>
      <div class="post-tags">
        <span v-for="tag in post.tags" :key="tag.id">#{{ tag.name }}</span>
      </div>
      <div class="footer">
        <div class="like-post">
          <button
            :class="{ 'btn-like': isLike.length }"
            @click="like"
            class="btn"
          >
            Like({{ post.likes_count }})
          </button>
          <button
            :class="{ 'btn-dislike': isDislike.length }"
            @click="dislikePost(post.id)"
            class="btn"
          >
            Dislike({{ post.dislikes_count }})
          </button>
        </div>

        <div
          v-if="profile.user.username === post.author.username"
          class="edit-post"
        >
          <button
            @click="this.editPost = !this.editPost"
            class="btn btn-success"
          >
            Edit
          </button>
          <button @click="deletePost(post.id)" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import EditPost from "./EditPost";
import { computed } from "vue";
export default {
  name: "Post",
  components: { EditPost },
  props: ["post", "profile"],
  data() {
    return {
      editPost: false,
    };
  },

  methods: {
    ...mapActions(["deletePost", "likePost", "dislikePost"]),
    like() {
      this.likePost(this.post.id);
      //this.isLike = !this.isLike;
    },
  },
  setup(props) {
    const snippet = computed(() => {
      return props.post.body.substring(0, 200) + "....";
    });
    const isLike = computed(() => {
      return props.post.likes.filter((like) => {
        if (like.username === props.profile.user.username) return true;
      });
    });
    const isDislike = computed(() => {
      return props.post.dislikes.filter((dislike) => {
        if (dislike.username === props.profile.user.username) return true;
      });
    });
    return { snippet, isLike, isDislike };
  },
  mounted() {},
  created() {},
};
</script>
<style scoped>
.post-info {
  max-width: 100%;
  padding: 20px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.8);
}
.post-info a,
h3 {
  color: #333;
  margin-bottom: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 300;
  text-decoration: none;
  transition: 0.5s;
  text-align: center;
  font-size: 1rem;
}
.post-info h3:hover {
  color: #47c;
  transition: 0.5s;
}
.post-info p {
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
}
.post-tags span {
  background: #7c5;
  cursor: pointer;
  padding: 5px 10px;
  margin: 3px 10px;
  border-radius: 20px;
  transition: 0.5s;
  color: #333;
}
.post-tags span:hover {
  color: #47c;
  transition: 0.5s;
}

.post-info a:hover {
  color: #47c;
  transition: 0.5s;
}
.footer {
  display: flex;
  position: relative;
  margin-top: 50px;
}
.edit-post {
  position: absolute;
  right: 0;
  bottom: 0;
}
.like-post {
  position: absolute;
  left: 0;
  bottom: 0;
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
.user-info {
  display: flex;
  border-bottom: 1px #aaa solid;
}
.user-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-info div {
  margin-left: 20px;
  text-align: center;
}
.user-info h4 {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 5px;
  margin-top: 5px;
}
.user-info small {
  color: #333;
}
.btn-like {
  background: rgba(4, 119, 48, 0.979);
}
.btn-dislike {
  background: rgb(100, 4, 15);
}
</style>
