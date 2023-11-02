const isClient = typeof window !== "undefined";

const allDevtools = {
  nuxt: () => {
    // @ts-ignore I'm nuxt
    isClient && (window.$nuxt = "🤡");
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

type Devtools = keyof typeof allDevtools;

export default function devtuls(devtools: Devtools) {
  allDevtools[devtools]?.();
}
