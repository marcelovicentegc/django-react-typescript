const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  relative: true,
  content: [
    "./lib/components/*.js",
    "./lib/pages/*.js",
    "./templates/frontend/**/*.html",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
  safelist: [
    {
      pattern:
        /(min|bg|mx|max|px|h|items|justify|w|ml|space|text|rounded|font|py|p|sr|inset|ml|right|mt|origin|shadow|ring|mr|inline|leading|flex|tracking|self|whitespace|grid)-/,
      variants: ["sm", "md", "lg"],
    },
    {
      pattern: /(absolute|flex|hidden|relative|block)/,
    },
  ],
};
