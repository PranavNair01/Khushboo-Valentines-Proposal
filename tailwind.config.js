/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['var(--font-playfair)'],
                body: ['var(--font-poppins)'],
            },
        },
    },
    plugins: [],
};
