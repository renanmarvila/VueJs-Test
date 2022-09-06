import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';

const i18n = createI18n({
  locale: 'br', // Idioma padrão
  fallbackLocale: 'en', // Idioma alternativo
  globalInjection: true,
  messages,
});

export default i18n;


// Internalização via vue-i18n