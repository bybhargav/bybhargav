import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amberPixel: '#f6a800',
        ink: '#080706',
        cream: '#f5dfb0',
      },
      fontFamily: {
        pixel: ['Courier New', 'Lucida Console', 'monospace'],
        mono: ['Berkeley Mono', 'SFMono-Regular', 'Cascadia Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
