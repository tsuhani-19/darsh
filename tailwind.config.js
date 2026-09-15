import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Darsh Innovations, drawn straight off the logo ───────────────
        // The mark is three materials: a lacquer red, a piano black and a
        // brushed silver. Everything below is one of those three.

        // The black arm of the swirl. Neutral, very slightly cool, so silver
        // sits on it without going muddy.
        ink: {
          50: '#F7F7F8',
          100: '#EDEDEF',
          200: '#D8D9DC',
          300: '#ABADB3',
          400: '#787B82',
          500: '#52555B',
          600: '#383A40',
          700: '#24262A',
          800: '#151719',
          900: '#0A0B0C',
        },
        // The red arm. 500 is the logo red; 400 is its specular highlight and
        // 700–900 are the shaded inner curve.
        brand: {
          50: '#FFF2F2',
          100: '#FFE0E1',
          200: '#FFC0C2',
          300: '#FF9093',
          400: '#F94F55',
          500: '#E8161F',
          600: '#C80B14',
          700: '#A00810',
          800: '#78060C',
          900: '#4B0407',
        },
        // The white-to-grey arm. Carries every "confirmed / done / neutral"
        // signal so red is left free to mean brand and error only.
        steel: {
          50: '#FBFBFC',
          100: '#F2F3F5',
          200: '#E4E6EA',
          300: '#CDD1D6',
          400: '#ACB1B9',
          500: '#888E97',
          600: '#656B74',
          700: '#4A4F57',
        },
        // A cooler, deeper red than the brand's. Used where two reds have to
        // sit side by side (validation on a branded form) and stay distinct.
        crimson: {
          50: '#FFF1F3',
          100: '#FFDFE3',
          200: '#FDBCC4',
          300: '#F8909C',
          400: '#EF5568',
          500: '#DC2343',
          600: '#B81332',
        },
        // The molten edge where red catches light. Rationed — a little gold
        // on red and black is drama, a lot is a warning label.
        gold: {
          50: '#FFF8EC',
          100: '#FFEDCF',
          200: '#FFD89B',
          300: '#FFBC5C',
          400: '#FF9F2E',
          500: '#F27A0B',
        },
        paper: '#FFFFFF',
        mist: '#F6F6F8',
        line: '#E6E7EB',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Three stacked layers each: a tight contact shadow, a mid bloom and a
      // wide ambient one. A single large blur reads as a grey halo; stacking
      // them is what makes an edge look like it is actually lifted.
      boxShadow: {
        soft: '0 1px 1px rgba(10,11,12,0.04), 0 2px 5px -1px rgba(10,11,12,0.04), 0 10px 22px -12px rgba(10,11,12,0.10)',
        lift: '0 1px 2px rgba(10,11,12,0.05), 0 5px 12px -3px rgba(10,11,12,0.07), 0 22px 46px -20px rgba(10,11,12,0.20)',
        deep: '0 2px 6px rgba(10,11,12,0.07), 0 14px 32px -10px rgba(10,11,12,0.18), 0 40px 84px -34px rgba(10,11,12,0.42)',
        edge: '0 0 0 1px rgba(10,11,12,0.05), 0 1px 2px rgba(10,11,12,0.04)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        ring: {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '80%,100%': { transform: 'scale(1.55)', opacity: '0' },
        },
        // --- motion layer: the orbit rings and the CTA's grid floor --------
        spinSlow: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        spinReverse: { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        gridRun: { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '0 -60px' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        blink: 'blink 1s step-end infinite',
        ring: 'ring 2.6s cubic-bezier(0.24,0,0.38,1) infinite',
        'spin-slow': 'spinSlow 26s linear infinite',
        'spin-reverse': 'spinReverse 34s linear infinite',
        'grid-run': 'gridRun 2.4s linear infinite',
      },
    },
  },
  // tailwindcss-animate supplies the enter/exit utilities the Radix-based
  // controls in src/components/controls use (animate-in, fade-in-0, …).
  plugins: [animate],
}
