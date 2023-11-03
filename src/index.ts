import { allDevtools } from './devtools'

const isClient = typeof window !== 'undefined'

export type Devtools = keyof typeof allDevtools | 'all'
export function devfools(devtools: 'all'): void
export function devfools(...devtools: Devtools[]): void
export function devfools(...devtools: Devtools[]) {
  if (!isClient) return
  if (devtools.length === 1 && devtools[0] === 'all')
    return Object.keys(allDevtools).forEach((devtools) =>
      allDevtools[devtools as Exclude<Devtools, 'all'>].enable(),
    )

  devtools.forEach((devtool) => {
    if (devtool === 'all') return
    allDevtools[devtool].enable()
  })
}

export default devfools
