const isClient = typeof window !== "undefined";

const allDevtools = {
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

    // @ts-ignore I'm nuxt
    isClient && (window.$nuxt = $nuxt);
  },
  vue: () => {
    // @ts-ignore I'm vue
    isClient && (window.__VUE__ = "🤡");
  },
  svelte: () => {
    isClient &&
      // @ts-ignore I'm svelte
      (window.__svelte = {
        v: new Set("🤡"),
      });
  },
  angular: () => {
    isClient && document.body.setAttribute("ng-version", "🤡");
  },
  redux: () => {
    isClient &&
      // @ts-ignore I'm redux
      (window.__REDUX_DEVTOOLS_EXTENSION__ = {
        connect: () => "🤡",
      });
  },
  motion: () => {
    // @ts-ignore I'm motion
    window.__MOTION_DEV_TOOLS = "🤡";
  },
};

export type Devtools = keyof typeof allDevtools | "all";

export const devtuls = (devtools: Devtools) => {
  if (devtools === "all")
    return Object.keys(allDevtools).forEach((devtools) =>
      allDevtools[devtools](),
    );
  allDevtools[devtools]?.();
};

export default devtuls;
