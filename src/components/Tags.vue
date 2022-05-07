<template>
  <div v-for="tag in tags" :key="tag">
    <Tag @tag-posts="this.$emit('tag-posts', tag.name)" :tag="tag" />
  </div>
</template>

<script>
import Tag from "./Tag";
export default {
  name: "Tags",
  props: ["tags"],
  components: { Tag },
};
</script>

<style></style>
