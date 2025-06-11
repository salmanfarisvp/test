<h1 align="center">@jsheaven/status-message</h1>

> Prints colorful status messages to the console

<h2 align="center">User Stories</h2>

1. As a developer, I don't want to format log messages again and again using tags, ASCII color and `console` API

<h2 align="center">Features</h2>

- ✅ Does offer colorful logging function
- ✅ Severities are: `error(...)`, `warn(...)`, `log(...)`, `info(...)`, `debug(...)`, `trace(...)`
- ✅ Duration time measurements: `time(label: string)`, `timeEnd(label: string)`
- ✅ Uses the correct `console` API functions automatically (per severity)
- ✅ Beautiful loading spinner animation
- ✅ Ability to rewind and clear the previous line (custom animations)
- ✅ Available as a simple API
- ✅ Just `535 byte` nano sized (ESM, gizpped)
- ✅ Tree-shakable and side-effect free
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Example usage (API)</h2>

<h3 align="center">Setup</h3>

- yarn: `yarn add @jsheaven/status-message`
- npm: `npm install @jsheaven/status-message`

<h3 align="center">ESM</h3>

```ts
import { log, error, warn, info, debug, trace, time, timeEnd, spinner } from '@jsheaven/status-message'

time('Log every feature')

error('FATAL', 'You did not use this library yet')
warn('DANGER', 'Other logging libraries do not support arbitrary args', { right: true }, process.version)
log('SUCCESS', 'But this lib is only 361 bytes and has it all')
info('NOTE', 'It even has 100% test coverage')
debug('DEBUG', 'It is even tree-shakable')
trace('DURATION', 'You can trace the runtime of a task easily too:')

timeEnd('Log every feature')
```

<h3 align="center">Advanced use-cases</h3>

<h4 align="center">Loading spinner</h4>

```ts
const stopAnimation = spinner('Loading...')
await(async () => new Promise((resolve) => setTimeout(resolve, 2000)))()
stopAnimation()
```

<h4 align="center">Updating a value by clearing the previous line</h4>

```ts
let i = 1
const countTo100 = setInterval(() => {
  if (i > 1) clearPrevLine()
  info('COUNT', i)
  i++
  if (i > 100) clearInterval(countTo100)
}, 25)
```

<h4 align="center">Clearing 20 lines of the screen</h4>

```ts
for (let i = 0; i < 20; i++) clearPrevLine()
```

<img src="output.png" height="400px" />

<h3 align="center">CommonJS</h3>

```ts
const { log, logTime, logTimeEnd } = require('@jsheaven/status-message')

// same API like ESM variant
```
