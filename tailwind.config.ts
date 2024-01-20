import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxWidth: {
        '9/10': '90%',
      },
      brightness: {
        80: '0.8',
      },
      height: {
        112: '28rem',
      },
    },

    colors: {
      black: '#000',
      white: '#FFF',
      red: {
        100: '#FFFAFA',
        200: '#FFE5E5',
        300: '#FFCCCC',
        400: '#FF9999',
        500: '#FF3333',
        600: '#FF1919',
        700: '#FF0000',
        800: '#E50000',
      },
      dark: {
        100: '#4C4C4C',
        200: '#404040',
        300: '#333333',
        400: '#262626',
        500: '#1F1F1F',
        600: '#1A1A1A',
        700: '#141414',
        800: '#0F0F0F',
      },
      gray: {
        100: '#FCFCFD',
        200: '#F7F7F8',
        300: '#F1F1F3',
        400: '#E4E4E7',
        500: '#BFBFBF',
        600: '#B3B3B3',
        700: '#A6A6A6',
        800: '#999999',
      },
    },
  },
  plugins: [],
}
export default config
