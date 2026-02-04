/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppinsRegular: ['Poppins Regular', 'sans-serif'],
        poppinsLight: ['Poppins Light', 'sans-serif'],
        poppinsRegularItalic: ['Poppins Regular-Italic', 'sans-serif'],
        poppinsLightItalic: ['Poppins Light-Italic', 'sans-serif'],
        poppinsSemiBold: ['Poppins Semi-Bold', 'sans-serif'],
        poppinsBold: ['Poppins Bold', 'sans-serif'],
        overpass: ['Overpass', 'sans-serif'],

        //Generative Font
        PlayfairDisplay: ['PlayfairDisplay', 'sans-serif'],
        Staatliches: ['Staatliches', 'sans-serif'],
        Aclonica: ['Aclonica', 'sans-serif'],
        Qualy: ['Qualy', 'sans-serif'],
        Delta: ['Delta', 'sans-serif'],
        Aquawax: ['Aquawax', 'sans-serif'],
        BenzGrotesk: ['BenzGrotesk', 'sans-serif'],
        Overwave: ['Overwave', 'sans-serif'],
        Azonix: ['Azonix', 'sans-serif'],
        OverThere: ['OverThere', 'sans-serif'],
        TheSimsong: ['TheSimsong', 'sans-serif'],
        Panic: ['Panic', 'sans-serif'],
        Romantic: ['Romantic', 'sans-serif'],
        Mezirane: ['Mezirane', 'sans-serif'],
        Rolner: ['Rolner', 'sans-serif'],
        Deicho: ['Deicho', 'sans-serif'],
        espectRetro: ['espectRetro', 'sans-serif'],
        Gladolia: ['Gladolia', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#5E44B1',
        lightSecondary: '#DDD8F1',
        darkSecondary: '#48358f',
        tertiary: '#FFFFFF',
      },
      backgroundImage: {
        options: "url('../public/background.png')",
        results: "url('../public/background2.png')",
      },
      animation: {
        tips: 'tips 6s linear infinite',
        heart: 'heart 0.4s ease-in 1',
        domains: 'domains 2s ease-out infinite',
      },
    },
    keyframes: {
      tips: {
        '0%': { opacity: '0%' },
        '30%': { opacity: '100%' },
        '60%': { opacity: '100%' },
        '100%': { opacity: '0%' },
      },
      heart: {
        '0%': { opacity: '0%', scale: '0.3' },
        '70%': { opacity: '100%', scale: '1.3' },
        '100%': { opacity: '100%', scale: '1' },
      },
      domains: {
        '0%': { opacity: '20%' },
        '50%': { opacity: '100%' },
        '100%': { opacity: '20%' },
      },
    },
  },
  plugins: [],
};
