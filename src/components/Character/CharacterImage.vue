<template>
  <div>
    <img
      :src="props.image"
      :alt="$t('picture_of') + props.name"
      class="rounded-full"
      width="250"
      height="250"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>
