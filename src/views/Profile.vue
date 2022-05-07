<template>
  <div v-if="getProfile" class="user-profile">
    <img :src="`http://127.0.0.1:8000${getProfile.thumbnail}`" alt="" />
    <div class="profile-info">
      <form>
        <legend>Update your profile</legend>
        <div class="form-group">
          <label>Bio</label>
          <textarea v-model="getProfile.bio" cols="70" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>City</label>
          <input v-model="getProfile.city" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Address</label>
          <input
            v-model="getProfile.address"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>state</label>
          <input v-model="getProfile.state" type="text" class="form-control" />
        </div>
        <button>Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Profile",
  computed: mapGetters(["getProfile"]),
  methods: {
    ...mapActions(["myProfile"]),
  },
  data() {
    return {
      profile: {
        bio: "",
        city: "",
        state: "",
        address: "",
      },
    };
  },
  created() {
    this.myProfile();
  },
};
</script>

<style scoped>
.user-profile {
  margin: 60px auto;
  width: 600px;
  background: #eee;
}
.user-profile img {
  border-radius: 50%;
  margin: 20px 40%;
}
.profile-info legend {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
}

.form-group {
  margin: 20px 0;
  padding: 20px;
}
.form-group label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  margin-bottom: 10px;
}
.form-control {
  padding: 8px 12px;
  width: 90%;
  border: 1px #156 solid;
  border-radius: 5px;
}
.form-control:focus {
  outline: none;
}
.form-group textarea {
  border: 1px #156 solid;
  border-radius: 5px;
}
.form-group textarea:focus {
  outline: none;
}
button {
  padding: 5px 15px;
  margin: 10px 45%;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: #156;
  color: #aaa;
}
</style>
