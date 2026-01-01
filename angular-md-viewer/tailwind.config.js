// module.exports = {
//   content: ['./src/**/*.{html,ts}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('@tailwindcss/typography')],
// };

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#374151', // gray-700 en modo claro
            h1: { color: '#111827' }, // gray-900
            h2: { color: '#111827' },
            h3: { color: '#111827' },
            p: { color: '#374151' },
            pre: {
              backgroundColor: '#1f2937', // gray-800
              color: '#e5e7eb' // gray-200
            },
            code: {
              backgroundColor: '#f3f4f6', // gray-100
              color: '#111827'
            }
          },
        },
        dark: {
          css: {
            color: '#d1d5db', // gray-300 en modo oscuro
            h1: { color: '#f9fafb' }, // gray-50
            h2: { color: '#f9fafb' },
            h3: { color: '#f9fafb' },
            p: { color: '#d1d5db' },
            pre: {
              backgroundColor: '#111827', // gray-900
              color: '#e5e7eb'
            },
            code: {
              backgroundColor: '#374151', // gray-700
              color: '#f9fafb'
            }
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};