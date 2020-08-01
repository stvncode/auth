import * as pino from 'pino'
import { runEffect, runEffectsOnFunc } from '../fp/function'
export { pino }
/**
 * The logger interface.
 * temporary implementation
 * Loosely rely on console.log signature
 */
export type Logger = pino.Logger

// export const LoggerConsole: pino.Logger = {
//   log: (message?: any, ...optionalParams: any[]) => {
//     console.log(message, ...optionalParams)
//   }
// }

// Curried logger
// export const log = (message: string) => (x: any) => console.log(message, x)

export const log = (message: string) => <A>(a: A): A =>
  runEffect<A>(a => console.log(message, a))(a)

export const logFunc = (inputM: string, outputM: string) => <I, O>(f: (i: I) => O) =>
  runEffectsOnFunc<I, O>(
    i => console.log(inputM, i),
    o => console.log(outputM, o)
  )(f)

export const logF = logFunc('ARG', 'RETURN')

export const makeLogger = (condition: boolean) => (prefix: string, localCondition?: boolean) => (
  ...args: any[]
) => {
  if (condition || localCondition !== false) {
    console.log(`[${prefix}]`, ...args)
  }
}
