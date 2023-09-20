import themes from '@bcc-code/design-library-vue'
import flowbite from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,ts}',
        'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
        'node_modules/@bcc-code/design-library-vue/dist/design-library-vue.js'
    ],
    safelist: [
        { pattern: /bg-(red|blue|green|orange)-(2|[1-9]00)/ },
        { pattern: /shadow-(red|blue|green|orange)-[1-9]00/ },
        { pattern: /border-(red|blue|green|orange)-[1-9]00/ }
    ],
    presets: [ themes.bccForbundetTheme ],
    plugins: [ themes.tailwindPlugin, flowbite],
    theme: {
        extend: {
            height: {
                screenDesktop: 'calc(100vh - 56px)'
            },
            colors: {
                'tiber': {
                    DEFAULT: '#0A293B',
                    50: '#8CC8EB',
                    100: '#7AC0E8',
                    200: '#57AFE3',
                    300: '#349FDD',
                    400: '#228AC7',
                    500: '#1C72A4',
                    600: '#165981',
                    700: '#10415E',
                    800: '#0A293B',
                    900: '#02080B'
                },
                'red-2': '#5b0600',
                'blue-2': '#010137',
                'orange-2': '#985b08',
                'green-2': '#14442d'
            }
        },
        
    }
}
