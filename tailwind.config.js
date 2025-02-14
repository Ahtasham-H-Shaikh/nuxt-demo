const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
    content: [
      "./components/**/*.{vue,js}",
      "./layouts/**/*.{vue,js}",
      "./pages/**/*.{vue,js}",
      "./plugins/**/*.{js,ts}",
      "./app.vue"
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', ...fontFamily.sans], 
        },
      },
    },
    plugins: [],
  };