export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front_pll',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  tailwindcss: {

  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    '@nuxt/http',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  axios: {

    baseURL: process.env.API_URL,
    proxy: false,
    retry: { retires: 3 },
  },

  http: {
    baseURL: process.env.API_URL,
    proxy: false
  },

  proxy: [
    // Proxies /foo to http://example.com/foo
    process.env.API_URL + '/*',

  ],


  /*
 ** Runtime Config
 */
  publicRuntimeConfig: {

    http: {
      browserBaseURL: process.env.API_URL
    }
  },

  privateRuntimeConfig: {
    http: {
      baseURL: process.env.API_URL
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
