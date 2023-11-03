import { writeFileSync } from 'node:fs'
import { allDevtools } from '../src/devtools'
import version from 'latest-version'
import { join } from 'node:path'
;(async () => {
  const ret: Record<string, string> = {}

  await Promise.all(
    Object.entries(allDevtools).map(async ([name, config]) => {
      if ('packageName' in config) {
        const packageName =
          config.packageName === true ? name : config.packageName
        ret[name] = await version(packageName)
      }
    }),
  )

  console.log(ret)

  writeFileSync(
    join(__dirname, '../src/version.json'),
    JSON.stringify(ret, null, 2) || '{}',
  )
})()
