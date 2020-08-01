import { array } from 'fp-ts/lib/Array'
import { FunctionN, identity, Predicate, Refinement } from 'fp-ts/lib/function'

// tslint:disable: only-arrow-functions

export function or<A, B1 extends A, B2 extends A>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>
): Refinement<A, B1 | B2>
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
export function or<A, B1 extends A, B2 extends A, B3 extends A>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>,
  p3: Refinement<A, B3>
): Refinement<A, B1 | B2 | B3>
export function or<A, B1 extends A, B2 extends A, B3 extends A, B4 extends A>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>,
  p3: Refinement<A, B3>,
  p4: Refinement<A, B4>
): Refinement<A, B1 | B2 | B3 | B4>
export function or<A, B1 extends A, B2 extends A, B3 extends A, B4 extends A, B5 extends A>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>,
  p3: Refinement<A, B3>,
  p4: Refinement<A, B4>,
  p5: Refinement<A, B5>
): Refinement<A, B1 | B2 | B3 | B4 | B5>
export function or<
  A,
  B1 extends A,
  B2 extends A,
  B3 extends A,
  B4 extends A,
  B5 extends A,
  B6 extends A,
  B7 extends A
>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>,
  p3: Refinement<A, B3>,
  p4: Refinement<A, B4>,
  p5: Refinement<A, B5>,
  p6: Refinement<A, B6>,
  p7: Refinement<A, B7>
): Refinement<A, B1 | B2 | B3 | B4 | B5 | B6 | B7>
export function or<
  A,
  B1 extends A,
  B2 extends A,
  B3 extends A,
  B4 extends A,
  B5 extends A,
  B6 extends A,
  B7 extends A,
  B8 extends A
>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>,
  p3: Refinement<A, B3>,
  p4: Refinement<A, B4>,
  p5: Refinement<A, B5>,
  p6: Refinement<A, B6>,
  p7: Refinement<A, B7>,
  p8: Refinement<A, B8>
): Refinement<A, B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8>
export function or<
  A,
  B1 extends A,
  B2 extends A,
  B3 extends A,
  B4 extends A,
  B5 extends A,
  B6 extends A,
  B7 extends A,
  B8 extends A,
  B9 extends A,
  B10 extends A
>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>,
  p3: Refinement<A, B3>,
  p4: Refinement<A, B4>,
  p5: Refinement<A, B5>,
  p6: Refinement<A, B6>,
  p7: Refinement<A, B7>,
  p8: Refinement<A, B8>,
  p9: Refinement<A, B9>,
  p10: Refinement<A, B10>
): Refinement<A, B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10>
export function or<
  A,
  B1 extends A,
  B2 extends A,
  B3 extends A,
  B4 extends A,
  B5 extends A,
  B6 extends A,
  B7 extends A,
  B8 extends A,
  B9 extends A,
  B10 extends A,
  B11 extends A,
  B12 extends A,
  B13 extends A
>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>,
  p3: Refinement<A, B3>,
  p4: Refinement<A, B4>,
  p5: Refinement<A, B5>,
  p6: Refinement<A, B6>,
  p7: Refinement<A, B7>,
  p8: Refinement<A, B8>,
  p9: Refinement<A, B9>,
  p10: Refinement<A, B10>,
  p11: Refinement<A, B11>,
  p12: Refinement<A, B12>,
  p13: Refinement<A, B13>
): Refinement<A, B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10 | B11 | B12 | B13>
export function or<
  A,
  B1 extends A,
  B2 extends A,
  B3 extends A,
  B4 extends A,
  B5 extends A,
  B6 extends A,
  B7 extends A,
  B8 extends A,
  B9 extends A,
  B10 extends A,
  B11 extends A,
  B12 extends A,
  B13 extends A,
  B14 extends A
>(
  p1: Refinement<A, B1>,
  p2: Refinement<A, B2>,
  p3: Refinement<A, B3>,
  p4: Refinement<A, B4>,
  p5: Refinement<A, B5>,
  p6: Refinement<A, B6>,
  p7: Refinement<A, B7>,
  p8: Refinement<A, B8>,
  p9: Refinement<A, B9>,
  p10: Refinement<A, B10>,
  p11: Refinement<A, B11>,
  p12: Refinement<A, B12>,
  p13: Refinement<A, B13>,
  p14: Refinement<A, B14>
): Refinement<A, B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10 | B11 | B12 | B13 | B14>
export function or<A>(...ps: Predicate<A>[]) {
  return (x: A) => array.reduce(ps, false, (acc, p) => acc || p(x))
}

export function composeRefinement<A, B extends A, C extends B>(
  pab: Refinement<A, B>,
  pbc: Refinement<B, C>
): Refinement<A, C>
export function composeRefinement(
  pab: Predicate<unknown>,
  pbc: Predicate<unknown>
): Predicate<unknown> {
  return (a: unknown) => pab(a) && pbc(a)
}

export const makeRefinementComposition = <A, B extends A>(rab: Refinement<A, B>) => <C extends B>(
  rbc: Refinement<B, C>
): Refinement<A, C> => composeRefinement<A, B, C>(rab, rbc)

export const asRefinement = <A, B extends A = A>(predicate: Predicate<A>) =>
  predicate as Refinement<A, B>

export function not<A, B extends A>(predicate: Refinement<A, B>): Refinement<A, Exclude<A, B>>
export function not<A>(predicate: Predicate<A>): Predicate<A>
export function not(predicate: Predicate<unknown>): Predicate<unknown> {
  return a => !predicate(a)
}

export const and = <A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> => (x: A) => p1(x) && p2(x)

/**
 * Runs an effect and returns identity function
 * @param f
 */
export const runEffect = <A>(f: (a: A) => void) => (a: A): A => {
  f(a)
  return a
}

export const runEffectsOnFunc = <I, O>(fi: (i: I) => void, fo: (o: O) => void) => (
  f: (i: I) => O
) => (i: I): O => {
  fi(i)
  const o = f(i)
  fo(o)
  return o
}

export const coerce: <A extends B, B>(a: A) => B = identity

/** A type predicate that always returns false inferring that the argument is refined as never  */
export const neverPredicate = <A>(_a: A): _a is never => false

/**
 * Function taking any number of arguments and returning void
 */
export type VoidN<A extends unknown[]> = FunctionN<A, void>

/**
 * Function taking one argument and returning void
 */
export type Void<A> = VoidN<[A]>

/**
 * A thunk returning void
 */
export type VoidThunk = VoidN<[]>
/**
 * A thunk returning void
 */
export type Fun1<A, R> = FunctionN<[A], R>
export type Fun2<A, B, R> = FunctionN<[A, B], R>

// FIXME: This function might be redundant
export const isNil = <T>(s: T | null | undefined): s is null | undefined =>
  s === null || s === undefined
// FIXME: This function might be redundant
export const isNotNil = <T>(s: T | null | undefined): s is T => s !== null && s !== undefined

export type Curried<A extends unknown[], B> = A['length'] extends 0
  ? () => B
  : A['length'] extends 1
  ? (a: A[0]) => B
  : A['length'] extends 2
  ? (a: A[0]) => (a: A[1]) => B
  : 'Curried function for more than 2 arguments not available. You can add what you need at the type definition'

export type RefinementTarget<A> = A extends Refinement<any, infer U> ? U : never

export const flipC = <A, B, C>(c: Curried<[A, B], C>): Curried<[B, A], C> => b => a => c(a)(b)
