<template>
  <div class="absolute top-0 right-0 flex m-4 space-x-2 text-xl text-white">
    <div>
      <button
        class="button dark:(text-black)"
        type="button"
        :title="$t('button.toggle_dark')"
        @click="toggleDark()"
      >
        <icon-carbon-moon v-if="isDark" />
        <icon-carbon-sun v-else />
      </button>
    </div>
    <div>
      <button
        class="button"
        type="button"
        :title="$t('button.toggle_lang')"
        @click="$i18n.locale = $i18n.locale === 'en' ? 'br' : 'en'"
      >
        <icon-cif-gb v-if="$i18n.locale === 'br'"></icon-cif-gb> <!-- ao clicar na bandeira BR, fica pt-br-->
        <icon-cif-br v-if="$i18n.locale === 'en'"></icon-cif-br> <!-- ao clicar na bandeira GB, fica en-->
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '../../modules/dark';
</script>

<style scoped>
.button {
  @apply p-1 text-2xl border border-transparent leading-none;
}
</style>
