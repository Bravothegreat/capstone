// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {



//       keyframes: {
//         slideIn: {
//           '0%': { transform: 'translateX(-100%)' },
//           '100%': { transform: 'translateX(0)' },
//         },
//         shake: {
//           '0%, 100%': { transform: 'translateX(0)' },
//           '25%': { transform: 'translateX(-10px)' },
//           '50%': { transform: 'translateX(10px)' },
//           '75%': { transform: 'translateX(-10px)' },
//         },
//       },
//       animation: {
//         slideIn: 'slideIn 1s ease-out forwards',
//         shake: 'shake 0.5s ease-in-out infinite',
//       },

    

//     },

//       keyframes: {
//         slideInRight: {
//           '0%': { transform: 'translateX(100%)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//         slideOutRight: {
//           '0%': { transform: 'translateX(0)', opacity: '1' },
//           '100%': { transform: 'translateX(100%)', opacity: '0' },
//         },
//       },
//       animation: {
//         slideInRight: 'slideInRight 0.5s ease-out',
//         slideOutRight: 'slideOutRight 0.5s ease-in',
//       },
     
//       colors: {
//         customColor: "#0b59de",
//         button: "#b38144",
//         customDarkBlue: '#0e131e',
//         customDark: '#141414',
//        },

//      backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//         },
//     },
//   },
//   plugins: [],
// };
// export default config;





import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-10px)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        slideIn: 'slideIn 1s ease-out forwards',
        shake: 'shake 0.5s ease-in-out infinite',
        slideInRight: 'slideInRight 0.5s ease-out',
        slideOutRight: 'slideOutRight 0.5s ease-in',
      },
      colors: {
        customColor: "#0b59de",
        button: "#b38144",
        customDarkBlue: '#0e131e',
        customDark: '#141414',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;






