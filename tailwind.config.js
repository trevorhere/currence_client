module.exports = {
  theme: {
    extend: {
      colors:  {
        bg_grey : "#1A202D"
      }
    }
  },
  variants: {},
  plugins: [
    ({ addComponents }) => {
      const AppLogo = {
        '.App-logo': {
          animation: 'App-logo-spin infinite 20s linear',
          height: '40vmin',
          'pointer-events': 'none'
        },
        '@keyframes App-logo-spin': {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        }
      }
      addComponents(AppLogo)
    }
  ]
}