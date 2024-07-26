/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily:{
      heading:'Poppins_600SemiBold',
      subtitle:'Poppins_500Medium',
      body:'Poppins_400Regular',
      bold:'Poppins_700Bold'
    }
  },
  },
  plugins: [],
}

