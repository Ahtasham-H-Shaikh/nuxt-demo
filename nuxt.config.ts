// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700], // Specify font weights
    },
    display: 'swap', // Optional: Optimize font rendering
    prefetch: true, // Prefetch font files
    preload: true, // Preload font files for better LCP
    download: true, // Download fonts and serve them locally
    inject: true,
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
