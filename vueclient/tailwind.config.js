/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            "maxWidth": {
                "task": "15ch",
                "task-lg": "25ch"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}

