

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
//          slideIn: {
//           '0%': { transform: 'translateX(-100%)' },
//           '100%': { transform: 'translateX(0)' },
//         },
//         shake: {
//           '0%, 100%': { transform: 'translateX(0)' },
//           '25%': { transform: 'translateX(-10px)' },
//           '50%': { transform: 'translateX(10px)' },
//           '75%': { transform: 'translateX(-10px)' },
//         },


//         shakee: {
//           '0%, 100%': { transform: 'translateX(0)' },
//           '25%, 75%': { transform: 'translateX(-5px)' },
//           '50%': { transform: 'translateX(5px)' },
//         },


//         shaky: {
//           '0%, 100%': { transform: 'translateX(0)' },
//           '25%, 75%': { transform: 'translateX(-5px)' },
//           '50%': { transform: 'translateX(5px)' },
//         },


      


//         slideInRight: {
//           '0%': { transform: 'translateX(100%)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//         slideOutRight: {
//           '0%': { transform: 'translateX(0)', opacity: '1' },
//           '100%': { transform: 'translateX(100%)', opacity: '0' },
//         },


//         slideInFromLeft: {
//           '0%': { transform: 'translateX(-100%)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },


        
//         slideInFromTop: {
//           '0%': { transform: 'translateY(-100%)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },


//         slideInFromBottom: {
//           '0%': { transform: 'translateY(100%)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },


//       },
//       animation: {
//         slideIn: 'slideIn 3s ease-out forwards',
//         shake: 'shake 3s ease-in-out infinite',
//         slideInRight: 'slideInRight 3s ease-out',
//         slideOutRight: 'slideOutRight 3s ease-in',
        
//         slideInFromTop: 'slideInFromTop 10s ease-out',
       
//         slideInFromLeft: 'slideInFromLeft 3s ease-out',
//         shakee: 'shake 0.5s ease-in-out',

         
//         slideInFromBottom: 'slideInFromBottom 1s ease-out',
//         shaky: 'shake 3s ease-in-out',

      

//       },
//       colors: {
//         customColor: "#0b59de",
//         button: "#b38144",
//         customDarkBlue: '#0e131e',
//         customDark: '#141414',
//       },
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
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
        shakee: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%, 75%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
        },
        shaky: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%, 75%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 3s ease-out forwards',
        shake: 'shake 3s ease-in-out infinite',
        slideInRight: 'slideInRight 3s ease-out',
        slideOutRight: 'slideOutRight 3s ease-in',
        slideInFromTop: 'slideInFromTop 10s ease-out',
        slideInFromLeft: 'slideInFromLeft 3s ease-out',
        shakee: 'shakee 0.5s ease-in-out',
        slideInFromBottom: 'slideInFromBottom 1s ease-out',
        shaky: 'shaky 3s ease-in-out',
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







