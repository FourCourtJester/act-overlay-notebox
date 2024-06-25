import plugin from 'tailwindcss/plugin'
import form from "@tailwindcss/forms"

import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        border: '#554121',
      },
      backgroundImage: {
        gradient: 'linear-gradient(180deg,#3a3a3a,#1e1e1e 2rem)',
      },
      boxShadow: {
        inner: 'inset 0 0 0 1px hsla(0,0%,100%,.1), 0 0 0 2px #222, 0 3px 1px #cfc36e, 0 0 2px 1px rgba(0,0,0,.4)',
        outer: 'inset 0 1px 1px 0 #cfc36e, inset 0 0 1px 0 hsla(53,50%,62%,.5), 0 0 1px 2px rgba(0,0,0,.5), 0 2px 2px 2px rgba(0,0,0,.5)',
      },
      fontFamily: {
        oxygen: ['Oxygen']
      },
      textShadow: {
        body: '0 1px rgba(0,0,0,.4)',
      }
    },
  },
  plugins: [form, plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    )
  }),],
} satisfies Config;
