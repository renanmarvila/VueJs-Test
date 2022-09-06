<template>
  <div class="flex items-center space-x-2">
    <div class="flex items-center overflow-hidden rounded">
      <input
        id="filter-search"
        :placeholder="$t('example-search')"
        :value="filter"
        @input="emitUpdate($event)"
        class="relative block w-full h-10 min-w-0 px-3 m-0 text-base font-normal text-gray-700 bg-white border-2  border-green-500 outline-none border-solid bg-clip-padding transition ease-in-out 
               focus:(text-gray-700 bg-white border-green-500 outline-none)"
        type="text"
      />
      <button
        class="flex bg-green-400 items-center inline-block space-x-2 h-10 px-6 text-xs text-black font-medium leading-tight uppercase transition duration-150 ease-in-out shadow-md 
               hover:(bg-green-500 shadow-lg) focus:(bg-green-500 shadow-lg ring-0) active:(shadow-lg bg-blue-800)"
        type="submit"
      >
        {{ $t('search') }}
      </button>
    </div>
    <p
      v-if="(route.query.name ?? '') !== filter"
      class="hidden text-sm text-green-500 dark:text-black lg:block"
    >
      {{ $t('refresh-alert') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const props = defineProps({
  filter: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:value']);

// Vue Modules
const route = useRoute();

/**
 * Emite um evento de atualização de valor para o componente pai
 * @param event Pesquisa por um evento de entrada
 */
const emitUpdate = (event: Event) => {
  emit('update:value', (<HTMLInputElement>event.target).value);
};
</script>
