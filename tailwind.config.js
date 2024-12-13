/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    // Heading Colors
    "text-black", "text-red-500", "text-blue-500", "text-green-500",
    "text-orange-500", "text-purple-600", "text-yellow-600", "text-pink-500",
    "text-teal-600", "text-gray-900", "text-indigo-600", "text-lime-600",
    
    // Paragraph Colors
    "text-gray-700", "text-gray-500", "text-purple-500", "text-yellow-500",
    "text-red-400", "text-blue-400", "text-green-400", "text-pink-400",
    "text-indigo-400", "text-teal-500", "text-orange-400", "text-lime-500",
    
    // Sidebar Background
    "bg-gray-800", "bg-green-500", "bg-red-500", "bg-blue-500",
    "bg-yellow-400", "bg-purple-700", "bg-teal-500", "bg-pink-600",
    "bg-indigo-700", "bg-orange-500", "bg-gray-900", "bg-lime-600",
    
    // Navbar Background
    "bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-gray-800",
    "bg-green-600", "bg-red-600", "bg-orange-600", "bg-teal-600",
    "bg-pink-700", "bg-indigo-600", "bg-gray-700", "bg-lime-700",
  ],
  
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 10s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(10)' },
          '100%': { transform: 'rotate(-360deg) scale(10)' },
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      });
    },
  ],
}