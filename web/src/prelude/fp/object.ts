import { array } from 'fp-ts'
import { FunctionN } from 'fp-ts/lib/function'
import { snoc } from 'fp-ts/lib/Array'

export const prop = <A, B extends keyof A>(key: B) => (object: A): A[B] => object[key]

export const mapKeysC = <A, B extends Record<string, keyof A>>(map: B) => (object: A) =>
  mapKeys(object, map)

/**
 * Using a map object
 * @param object
 * @param map
 */
export const mapKeys = <A, B extends Record<string, keyof A>>(
  object: A,
  map: B
): { [K in keyof B]: A[B[K]] } => {
  const entries = Object.entries<keyof A>(map) as [keyof B, keyof A][]
  const newEntries = array.array.map(entries, ([newKey, oldKey]) => ({ [newKey]: object[oldKey] }))
  return Object.assign({}, ...newEntries)
}

/**
 * This function build a make function allowing to exclude one or more keys.
 * You must provide values for each omitted key
 *
 * Example:
 * ```
 * interface Person {
 *   gender: 'male' | 'female' | 'other'
 *   ageClass: 'adult' | 'kid' | 'baby'
 *   name: string
 * }
 *
 * interface MaleAdultPerson extends Person {
 *   gender: 'male'
 *   ageClass: 'adult
 * }
 *
 * const makerOmittingGenderAndAgeClass =  makerOmitting(['gender', 'ageClass'])
 *
 * const makeMaleAdult = makerOmittingGenderAndAgeClass<Person>({ gender: 'male', ageClass: 'adult' })
 *
 * const maleAdult = makeMaleAdult({ name: 'John Doe' })
 * ```
 *
 * @param _omittedKeys array of keys that you want to exclude from your make signature
 */
export const makerOmitting = <T extends string>(_omittedKeys: T[]) => <A extends WithKeys<A, T>>(
  omitted: Pick<A, T>
) => (params: Omit<A, T>): A => ({ ...params, ...omitted } as A)

/**
 * helper built on top of makerOmitting
 * Usage
 * ```
 * interface Foo {
 *   type: 'foo'
 *   bar: string
 *   baz: number
 * }
 *
 * const makeFoo = makerOmittingType<Foo>('foo')
 *
 * const foo = makeFoo({ bar: 'bar', baz: 1 })
 * ```
 * @param type
 */
export const makerOmittingType = <A extends WithKeys<A, 'type'>>(type: A['type']) =>
  makerOmitting<'type'>(['type'])({ type })

export const makerOmittingKind = <A extends WithKeys<A, 'kind'>>(kind: A['kind']) =>
  makerOmitting<'kind'>(['kind'])({ kind })

export const makerOmittingTag = <A extends WithKeys<A, 'tag'>>(tag: A['tag']) =>
  makerOmitting<'tag'>(['tag'])({ tag })

export const objectKeys = <O extends object>(o: O): (keyof O)[] => Object.keys(o) as (keyof O)[]

export const toKeyedObject = <K extends string>(key: K) => <A>(a: A): { [k in K]: A } =>
  ({ [key]: a } as { [k in K]: A })

/**
 * Enable widening of smart ctors
 */
export const widenCtor = <C>() => <F extends (...a: any) => C>(
  f: F
): FunctionN<Parameters<typeof f>, C> => f

/**
 * Structurally preserving mapper.
 * First input is a dictionnary of values.
 * Second input is a dictionnary with the same entries as the first one with functions to apply
 * Result is the application of those functions with thoses values with exact type and preserving object structure
 *
 */

export const mapStructure = <Values extends { [k: string]: any }>(xs: Values) => <
  X extends { [k in keyof typeof xs]: (p: typeof xs[k]) => any }
>(
  mapper: X
): {
  [k in keyof typeof xs]: ReturnType<typeof mapper[k]>
} => {
  const res = {} as { [k in keyof typeof xs]: ReturnType<typeof mapper[k]> }
  const kKeys: (keyof typeof xs)[] = Object.keys(xs)
  for (const k of kKeys) {
    const f: ReturnType<typeof mapper[typeof k]> = mapper[k](xs[k])
    res[k] = f
  }
  return res
}

/**
 * Provide a means to apply a function as a parameter of another function while preserving inference.
 * Act as a precise type magnet.
 */
export const preciseFun = <T, U>(f: (t: T) => U) => <V>(x: (g: typeof f) => V) => x(f)
export const preciseFun2 = <T, T2, U>(f: (t: T, t2: T2) => U) => <V>(x: (g: typeof f) => V) => x(f)
export const preciseFun3 = <T, T2, T3, U>(f: (t: T, t2: T2, t3: T3) => U) => <V>(
  x: (g: typeof f) => V
) => x(f)

/**
 * Ensure object R is cover by object T
 */
export const ensureCoversKeys = <T extends object>(_o: T) => <R extends Record<keyof T, any>>(
  x: R
): typeof x => x

/**
 * Applies a function to all properties of an object
 */
export const mapPropsUncurried = <O, U>(f: (t: Values<O>) => U, o: O): { [k in keyof O]: U } => {
  type KO = keyof O
  const res = {} as { [k in KO]: U }
  const keys = Object.keys(o) as KO[]
  const len = keys.length
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    res[k] = f(o[k])
  }
  return res
}

export const mapProps = <T>() => <U>(f: (t: T) => U) => <O>(
  o: { [k in keyof O]: T }
): { [k in keyof O]: U } => mapPropsUncurried(f, o)

export const mapKeysProps = <O extends object>(o: O) => <U>(
  f: (k: keyof O, t: O[keyof O]) => U
): { [k in keyof O]: U } => {
  type KO = keyof O
  const res = {} as { [k in KO]: U }
  const keys = Object.keys(o) as KO[]
  const len = keys.length
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    res[k] = f(k, o[k])
  }
  return res
}

export const filterProps = <P extends object>(...ps: P[]) => {
  const allKeys = ps.map(o => Object.keys(o)) as (keyof P)[][]
  const plen = ps.length
  return <T>(x: T): x is Extract<typeof x, P> => {
    for (let i = 0; i < plen; i++) {
      const pKeys = allKeys[i]
      const p = ps[i]
      let valid = true
      for (const k of pKeys) {
        if ((x as any)[k] !== p[k]) {
          valid = false
        }
      }
      if (valid) {
        return true
      }
    }
    return false
  }
}

export const toTuples = <O>(o: O): { [k in keyof O]: [k, O[k]] } => {
  const res = {} as { [k in keyof O]: [k, O[k]] }
  type KO = keyof O
  const keys = Object.keys(o) as KO[]
  const len = keys.length
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    res[k] = [k, o[k]]
  }
  return res
}

export const toTuplesArray = <O>(o: O): [keyof O, O[keyof O]][] => {
  const res = [] as [keyof O, O[keyof O]][]
  type KO = keyof O
  const keys = Object.keys(o) as KO[]
  const len = keys.length
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    res.push([k, o[k]])
  }
  return res
}

export const fromTuples = <O extends { [k in keyof O]: [any, any] }>(
  o: O
): { [k in keyof O]: O[k]['1'] } => {
  type KO = keyof O
  const res = {} as { [k in keyof O]: O[k]['1'] }
  const keys = Object.keys(o) as KO[]
  const len = keys.length
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    res[k] = o[k]['1']
  }
  return res
}

export const mapKeyProps = <O>() => <U>(
  o: { [k in keyof O]: O[k] },
  f: (k: keyof O, t: O[keyof O]) => U
): { [k in keyof O]: U } => {
  type KO = keyof O
  const res = {} as { [k in KO]: U }
  const keys = Object.keys(o) as KO[]
  const len = keys.length
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    res[k] = f(k, o[k])
  }
  return res
}

export const values = <O>(x: O): O[keyof O][] => {
  const keys = Object.keys(x) as (keyof O)[]
  const len = keys.length
  const r: (O[keyof O])[] = Array(len)
  for (let i = 0; i < len; i++) {
    r[i] = x[keys[i]]
  }
  return r
}

export const mergeObjects = <O>(os: { [k in keyof O]: O[k] }[]) => <U>(
  reduceValues: (xs: O[keyof O][]) => U
): { [k in keyof O]: U } => {
  const tmp = {} as { [k in keyof O]: O[keyof O][] }
  for (const o of os) {
    for (const k in o) {
      if (o.hasOwnProperty(k)) {
        tmp[k] = snoc(tmp[k] || [], o[k])
      }
    }
  }
  const res = {} as { [k in keyof O]: U }
  for (const k in tmp) {
    if (tmp.hasOwnProperty(k)) {
      const v = tmp[k]
      res[k] = reduceValues(v !== undefined ? v : [])
    }
  }
  return res
}

export const fromValues = <K extends string | number | symbol, T>(
  vs: [K, T][]
): { [k in K]: T } => {
  const res: { [k in K]: T } = {} as any
  const len = vs.length
  for (let i = 0; i < len; i++) {
    const e = vs[i]
    res[e[0]] = e[1]
  }
  return res
}

export const deepValues = <K extends string, V>(x: { [k in K]: V }): V[] => {
  const keys = Object.keys(x) as K[]
  const len = keys.length
  const r: V[] = Array(len)
  for (let i = 0; i < len; i++) {
    r[i] = x[keys[i]]
  }
  return r
}

export const filterKeys = <Keys extends string>(keys: Keys[]) => <T extends { [k in Keys]?: any }>(
  obj: T
): Pick<typeof obj, Keys> => {
  const res: Pick<T, Keys> = {} as Pick<T, Keys>
  for (const key of keys) {
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key]
    }
  }
  return res
}

export const excludeKeys = <O extends object>(o: O) => <K extends keyof typeof o>(
  ...keys: K[]
): { [k in Exclude<keyof O, K>]: typeof o[k] } => {
  const res = {} as { [k in Exclude<keyof O, K>]: typeof o[k] }
  const okeys = Object.keys(o) as (keyof O)[]
  for (const k of okeys) {
    if (keys.indexOf(k as any) === -1 && o.hasOwnProperty(k)) {
      ;(res as any)[k] = o[k]
    }
  }
  return res
}

export const withoutKeys = <K extends string>(...keys: K[]) => <O extends object = never>(
  o: O & { [k in K]: any }
): O => {
  const res = {} as O
  const okeys = Object.keys(o) as (keyof typeof o)[]
  for (const k of okeys) {
    if (keys.indexOf(k as any) === -1 && o.hasOwnProperty(k)) {
      ;(res as any)[k] = o[k]
    }
  }
  return res
}

// export const values = <O>(x: O): O[keyof O][] => {
//   const keys = Object.keys(x) as (keyof O)[]
//   const len = keys.length
//   const r: (O[keyof O])[] = Array(len)
//   for (let i = 0; i < len; i++) {
//     r[i] = x[keys[i]]
//   }
//   return r
// }

// export const deepValues = <K extends string, V>(x: { [k in K]: V }): V[] => {
//   const keys = Object.keys(x) as K[]
//   const len = keys.length
//   const r: V[] = Array(len)
//   for (let i = 0; i < len; i++) {
//     r[i] = x[keys[i]]
//   }
//   return r
// }

export type WithKeys<A, K extends keyof A> = { [k in K]: unknown }

export type Diff<T extends PropertyKey, U extends PropertyKey> = ({ [P in T]: P } &
  { [P in U]: never } &
  { [x in PropertyKey]: never })[T]

export type Omit<T, K extends string> = Pick<T, Diff<keyof T, K>>

export type Subtract<U extends T, T> = { [k in Exclude<keyof U, keyof T>]: U[k] }

export type Detailed<O> = { [k in keyof O]: O[k] }

export type SameKeys<A extends {}, B extends {}> = {
  [P in keyof B]: P extends keyof A ? any : never
}

export type ExactSameKeys<A extends {}, B extends {}> = SameKeys<A, B> & SameKeys<B, A>

export type SharedKeys<A extends {}, B extends {}> = SameKeys<A, B> | SameKeys<B, A>

export type WithoutSameKeys<A extends {}, B extends {}> = {
  [P in keyof B]: P extends keyof A ? never : B[P]
}

export const ofType = <T>(): T => 1 as any // white lie

export type TFalse = 'F'
export type TTrue = 'T'
export type TBool = TTrue | TFalse

export type ObjectHas<O, K extends string> = ({ [k in keyof O]: 'T' } & {
  [k: string]: 'F'
})[K]

export type And<TBA extends TBool, TBB extends TBool> = ({
  ['T']: TBB
  ['F']: 'F'
})[TBA]

export type If<Cond extends TBool, Then, Else> = ({
  ['T']: Then
  ['F']: Else
})[Cond]

export type Values<O> = O[keyof O]

export type SubOf<A, B extends A> = A & B

export type EnsureTag<T, Key extends string, KeyType> = T & { [k in Key]: KeyType }
/*If <
  ObjectHas<T, Key>,
  T,
  T & { [k in Key]: KeyType }
>*/

export type EnsureNoTag<T, Key extends string> = If<ObjectHas<T, Key>, Omit<T, Key>, T>

export type IsTrue<T extends TTrue> = T
export type Same<A, B extends A> = A extends B ? TTrue : TFalse

// // PLAYGROUND

// // Checks that B is a subset of A (no extra properties)

// type Subset<A extends {}, B extends {}> = {
//   [P in keyof B]: P extends keyof A ? (B[P] extends A[P] | undefined ? A[P] : never) : never
// }

// const sameKeys = <T extends ExactSameKeys<BaseOptions, T>>(_options: T) => {
//   //
// }

// // This can be used to implement partially strict typing e.g.:
// // ('b?:' is where the behaviour differs with optional b)
// // tslint:disable-next-line:interface-over-type-literal
// type BaseOptions = { a: string; b: number }

// // Checks there are no extra properties (Not More, Less fine)
// const noMore = <T extends Subset<BaseOptions, T>>(_options: T) => {
//   //
// }
// noMore({ a: 'hi', b: 4 }) //Fine
// // noMore({ a: 5, b: 4 })           //Error
// // noMore({ a: "o", b: "hello" })   //Error
// noMore({ a: 'o' }) //Fine
// noMore({ b: 4 }) //Fine
// // noMore({ a: "o", b: 4, c: 5 })   //Error

// // Checks there are not less properties (More fine, Not Less)
// const noLess = <T extends Subset<T, BaseOptions>>(_options: T) => {
//   //
// }
// noLess({ a: 'hi', b: 4 }) //Fine
// // noLess({ a: 5, b: 4 })           //Error
// // noLess({ a: "o", b: "hello" })   //Error
// // noLess({ a: "o" })               //Error  |b?: Fine
// // noLess({ b: 4 })                 //Error
// noLess({ a: 'o', b: 4, c: 5 }) //Fine

// // We can use these together to get a fully strict type (Not More, Not Less)
// type Strict<A extends {}, B extends {}> = Subset<A, B> & Subset<B, A>
// const strict = <T extends Strict<BaseOptions, T>>(_options: T) => {
//   //
// }
// const strictGen = <O extends {}>() => <T extends Strict<O, T>>(_options: T) => {
//   //
// }
// strict({ a: 'hi', b: 4 }) //Fine
// // strict({ a: 5, b: 4 })           //Error
// // strict({ a: "o", b: "hello" })   //Error
// // strict({ a: "o" })               //Error  |b?: Fine
// // strict({ b: 4 })                 //Error
// // strict({ a: "o", b: 4, c: 5 })   //Error

// // Or a fully permissive type (More Fine, Less Fine)
// type Permissive<A extends {}, B extends {}> = Subset<A, B> | Subset<B, A>
// const permissive = <T extends Permissive<BaseOptions, T>>(_options: T) => {
//   //
// }
// permissive({ a: 'hi', b: 4 }) //Fine
// // permissive({ a: 5, b: 4 })           //Error
// // permissive({ a: "o", b: "hello" })   //Error
// permissive({ a: 'o' }) //Fine
// permissive({ b: 4 }) //Fine
// permissive({ a: 'o', b: 4, c: 5 }) //Fine

// // This is a little unweildy, there's also a shortform that works in many cases:
// type Exact<A extends {}> = Subset<A, A>
// // The simpler Exact type works for variable typing
// // const options0: Exact<BaseOptions> = { a: "hi", b: 4 }        //Fine
// // const options1: Exact<BaseOptions> = { a: 5, b: 4 }           //Error
// // const options2: Exact<BaseOptions> = { a: "o", b: "hello" }   //Error
// // const options3: Exact<BaseOptions> = { a: "o" }               //Error |b?: Fine
// // const options4: Exact<BaseOptions> = { b: 4 }                 //Error
// // const options5: Exact<BaseOptions> = { a: "o", b: 4, c: 5 }   //Error

// // It also works for function typing when using an inline value
// const exact = (_options: Exact<BaseOptions>) => {
//   //
// }
// exact({ a: 'hi', b: 4 }) //Fine
// // exact({ a: 5, b: 4 })           //Error
// // exact({ a: "o", b: "hello" })   //Error
// // exact({ a: "o" })               //Error  |b?: Fine
// // exact({ b: 4 })                 //Error
// // exact({ a: "o", b: 4, c: 5 })   //Error

// // But not when using a variable as an argument even of the same type
// const options6 = { a: 'hi', b: 4 }
// // const options7 = { a: 5, b: 4 }
// // const options8 = { a: "o", b: "hello" }
// // const options9 = { a: "o" }
// // const options10 = { b: 4 }
// const options11 = { a: 'o', b: 4, c: 5 }
// exact(options6) //Fine
// // exact(options7)                 //Error
// // exact(options8)                 //Error
// // exact(options9)                 //Error |b?: Fine
// // exact(options10)                //Error
// exact(options11) //Fine  -- Should not be Fine

// // However using strict does work for that
// // const strict = <T extends Strict<BaseOptions, T>>(options: T) => { }
// strict(options6) //Fine
// // strict(options7)                //Error
// // strict(options8)                //Error
// // strict(options9)                //Error |b?: Fine
// // strict(options10)               //Error
// // strict(options11)               //Error -- Is correctly Error

// const strictG = strictGen<BaseOptions>()
// strictG(options6)

// sameKeys(options6)
// // sameKeys(options11)
