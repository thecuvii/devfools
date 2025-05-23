import VersionMap from './version.json'

declare const window: any

const defineWindowProperty = (name: string, value: any) => {
  if (window[name]) return
  Object.defineProperty(window, name, {
    enumerable: false,
    configurable: true,
    get() {
      return value
    },
  })
}

const createMeta = (metas:Record<string,string>)=>{
  Object.keys(metas).forEach((name:keyof typeof metas)=>{
    const _meta = document.createElement("meta")
    _meta.setAttribute("name",name)
    _meta.setAttribute("content",metas[name])
    document.head.appendChild(_meta)
  })
}

type Config = {
  packageName?: string | true
  enable: () => void
  // disbale:()=>void TODO
}

export const allDevtools = {
  next: {
    packageName: true,
    enable: () => {
      allDevtools.react.enable()
      defineWindowProperty('next', {
        version: VersionMap.next,
      })
    },
  },
  vite: {
    enable: () => {
      defineWindowProperty('__vite_is_modern_browser', true)
    },
  },
  vitepress: {
    enable: () => {
      defineWindowProperty('__VP_HASH_MAP__', true)
      defineWindowProperty('__vitepress', true)
    },
  },
  element: {
    enable: () => {
      const $div = document.createElement('div')
      $div.classList.add('el-table-column')
      document.body.appendChild($div)
    },
  },
  solid: {
    enable: () => {
      defineWindowProperty('__SOLID_DEVTOOLS__', true)
      defineWindowProperty('Solid$$', true)
    },
  },
  ['SolidStart']:{
    enable() {
        defineWindowProperty('_$HY',{
          'init':true,
        })
    },
  },
  react: {
    enable: () => {
      defineWindowProperty('__REACT_DEVTOOLS_ATTACH__', {})

      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        try {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
            reconcilerVersion: '100.666',
          })
        } catch {}
      }
    },
  },
  nuxt: {
    enable: () => {
      const $nuxt = {
        config: {},
        data: {},
        path: '/',
        state: {},
        serverRendered: true,
        $root: {
          constructor: {
            config: {
              devtools: false,
            },
          },
        },
      }
      defineWindowProperty('$nuxt', $nuxt)
    },
  },
  vue: {
    enable: () => {
      defineWindowProperty('__VUE__', true)
    },
  },
  svelte: {
    enable: () => {
      defineWindowProperty('__svelte', {
        v: new Set('🤡'),
      })
    },
  },
  angular: {
    enable: () => {
      document.body.setAttribute('ng-version', '🤡')
    },
  },
  redux: {
    enable: () => {
      defineWindowProperty('__REDUX_DEVTOOLS_EXTENSION__', {
        connect: () => '🤡',
      })
    },
  },
  motion: {
    enable: () => {
      defineWindowProperty('__MOTION_DEV_TOOLS__', '🤡')
    },
  },
  framer: {
    enable: () => {
      defineWindowProperty('Framer', {
        version: '100',
        Animatable: true,
      })
      defineWindowProperty('__framer_importFromPackage', true)
    },
  },
  gsap: {
    packageName: true,
    enable: () => {
      defineWindowProperty('gsap', {
        version: VersionMap.gsap,
      })
    },
  },
  three: {
    packageName: true,
    enable: () => {
      defineWindowProperty('THREE', {
        REVISION: VersionMap.three,
      })
    },
  },
  mobx: {
    enable: () => {
      defineWindowProperty('__mobxGlobal', '1')
      defineWindowProperty('__mobxInstanceCount', '1')
      defineWindowProperty('__mobxGlobals', '1')
    },
  },
  tailwind: {
    enable: () => {
      defineWindowProperty('tailwind', '🤡')
    },
  },
  rive: {
    packageName: true,
    enable: () => {
      defineWindowProperty('rive', {
        Rive: '',
      })
    },
  },
  antd: {
    packageName: true,
    enable: () => {
      defineWindowProperty('antd', {
        version: VersionMap.antd,
      })
    },
  },
  naive: {
    enable: () => {
      const $style = document.createElement('style')
      $style.setAttribute('cssr-id', 'n-skeleton')
      $style.innerHTML = `.n-skeleton {}`
      document.head.appendChild($style)
    },
  },
  manoco: {
    enable: () => {
      defineWindowProperty('MonacoEnvironment', {})
      defineWindowProperty('manoco', { editor: {} })
    },
  },
  codemirror: {
    packageName: true,
    enable: () => {
      defineWindowProperty('CodeMirror', {
        version: VersionMap.codemirror,
      })
    },
  },
  vuepress: {
    packageName: true,
    enable: () => {
      defineWindowProperty('__VUEPRESS__', {
        version: VersionMap.vuepress,
      })
    },
  },
  remix: {
    enable: () => {
      defineWindowProperty('__remixContext', {})
    },
  },
  nextui: {
    enable: () => {
      const $style = document.createElement('style')
      $style.innerHTML = `#fake-devfools {--nextui-colors-text: #000}`
      document.head.appendChild($style)
    },
  },
  material: {
    enable: () => {
      defineWindowProperty('ngMaterial', {})
    },
  },
  pwa: {
    enable: () => {
      const $link = document.createElement('link')
      $link.setAttribute('rel', 'manifest')
      document.head.appendChild($link)
    },
  },
  sentry: {
    packageName: true,
    enable: () => {
      defineWindowProperty('__SENTRY__', true)
      defineWindowProperty('Raven', {
        config: {},
      })
      defineWindowProperty('Sentry', {
        SDK_VERSION: VersionMap.sentry,
      })
    },
  },
  styledComponent: {
    enable: () => {
      const $div = document.createElement('div')
      $div.setAttribute('sc-component-id', '🤡')
      document.body.appendChild($div)

      const $style = document.createElement('style')
      $style.setAttribute('data-styled-version', '🤡')
      document.head.appendChild($style)
    },
  },
  webpack: {
    enable: () => {
      defineWindowProperty('webpackChunk', {})
      defineWindowProperty('webpackJsonp', {})
    },
  },
  googleAnalytics: {
    enable: () => {
      defineWindowProperty('gaGlobal', {})
      defineWindowProperty('GoogleAnalyticsObject', {})
    },
  },
  umami: {
    enable: () => {
      defineWindowProperty('umami', {})
    },
  },
  babel: {
    enable: () => {
      defineWindowProperty('_babelPolyfill', {})
    },
  },
  hljs: {
    enable: () => {
      defineWindowProperty('hljs', {
        highlightBlock: {},
        listLanguages: ['javascript'],
      })
    },
  },
  prism: {
    packageName: true,
    enable: () => {
      defineWindowProperty('Prism', {})
      defineWindowProperty('apex', {
        libVersions: { prismJs: { version: VersionMap.prism } },
      })
    },
  },
  ['htmx.org']: {
    packageName: true,
    enable: () => {
      defineWindowProperty('htmx', {
        version: VersionMap['htmx.org'],
      })
    },
  },
  hyperscript: {
    enable: () => {
      defineWindowProperty('_hyperscript', {})
    },
  },
  ['lit-element']: {
    packageName: true,
    enable() {
      defineWindowProperty('litElementVersions', [VersionMap['lit-element']])
    },
  },
  ['lit-html']: {
    packageName: true,
    enable() {
      defineWindowProperty('litHtmlVersions', [VersionMap['lit-html']])
    },
  },
  ['Magento']:{
    enable() {
        defineWindowProperty('Mage','')
        defineWindowProperty('VarienForm','')
    },
  },
  ['Magisto']:{
    enable() {
        defineWindowProperty('MagistoPlayerFrame','')
        defineWindowProperty('magisto_server','')
    },
  },
  ['Q4']:{
    enable() {
        defineWindowProperty('q4App',{
          a11yAnnouncement:""
        })
        defineWindowProperty('q4Defaults',{
          fancySignup:""
        })
    },
  },
  ['Qstomizer']:{
    enable() {
        defineWindowProperty("jQueryQSMZ","")
        defineWindowProperty("loadScript_qsmz","")
        defineWindowProperty("qstomizer_script","")
    },
  },
  ['Quanta']:{
    enable() {
        defineWindowProperty('QUANTA',{
          app_id:""
        })
        defineWindowProperty('QuantaTagRUMSpeedIndex','')
    },
  },
  ['Quantcast Measure']:{
    enable() {
        defineWindowProperty('quantserve','')
    },
  },
  ['Qubit']:{
    enable() {
        defineWindowProperty('__qubit','')
        defineWindowProperty('onQubitReady','')
    },
  },
  ['USWDS']:{
    enable() {
        defineWindowProperty('uswdsPresent','')
    },
  },
  ['XOOPS']:{
    enable() {
        defineWindowProperty('xoops','')
    },
  },
  ['Jquery']:{
    enable() {
        defineWindowProperty('jQuery',{
          "fn":{
            "jquery":VersionMap['Jquery']
          }
        })
    },
  },
  ['Typekit']:{
    enable() {
        defineWindowProperty('Typekit',{
          "config":{
            "js":VersionMap['Typekit']
          }
        })
    },
  },
  ['Remix']:{
    enable() {
      defineWindowProperty('__remixContext',{})
      defineWindowProperty('__remixManifest',{})
    },
  },
  ['Flowplayer']:{
    enable() {
      defineWindowProperty('flowplayer',{
        'version':VersionMap['Flowplayer']
      })
    },
  },
  ['core-js']:{
    enable() {
      defineWindowProperty('__core-js_shared__',{
        'versions':[{"version":VersionMap['core-js']}]
      })
    },
  },
  ['crypto-js']:{
    enable() {
      defineWindowProperty('CryptoJS',{
        'Rabbit':""
      })
    },
  },
  ['jQuery Migrate']:{
    enable() {
      defineWindowProperty('jQuery',{
        'migrateVersion':VersionMap['jQuery-Migrate']
      })
    },
  },
  ['Swagger UI']:{
    enable() {
      defineWindowProperty('SwaggerUIBundle',{})
      defineWindowProperty('SwaggerUIStandalonePreset',{})
    },
  },
  ['Swagify']:{
    enable() {
      defineWindowProperty('Swagify',{})
    },
  },
  ['Shopify']:{
    enable() {
      defineWindowProperty('SHOPIFY_API_BASE_URL',{})
      defineWindowProperty('ShopifyAPI',{})
      defineWindowProperty("Shopify",{})
      defineWindowProperty('ShopifyCustomer',{})
      defineWindowProperty('shopifyAccessUrl',{})
    },
  },
  ['Socket.io']:{
    enable() {
        defineWindowProperty('io',{
          'Socket':{},
          'version':VersionMap['Socket.io']
        })
    },
  },
  ['Hammer.js']:{
    enable() {
        defineWindowProperty('Hammer',{
          'VERSION':VersionMap['Hammer.js'],
        })
    },
  },
  ['Handlebars']:{
    enable() {
        defineWindowProperty('Handlebars',{
          'VERSION':VersionMap['Handlebars'],
        })
    },
  },
  ['WordPress']:{
    enable() {
        defineWindowProperty('wp_username',{})
    },
  },
  ['Atlassian Bitbucket']:{
    enable() {
        defineWindowProperty('bitbucket',{})
    },
  },
  ['Atlassian Jira']:{
    enable() {
        defineWindowProperty('jira',{
          'id':''
        })
    },
  },
  ['Django']:{
    enable() {
        defineWindowProperty('django',{})
    },
  },
  ['Stripe']:{
    enable() {
      defineWindowProperty('Stripe',{
        'version':VersionMap['Stripe']
      })
    },
  },
  ['Lodash']:{
    enable() {
        const lodashScript = document.createElement("script")
        lodashScript.setAttribute("src",`lodash@${VersionMap['Lodash']}.js`)
        document.head.appendChild(lodashScript)
        defineWindowProperty('_',{
          'VERSION':VersionMap['Lodash']
        })
    },
  },
  ['Docusaurus']:{
    enable() {
        createMeta({
          generator:`Docusaurus v${VersionMap['Docusaurus']}`
        })
    },
  },
  ['Ionic']:{
    enable() {
        defineWindowProperty("Ionic",{
          'version':VersionMap['Ionic']
        })
    },
  },
  ['Dokeos']:{
    enable() {
        createMeta({
          "generator":"Dokeos"
        })
    },
  },
  ['Download Monitor']:{
    enable() {
        createMeta({
          "dlm-version":VersionMap['Download-Monitor'] || "🤡"
        })
    },
  },
  ['D3']:{
    enable() {
        defineWindowProperty("d3",{
          'version':VersionMap['D3']
        })
    },
  },
  ['Astro']: {
    enable() {
      createMeta({
        "generator":`Astro v${VersionMap.Astro}`
      })
    }
  },
  ['Devfools']:{
    enable() {
        defineWindowProperty("__Devfools__",{
          'version':"🤡",
          all:Object.keys(allDevtools)
        })
    },
  }
} satisfies { [key: string]: Config }
