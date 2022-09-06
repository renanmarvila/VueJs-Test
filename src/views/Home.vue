<template>
  <div class="mx-auto">
    <div class="mx-auto w-min">
      <form
        class="relative items-center block space-y-2 md:(flex space-y-0)"
        @keydown.enter.prevent="goToPage(1, nameFilter)"
        @submit.prevent="goToPage(1, nameFilter)"
      >
        <div class="absolute space-y-2 left-0 -top-7">
          <label for="filter-search">{{ $t('search-by-name') }} : </label>
        </div>
        <GridFilterSearch
          :filter="nameFilter"
          v-model:value="nameFilter"
        ></GridFilterSearch>
        <div class="flex-grow" />
        <div class="block space-y-2 xs:(flex space-y-0)">
          <button
            v-if="isFiltering()"
            class="flex items-center text-black bg-green-400 rounded-full whitespace-nowrap md:ml-4 mr-4 pr-3 pl-2 py-0.5 hover:bg-green-500"
            @click="resetFilter"
          >
            <icon-mdi-broom class="leading-none rounded-full" /> {{ $t('clear-filter') }}
          </button>
          <GridFilterStatus
            :filter="statusFilter"
            v-model:value="statusFilter"
            @update-status="updateStatus($event)"
          ></GridFilterStatus>
        </div>
      </form>
      <GridCharacterList :characters="characterList"></GridCharacterList>
    </div>
    <GridNavigation
      :current-page="currentPage"
      @navigate="goToPage($event)"
    ></GridNavigation>
  </div>
</template>

<script setup lang="ts">

import { useTitle } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { LocationQueryRaw, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { APIParams } from '../types/interfaces';

// Vue Modules
const store = useStore();
const router = useRouter();
const i18n = useI18n();

// Informações
const characterList = computed(() => store.state.characterStore.characters);

// Filtros
const statusFilter = ref('');
const nameFilter = ref('');
const currentPage = ref(1);

/**
 * Recupera o número da página do URL da página, se não for um número, envia de volta para a primeira página
 * @returns número da página nova ou undefined
 */
const computePageNumber = (): number | undefined => {
  const pageNb = Number(router.currentRoute.value.query.page);
  if (!pageNb) return undefined;
  if (isNaN(pageNb)) {
    goToPage(1);
    return 1;
  }
  return pageNb;
};

/**
 * Chama os dados pela API e leva os dados pra store
 * @param params Query parameters (nome, status, número da página)
 */
const loadData = (params: APIParams) => {
  store.dispatch('fetchCharacters', params);
};

/**
 * Manipulador para atualização de status do StatusComponent
 * Define o status e navega para a primeira página
 * @param event novo status a ser definido
 */
const updateStatus = (event: string) => {
  statusFilter.value = event;
  goToPage(1);
};

/**
 * É a lista sendo filtrado pelo status do personagem ou seu nome
 * @returns status filtrado
 */
const isFiltering = () => {
  return statusFilter.value !== '' || nameFilter.value !== '';
};

/**
 * Reseta o filtro de nome e status e então volta pra primeira página
 */
const resetFilter = () => {
  statusFilter.value = 'reset';
  nameFilter.value = '';
  goToPage(1);
};

/**
 * Atualiza os parametros URL para bater com o filtro
 * @param pageNb novo número de página
 * @param search valor pelo filtro de nome
 */
const goToPage = (pageNb: number, search: string | undefined = undefined) => {
  currentPage.value = pageNb;
  let params: APIParams = {};
  // Checa os valores pra evitar valores em branco nas consultas
  if (nameFilter.value)
    params.name = (search ?? router.currentRoute.value.query.name) as string;
  if (statusFilter.value) params.status = statusFilter.value;
  if (currentPage.value) params.page = currentPage.value;
  router.push({
    path: '/characters',
    query: params as LocationQueryRaw,
  });
};

/**
 * Atualiza os valores de filtro e atualiza os parâmetros na URL
 * @param params Query parameters (nome, status e número da página)
 */
const updateFilterValues = (params: APIParams) => {
  statusFilter.value = params.status ?? '';
  nameFilter.value = params.name ?? '';
  currentPage.value = computePageNumber() ?? 1;
  loadData(params);
};

// Toda vez que a URL é alterada, atualizamos os dados
// Observa e chama no carregamento da página para recuperar os valores dos filtros pela URL
watch(() => router.currentRoute.value.query, updateFilterValues, {
  immediate: true,
});

useTitle(i18n.t('character_list') + ' - ' + i18n.t('app_name'));
</script>
