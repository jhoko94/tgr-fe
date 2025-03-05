import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3100,
  },

  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'TGR - Tuntutan Ganti Rugi',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/light-font/css/materialdesignicons-light.min.css' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/font.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/notyf.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    'vue-sweetalert2/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
    "vue-currency-filter/nuxt",
    '@nuxtjs/composition-api/module',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1E293B',
          accent: colors.grey.darken3,
          secondary: '#2563EB',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          black: '#1d1d1f',
          white: '#f5f5f7'
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/echarts/, /zrender/],
    postcss: {
      plugins: {},
      preset: {},
    },
  }
}
