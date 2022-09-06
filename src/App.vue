<template>
  <div
    class="relative flex flex-col w-full min-h-screen text-white bg-dark-800 dark:(bg-white text-black)"
  >
    <Header></Header>
    <Logo></Logo>
    <div class="flex-grow">
      <router-view></router-view>
    </div>

    <Footer></Footer>
  </div>
</template>

<script setup lang="ts"></script>
