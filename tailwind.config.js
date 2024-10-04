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
                'custom-grey': '#D6DBDC',
                'logo-turquoise': '#43BFB0',
                'logo-green': '#95C973',
                'hover-logo-green': '#99D960',
                'logo-light-blue': '#9CDDD0',
                'logo-dark-blue': '#233B70',
                'dark-map-gray': '#292929',
                'light-map-green': '#CAEBC0',
                'icon-gray': '#5f6368',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-to-b-custom':
                    'linear-gradient(to bottom, grey, white)',
            },
            scale: {
                80: '0.8',
                85: '0.85',
                102: '1.02',
            },
            animation: {
                pulse: 'pulse 1.5s infinite',
            },
            keyframes: {
                pulse: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.2)', opacity: '1' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            boxShadow: {
                r: '5px 0 15px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [],
};
