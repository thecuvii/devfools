# Devfools

A tool that fools all kinds of devtools detection.

![](https://github.com/withyellow/devfools/assets/41265413/296df711-9070-4483-9f46-f0ca3fa910f9)

## Install

```shell

npm install devfools
yarn add devfools
pnpm install devfools
bun install devfools

```

## Usage

```ts
import devfools from 'devfools'

// or "antd" | "manoco" | "next" | "vite" | "vitepress" | "element" | "solid" | "react" | "nuxt" | "vue" | "svelte" | "angular" | "redux" | "motion" | "mobx" | "tailwind" | "naive" | "codemirror" | .... | "all"
devfools('vue', 'react', 'next')
```

Or

```ts
devfools('all') // to enable all fake
```

Don't use it, it's just a joke. 🤡
