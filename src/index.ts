const isClient = typeof window !== "undefined";

declare const window: any;

const allDevtools = {
  react: () => {
    if (!isClient) return;
    Object.defineProperty(window, "__REACT_DEVTOOLS_ATTACH__", {
      enumerable: false,
      // This property needs to be configurable to allow third-party integrations
      // to attach their own renderer. Note that using third-party integrations
      // is not officially supported. Use at your own risk.
      configurable: true,
      get() {
        return {};
      },
    });

    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      try {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
          reconcilerVersion: "100.666",
        });
      } catch {}
    }
  },
  nuxt: () => {
    const $nuxt = {
      config: {},
      data: {},
      path: "/",
      state: {},
      serverRendered: true,
      $root: {
        constructor: {
          config: {
            devtools: false,
          },
        },
      },
    };

    isClient && (window.$nuxt = $nuxt);
  },
  vue: () => {
    isClient && (window.__VUE__ = "🤡");
  },
  svelte: () => {
    isClient &&
      (window.__svelte = {
        v: new Set("🤡"),
      });
  },
  angular: () => {
    isClient && document.body.setAttribute("ng-version", "🤡");
  },
  redux: () => {
    isClient &&
      (window.__REDUX_DEVTOOLS_EXTENSION__ = {
        connect: () => "🤡",
      });
  },
  motion: () => {
    window.__MOTION_DEV_TOOLS = "🤡";
  },
};

export type Devtools = keyof typeof allDevtools | "all";

export const devfools = (devtools: Devtools) => {
  if (devtools === "all")
    return Object.keys(allDevtools).forEach((devtools) =>
      allDevtools[devtools as Exclude<Devtools, "all">]()
    );
  allDevtools[devtools]?.();
};

export default devfools;
