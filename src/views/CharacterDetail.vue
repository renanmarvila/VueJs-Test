<template>
  <div class="w-max mx-auto" v-if="character">
    <div class="flex items-center">
      <div>
        <button
          @click="goBack()"
          class="flex items-center space-x-1 border-b border-transparent hover:border-white dark:hover:border-black"
        >
          <icon-mdi-arrow-left />
          <p>{{ $t('return-to-list') }}</p>
        </button>
        <h1 class="mt-1 mb-8 text-3xl sm:text-5xl">
          <span class="char-label">#{{ character.id }}</span>
          {{ character.name }}
        </h1>
      </div>
      <CharacterImage
        class="hidden sm:block lg:hidden w-30 h-30 ml-8"
        :image="character.image"
        :name="character.name"
      />
    </div>
    <div class="block sm:(flex items-center)">
      <CharacterImage
        class="block sm:hidden lg:block rounded-full w-40 h-40 sm:(w-50 h-50)"
        :image="character.image"
        :name="character.name"
      />
      <div
        class="grid max-w-150 grid-cols-1 gap-1 sm:(grid-cols-2 gap-4) lg:(grid-cols-3 ml-8)"
      >
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('species') }}</label>
          <p class="text-xl">{{ formatAttribute(character.species) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('origin') }}</label>
          <p class="text-xl">{{ formatAttribute(character.origin.name) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('location') }}</label>
          <p class="text-xl">{{ formatAttribute(character.location.name) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('gender') }}</label>
          <p class="text-xl">{{ $t(character.gender.toLocaleLowerCase()) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('status') }}</label>
          <p class="text-xl">{{ $t(character.status.toLocaleLowerCase()) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('type') }}</label>
          <p class="text-xl">{{ formatAttribute(character.type) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('episodes') }}</label>
          <p class="text-xl">{{ character.episode.length }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('created') }}</label>
          <p class="text-xl">{{ new Date(character.created).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center px-10">
    <div class="text-center mt-25">
      <h1 class="text-3xl font-bold">{{ $t('error') }} !</h1>
      <h1 class="mb-4 text-2xl">{{ $t('character-not-found') }}</h1>
      <router-link to="/">
        <p class="mx-auto text-xl border-b border-white dark:border-black w-max">
          {{ $t('return-to-list') }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useTitle } from '@vueuse/core';
import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ICharacter } from '../types/character';

// Vue Modules
const store = useStore();
const router = useRouter();
const i18n = useI18n();

const characterId = Number(router.currentRoute.value.params.id);

// Data
const character: ComputedRef<ICharacter | undefined> = computed(() =>
  store.getters.getStoredCharacterById(characterId)
);

/**
 * Retorna o atributo ou a tradução de 'unknown' se for undefined
 * @param att atributo do personagem
 * @returns atribute ou 'unknown'
 */
const formatAttribute = (att: string) => {
  if (!att || att === 'unknown') return i18n.t('unknown');
  return att;
};

/**
 * Navega para a página anterior do app
 * Se não tiver página anterior disponível, volta pra lista de personagens (home)
 */
const goBack = () => {
  if (!router.options.history.state.back) {
    router.push({ path: '/characters' });
    return;
  }
  router.go(-1);
};

store.dispatch('fetchCharacterById', { id: characterId });

const title = computed(() => {
  return character.value?.name + ' - ' + i18n.t('app_name');
});
useTitle(title);
</script>

<style scoped>
.char-label {
  @apply text-white text-opacity-50 dark:(text-black text-opacity-70);
}
</style>
