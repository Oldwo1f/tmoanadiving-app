import { defineNuxtConfig } from '@nuxt/bridge'
import webpack from 'webpack'

export default defineNuxtConfig({
  publicRuntimeConfig: {
    apiURL: process.env.API_URL
  },
  ssr: false,
  bridge: {
    nitro: false,
    meta: true
  },
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Te Moana Diving',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,700;1,400&display=swap",
      },
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/css/font.css',
    '~assets/css/table.css',
    '~assets/css/transition.css',
    'animate.css/animate.compat.css'
  ],
  // pageTransition: 'fade',
  // transition: {
  //   afterLeave(el) {
  //     console.log('afterLeave', el)
  //   }
  // },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/vue-masonry', ssr: false },
    // '~plugins/scrollbar.js',
    // '~plugins/jsontocsv.js',
    '~plugins/touchevents.js',

    '~plugins/formatnumber.js',
    '~plugins/calculateCredit.js',
    '~plugins/calculateDateExpi.js',
    '~/plugins/map',
    { src: '~/plugins/veevalidate.js', ssr: false },
    { src: '~/plugins/vuecarousel.js', ssr: false },
    // { src: '~/plugins/flipcountdown.js', ssr: true },
    // { src: '~/plugins/vue-awesome-countdown.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-material-design-icons-iconfont',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
    'vue-social-sharing/nuxt',
    'vue-geolocation-api/nuxt',
    ['nuxt-gmaps', {
      key: 'AIzaSyB0VFbqHYEgybmfivHvTnb5ojZnV8ITZi0'
      // you can use libraries: ['places']
    }]
  ],

  dayjs: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    defaultTimeZone: 'Pacific/Tahiti',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone' // import 'dayjs/plugin/timezone'
    ] // Your Day.js plugin
  },
  auth: {

    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {

        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/auth/user', method: 'get' }
        }
      },
      // facebook: {
      //   endpoints: {
      //     userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
      //   },
      //   clientId: '460503435426912',
      //   scope: ['public_profile', 'email']
      // },
    }
  },

  router: {
    middleware: 'auth'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    mode: 'no-cors',
    proxyHeaders: false,
    credentials: false,
    baseURL: process.env.API_URL,

    // headers: {
    //   common: {
    //     'Access-Control-Allow-Headers': 'access-control-allow-headers, application/json, text/plain, */*, Authorization'
    //   }
    // },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash'
      })
    ],
    transpile: ['vee-validate'],
    extend(config, ctx) {
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vue-carousel/]
          })
        ]
      }
    }
  }
})
