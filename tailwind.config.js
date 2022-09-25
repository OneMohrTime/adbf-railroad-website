const theme     = require('./web/app/themes/adbf-railroad/theme.json');
const tailpress = require("@jeffreyvr/tailwindcss-tailpress");

module.exports = {
  prefix: 'u-',
  content: [
    './web/app/themes/adbf-railroad/*.php',
    './web/app/themes/adbf-railroad/**/*.php',
    './web/app/themes/adbf-railroad/templates/*.twig',
    './web/app/themes/adbf-railroad/templates/**/*.twig',
    './web/app/themes/adbf-railroad/src/styles/*.css',
    './web/app/themes/adbf-railroad/src/scripts/*.js',
    './safelist.txt'
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '0rem'
      },
    },
    screens: {
      'xs': '300px',
      'sm': '600px',
      'md': '900px',
      'lg': '1200px',
      'xl': '1500px',
      '2xl': '1800px'
    },
    colors: {
      'yellow': '#f7bf00',
      'red': '#e00000',
      'green': '#134b32',
      'blue': '#1f229c',
      'pink': '#e8b5d0',
      'gray': {
        light: '#f0f0f0',
        DEFAULT: '#d8d8d8',
        dark: '#979797',
      },
      'light': '#f7f7f7',
      'dark': '#313131',
      'white': '#fff',
      'black': '#000',
    },
    fontFamily: {
      sans: ['Readex Pro', 'sans-serif'],
    },
    fontSize: {
      'p': '18px',
      'h1': '54px',
      'h2': '48px',
      'h3': '36px',
      'h4': '21px',
      'h5': '15px',
      'h6': '12px',
    },
    spacing: {
      DEFAULT: '72px',
      'xs': '24px',
      'sm': '48px',
      'md': '72px',
      'lg': '96px',
      'xl': '120px',
      'xxl': '144px',
      'super': '168px',
      'massive': '192px',
    },
    extend: {
      colors: {
        'facebook': '#4267b2',
        'instagram': '#e1306c',
        'linkedin': '#0e76a8',
        'messenger': '#006aff',
        'pinterest': '#e60023',
        'snapchat': '#fffc00',
        'twitter': '#1da1f2',
        'whatsapp': '#25d366',
        'youtube': '#f00',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
