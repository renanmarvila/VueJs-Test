<template>
  <div
    id="list"
    v-if="!store.state.characterStore.error"
    class="grid grid-cols-2 gap-8 mx-auto mt-4 w-max place-items-stretch sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
  >
    <GridCharacterCard
      v-if="characters.length > 0"
      v-for="c in characters"
      :key="c.id"
      :id="c.id"
      :name="c.name"
      :status="c.status.toLowerCase()"
      :imageURL="c.image"
      class="transit-opacity"
    ></GridCharacterCard>
  </div>
  <div class="items-center flex-grow mx-auto my-20 text-center min-w-75vw" v-else>
    <p class="text-xl font-bold">{{ $t('no-result') }}</p>
    <p class="text-lg">{{ $t('try-different-query') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

// Vue Modules
const store = useStore();

const props = defineProps({
  characters: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.transit-opacity {
  -webkit-animation: fadeInFromNone 0.5s ease-out;
  -moz-animation: fadeInFromNone 0.5s ease-out;
  -o-animation: fadeInFromNone 0.5s ease-out;
  animation: fadeInFromNone 0.5s ease-out;
}

@-webkit-keyframes fadeInFromNone {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}

@-moz-keyframes fadeInFromNone {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}

@-o-keyframes fadeInFromNone {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}

@keyframes fadeInFromNone {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}
</style>
