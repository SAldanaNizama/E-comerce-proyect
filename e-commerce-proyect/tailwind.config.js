module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transmitir: {
          azulClaro: '#E9F1FA',
          azulBrillante: '#00ABE4',
          blanco: '#FFFFFF',
          opcional: '#0282BD',
        },
        futurista: {
          azulNeon: '#2272FF',
          negro: '#1D1D1D',
        },
        confianza: {
          azulMarino: '#01257D',
          azulElectrico: '#00FFFF',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};