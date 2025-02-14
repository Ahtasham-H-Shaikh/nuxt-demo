// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      backendUrl: process.env.VITE_BACKEND_URL
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
