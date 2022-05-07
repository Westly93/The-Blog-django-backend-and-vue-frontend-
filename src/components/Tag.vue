<template>
  <span @click="this.$emit('tag-posts', tag.name)">#{{ tag.name }}</span>
</template>

<script>
export default {
  name: "Tag",
  props: ["tag"],
};
</script>

<style scoped>
span {
  margin: 6px 8px;
  color: #333;
  transition: 0.5s;
  cursor: pointer;
}
span:hover {
  color: #156;
  transition: 0.5s;
}
</style>
