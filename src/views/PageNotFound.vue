<template>
  <div class="flex justify-center px-10">
    <div class="text-center mt-1">
      <h1 class="text-3xl font-bold">{{ $t('error') }} 404</h1>
      <h1 class="mb-4 text-2xl">Page not found</h1>
      <router-link to="/characters">
        <p class="mx-auto text-xl border-b border-white dark:border-black w-max">
          {{ $t('return-to-list') }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
