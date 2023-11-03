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
      version: '14.0.0',
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
  mobx: () => {
    defineWindowProperty('__mobxGlobal', '1')
    defineWindowProperty('__mobxInstanceCount', '1')
    defineWindowProperty('__mobxGlobals', '1')
  },
  tailwind: () => {
    defineWindowProperty('tailwind', '🤡')
  },
  antd: () => {
    defineWindowProperty('antd', {
      version: '100.0.0',
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
      version: '116.0.0',
    })
  },
}

export type Devtools = keyof typeof allDevtools | 'all'

export const devfools = (devtools: Devtools) => {
  if (!isClient) return
  if (devtools === 'all')
    return Object.keys(allDevtools).forEach((devtools) =>
      allDevtools[devtools as Exclude<Devtools, 'all'>](),
    )
  allDevtools[devtools]?.()
}

export default devfools
