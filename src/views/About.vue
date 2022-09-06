<template>
    <div class="flex justify-center px-10">
      <div class="text-center mt-1">
        <h1 class="text-3xl font-bold">{{ $t('about') }}</h1>
        <h1 class="mt-4 mb-4 text-2xl">Esse projeto foi desenvolvido com base na API de Rick and Morty para aprendizado e prática de conceitos de VueJs e Typescript</h1>
        <h1 class="mt-4 mb-4 text-2xl">A estilização do projeto foi feita utilizando WindiCSS, uma derivação do Tailwind</h1>
        <h1 class="mt-4 mb-4 text-2xl">Para as rotas foi utilizado o Vue Router e o gerenciamento de estado foi feito com Vuex </h1>
        <router-link to="/characters">
          <p class="mx-auto text-xl border-b border-white dark:border-black w-max">
            {{ $t('home') }}
          </p>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts"></script>