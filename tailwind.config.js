/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Webflow's real breakpoints — layout changes ONLY at these widths.
    // 1024 and 992 are structurally identical to 1280 (fluid width only).
    screens: {
      'dt':  { max: '991px' },
      'tb':  { max: '767px' },
      'mb':  { max: '479px' },
      'lg':  '992px',
      'xl':  '1280px', // the width every measurement in this project was taken at
      'md':  '768px',
      'sm':  '480px',
    },
    extend: {
      colors: {
        // Surfaces — measured from the original's computed styles
        bg:        '#FEFDFB', // warm off-white page base
        surface:   '#F4F3F0', // section / card alt surface
        white:     '#FFFFFF',
        footer:    '#FFFDF9',

        // Ink
        ink:       '#1B1A18', // near-black body ink
        black:     '#000000',
        muted:     '#7B7974', // secondary text
        'muted-d': '#55534E', // tertiary text
        'muted-l': '#797569',

        // Lines
        border:    '#D1CDC7',
        'border-f':'rgba(209, 205, 199, 0.5)',

        // Brand
        green:     '#035D44', // hero field

        // Feature-block heading tints
        navy:      '#001433',
        brown:     '#381005',
        olive:     '#102B03',
        plum:      '#46022F',

        // Accent pastels
        'ac-yellow': '#EEF773',
        'ac-blue':   '#BEDFFE',
        'ac-peach':  '#FCC9AB',
        'ac-pink':   '#F8B9E4',
        'ac-gold':   '#FAE188',

        // promo banner (Sculpt)
        'banner':    '#45012E', // .banner-sculpt background
        'banner-tx': '#C8BBFB', // banner body copy
      },
      fontFamily: {
        sans: ['Figtree', 'Inter', 'Arial', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }] — measured 1:1
        'display':  ['88px', { lineHeight: '88px',   letterSpacing: '-3.52px' }],
        'h1':       ['72px', { lineHeight: '72px',   letterSpacing: '-2.16px' }], // .heading-style-h2
        'h2':       ['48px', { lineHeight: '48px',   letterSpacing: '-1.92px' }], // .heading-style-h3
        'h3':       ['44px', { lineHeight: '48.4px', letterSpacing: '-0.88px' }],
        'h4':       ['32px', { lineHeight: '36px',   letterSpacing: '-0.64px' }],
        'h5':       ['23.2px',{ lineHeight: '30.16px', letterSpacing: '-0.23px' }],
        'lead':     ['24px', { lineHeight: '31.2px' }],
        'body-l':   ['20px', { lineHeight: '26px' }],
        'body':     ['16px', { lineHeight: '24px' }],
        'sm':       ['14px', { lineHeight: '19.6px', letterSpacing: '-0.14px' }],
        'sm-t':     ['14px', { lineHeight: '15.4px' }],
        'xs':       ['12px', { lineHeight: '15.6px' }],
        'eyebrow':  ['12px', { lineHeight: '14.4px', letterSpacing: '1.08px' }],
        'label':    ['10px', { lineHeight: '12px',   letterSpacing: '0.8px' }],
        'btn':      ['13.92px', { lineHeight: '20.88px', letterSpacing: '-0.14px' }],
      },
      fontWeight: {
        display: '575', // the original's variable-weight hero cut
      },
      maxWidth: {
        container: '1280px', // .container-regular { width:95%; max-width:1280px }
        'prose-w':  '560px',
        'block':    '896px',
      },
      borderRadius: {
        feature: '48px', // .home-feature_list / sticky theme cards
        panel: '0 0 24px 24px', // nav mega-menu
        card:  '18px',
        btn:   '12px',
        lg:    '24px',
        xl:    '32px',
        sm:    '8px',
        pill:  '100px',
      },
      spacing: {
        gutter: '32px',
      },
      transitionTimingFunction: {
        clay: 'cubic-bezier(0.22, 1, 0.36, 1)',
        expo: 'cubic-bezier(.19, 1, .22, 1)', // nav panel height, tab-strip settle
      },
      transitionDuration: {
        panel: '400ms', // nav mega-menu height 0 -> 328px
        strip: '750ms', // flow tab-strip translateX settle
      },
      keyframes: {
        // .home-action_scale — continuous 1.000 <-> 1.010, 1800ms sine
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.01)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-2231px)' },
        },
      },
      animation: {
        // logo track measured at -24.0 px/s over a 2231px copy => ~93s period
        marquee: 'marquee 92.96s linear infinite', // 2231px track at 24.0px/s
        'pulse-scale': 'pulse-scale 1800ms ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
