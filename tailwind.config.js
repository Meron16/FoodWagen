/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'food-primary': '#F17228',
        'food-secondary': '#FFB30E',
        'food-accent': '#FF9A0E',
        'food-dark': '#212121',
        'food-gray': '#757575',
        'food-light-gray': '#F5F5F5',
        'food-white': '#FFFFFF',
      },
      fontFamily: {
        'food-sans': ['Source Sans Pro', 'sans-serif'],
      },
      backgroundImage: {
        'food-gradient': 'linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)',
        'food-gradient-button': 'linear-gradient(95.71deg, #FF7A7A -39.64%, #F75900 135.31%)',
        'food-gradient-subscribe': 'linear-gradient(92.84deg, #FFB800 -47.72%, #FF8A00 136.81%)',
      },
      boxShadow: {
        'food-card': '0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042',
        'food-button': '0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042',
        'food-subscribe': '0px 14px 32px 0px #FFB20E4A, 0px 5px 8px 0px #DE97003D',
        'food-modal': '0px 2px 25px 0px #00000026',
      },
    },
  },
  plugins: [],
}




