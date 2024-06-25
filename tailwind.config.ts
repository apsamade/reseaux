import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        'primary': '#3f3f3f',
        'accent': '#606060',
        'secondary': '#d927c7',
        'background': '#212121'
      },
    },
  },
  plugins: [],
} satisfies Config;
