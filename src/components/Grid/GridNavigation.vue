<template>
  <div
    v-if="store.state.characterStore.info.pages > 1"
    class="flex items-center justify-center my-4 space-x-2 text-2xl"
  >
    <div class="flex items-center space-x-2">
      <button
        class="navigation-chevron"
        :disabled="canNavigate(-1)"
        @click="navigate(-1)"
        :aria-label="$t('navigate-left')"
      >
        <icon-mdi-chevron-left />
      </button>
    </div>
    <span>{{ currentPage }}</span>
    <div class="flex items-center space-x-2">
      <span>&nbsp;/ {{ store.state.characterStore.info.pages }}</span>
      <button
        class="navigation-chevron"
        :disabled="canNavigate(1)"
        @click="navigate(1)"
        :aria-label="$t('navigate-right')"
      >
        <icon-mdi-chevron-right />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['navigate']);

// Vue Modules
const store = useStore();

/**
 * Returns se a navegação pra próxima página está disponível/é possível
 * @param pageOffset 
 * @returns apenas se a navegação pra proxima página está disponível
 */
const canNavigate = (pageOffset: number) => {
  const n = props.currentPage + pageOffset;
  return n < 1 || n > store.state.characterStore.info.pages;
};

/**
 * Emite um update pro componente pai se a navegação for possível
 * @param pageOffset 
 */
const navigate = (pageOffset: number) => {
  if (canNavigate(pageOffset)) return;
  emit('navigate', props.currentPage + pageOffset);
};
</script>

<style scoped>
.navigation-chevron {
  @apply leading-none h-7.2 w-7.2 bg-white rounded-full bg-opacity-20 disabled:(bg-opacity-5 cursor-default) dark:(bg-black bg-opacity-20 hover:bg-opacity-40 disabled:bg-opacity-10);
}
</style>
