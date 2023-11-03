import { VersionMap } from './version'

const isClient = typeof window !== 'undefined'

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

const allDevtools = {
  next: () => {
    allDevtools.react()
    defineWindowProperty('next', {
      version: VersionMap.next,
    })
  },
  vite: () => {
    defineWindowProperty('__vite_is_modern_browser', true)
  },
  vitepress: () => {
    defineWindowProperty('__VP_HASH_MAP__', true)
    defineWindowProperty('__vitepress', true)
  },
  element: () => {
    const $div = document.createElement('div')
    $div.classList.add('el-table-column')
    document.body.appendChild($div)
  },

  solid: () => {
    defineWindowProperty('__SOLID_DEVTOOLS__', true)
    defineWindowProperty('Solid$$', true)
  },
  react: () => {
    defineWindowProperty('__REACT_DEVTOOLS_ATTACH__', {})

    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      try {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
          reconcilerVersion: '100.666',
        })
      } catch {}
    }
  },
  nuxt: () => {
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
  vue: () => {
    defineWindowProperty('__VUE__', true)
  },
  svelte: () => {
    defineWindowProperty('__svelte', {
      v: new Set('🤡'),
    })
  },
  angular: () => {
    document.body.setAttribute('ng-version', '🤡')
  },
  redux: () => {
    defineWindowProperty('__REDUX_DEVTOOLS_EXTENSION__', {
      connect: () => '🤡',
    })
  },
  motion: () => {
    defineWindowProperty('__MOTION_DEV_TOOLS__', '🤡')
  },
  framer: () => {
    defineWindowProperty('Framer', {
      version: '100',
      Animatable: true,
    })
    defineWindowProperty('__framer_importFromPackage', true)
  },
  gsap: () => {
    defineWindowProperty('gsap', {
      version: VersionMap.gsap,
    })
  },
  three: () => {
    defineWindowProperty('THREE', {
      REVISION: VersionMap.THREE,
    })
  },
  mobx: () => {
    defineWindowProperty('__mobxGlobal', '1')
    defineWindowProperty('__mobxInstanceCount', '1')
    defineWindowProperty('__mobxGlobals', '1')
  },
  tailwind: () => {
    defineWindowProperty('tailwind', '🤡')
  },
  rive: () => {
    defineWindowProperty('rive', {
      Rive: '',
    })
  },
  antd: () => {
    defineWindowProperty('antd', {
      version: VersionMap.antd,
    })
  },
  naive: () => {
    const $style = document.createElement('style')
    $style.setAttribute('cssr-id', 'n-skeleton')
    $style.innerHTML = `.n-skeleton {}`
    document.head.appendChild($style)
  },
  manoco: () => {
    defineWindowProperty('MonacoEnvironment', {})
    defineWindowProperty('manoco', { editor: {} })
  },
  codemirror: () => {
    defineWindowProperty('CodeMirror', {
      version: VersionMap.CodeMirror,
    })
  },
  vuepress: () => {
    defineWindowProperty('__VUEPRESS__', {
      version: VersionMap.vuepress,
    })
  },
  remix: () => {
    defineWindowProperty('__remixContext', {})
  },
  nextui: () => {
    const $style = document.createElement('style')
    $style.innerHTML = `#fake-devfools {--nextui-colors-text: #000}`
    document.head.appendChild($style)
  },
  material: () => {
    defineWindowProperty('ngMaterial', {})
  },
  pwa: () => {
    const $link = document.createElement('link')
    $link.setAttribute('rel', 'manifest')
    document.head.appendChild($link)
  },
  sentry: () => {
    defineWindowProperty('__SENTRY__', true)
    defineWindowProperty('Raven', {
      config: {},
    })
    defineWindowProperty('Sentry', {
      SDK_VERSION: VersionMap.sentry,
    })
  },
  styledComponent: () => {
    const $div = document.createElement('div')
    $div.setAttribute('sc-component-id', '🤡')
    document.body.appendChild($div)

    const $style = document.createElement('style')
    $style.setAttribute('data-styled-version', '🤡')
    document.head.appendChild($style)
  },
  webpack: () => {
    defineWindowProperty('webpackChunk', {})
  },
  googleAnalytics: () => {
    defineWindowProperty('gaGlobal', {})
    defineWindowProperty('GoogleAnalyticsObject', {})
  },
  umami: () => {
    defineWindowProperty('umami', {})
  },
  babel: () => {
    defineWindowProperty('_babelPolyfill', {})
  },
  hljs: () => {
    defineWindowProperty('hljs', {
      highlightBlock: {},
      listLanguages: ['javascript'],
    })
  },
  prism: () => {
    defineWindowProperty('Prism', {})
    defineWindowProperty('apex', {
      libVersions: { prismJs: { version: VersionMap.prism } },
    })
  },
}

export type Devtools = keyof typeof allDevtools | 'all'
export function devfools(devtools: 'all'): void
export function devfools(...devtools: Devtools[]): void
export function devfools(...devtools: Devtools[]) {
  if (!isClient) return
  if (devtools.length === 1 && devtools[0] === 'all')
    return Object.keys(allDevtools).forEach((devtools) =>
      allDevtools[devtools as Exclude<Devtools, 'all'>](),
    )

  devtools.forEach((devtool) => {
    if (devtool === 'all') return
    allDevtools[devtool]()
  })
}

export default devfools
