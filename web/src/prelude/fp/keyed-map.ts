import * as arrays from 'fp-ts/lib/Array'
import { Foldable, Foldable1, Foldable2, Foldable3 } from 'fp-ts/lib/Foldable'
import { Predicate } from 'fp-ts/lib/function'
import { Functor, Functor1, Functor2, Functor3 } from 'fp-ts/lib/Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Option } from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'
import * as R from 'fp-ts/lib/Record'
import { filter, lookup as lookupRecord, map, mapWithIndex, reduce } from 'fp-ts/lib/Record'
import { Iso } from 'monocle-ts'

export interface KeyedMapDic<IdKey extends keyof A, A> {
  readonly idKey: IdKey
  readonly idIso: Iso<A[IdKey], string>
}

export const KeyedMapDic = <A>() => <IdKey extends keyof A>(d: KeyedMapDic<IdKey, A>) => d

/*
  https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts
*/
export class KeyedMap<IdKey extends keyof A, A> {
  constructor(readonly strmap: Record<string, A>, readonly idDic: KeyedMapDic<IdKey, A>) {}

  mapWithKey<B>(f: (k: A[IdKey], a: A) => B): Record<string, B> {
    return mapWithIndex((id, a: A) => f(this.idDic.idIso.reverseGet(id), a))(this.strmap)
  }
  map<B>(f: (a: A) => B): Record<string, B> {
    return map(f)(this.strmap)
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return reduce(b, f)(this.strmap)
  }
  /**
   * @since 1.4.0
   */
  filter(p: Predicate<A>): Record<string, A> {
    return filter(p)(this.strmap)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const toArray = <A>(ordA: Ord<A>) => <IdKey extends keyof A>(
  d: KeyedMap<IdKey, A>
): Array<A> => arrays.sort(ordA)(R.toArray(d.strmap).map(([_, v]) => v))

/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 * @function
 * @since 1.0.0
 */
//tslint:disable:only-arrow-functions
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F> & Functor3<F>
): <U, L, A>() => <IdKey extends keyof A>(
  idDic: KeyedMapDic<IdKey, A>
) => (ta: Kind3<F, U, L, A>, f: (existing: A, a: A) => A) => KeyedMap<IdKey, A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F> & Functor2<F>
): <L, A>() => <IdKey extends keyof A>(
  idDic: KeyedMapDic<IdKey, A>
) => (ta: Kind2<F, L, A>, f: (existing: A, a: A) => A) => KeyedMap<IdKey, A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F> & Functor1<F>
): <A>() => <IdKey extends keyof A>(
  idDic: KeyedMapDic<IdKey, A>
) => (ta: Kind<F, A>, f: (existing: A, a: A) => A) => KeyedMap<IdKey, A>
export function fromFoldable<F>(
  F: Foldable<F> & Functor<F>
): <A>() => <IdKey extends keyof A>(
  idDic: KeyedMapDic<IdKey, A>
) => (ta: HKT<F, A>, f: (existing: A, a: A) => A) => KeyedMap<IdKey, A>
export function fromFoldable<F>(
  F: Foldable<F> & Functor<F>
): <A>() => <IdKey extends keyof A>(
  idDic: KeyedMapDic<IdKey, A>
) => (ta: HKT<F, A>, f: (existing: A, a: A) => A) => KeyedMap<IdKey, A> {
  return fromFoldableImpl(F)
}

export const fromFoldableImpl = <F>(F: Foldable<F> & Functor<F>) => <A>() => <
  IdKey extends keyof A
>(
  idDic: KeyedMapDic<IdKey, A>
): ((ta: HKT<F, A>, f: (existing: A, a: A) => A) => KeyedMap<IdKey, A>) => (ta, f) => {
  const fromFoldableF = R.fromFoldable({ concat: f }, F)
  const tta: HKT<F, [string, A]> = F.map<A, [string, A]>(ta, e => [
    idDic.idIso.get(e[idDic.idKey]),
    e
  ])
  return new KeyedMap(fromFoldableF(tta), idDic)
}

const keyFor = <A, KeyId extends keyof A>(a: A, d: KeyedMap<KeyId, A>): string =>
  d.idDic.idIso.get(a[d.idDic.idKey])

/**
 * Insert or replace a key/value pair in a map
 * @function
 * @since 1.0.0
 */
export const insert = <A, KeyId extends keyof A>(a: A, d: KeyedMap<KeyId, A>): KeyedMap<KeyId, A> =>
  new KeyedMap(R.insertAt(keyFor(a, d), a)(d.strmap), d.idDic)

/**
 * Delete a key and value from a map
 * @function
 * @since 1.0.0
 */
export const remove = <A, KeyId extends keyof A>(
  k: A[KeyId],
  d: KeyedMap<KeyId, A>
): KeyedMap<KeyId, A> => new KeyedMap(R.deleteAt(d.idDic.idIso.get(k))(d.strmap), d.idDic)

/**
 * Lookup the value for a key in a dictionary
 * @function
 * @since 1.0.0
 */
export const lookup = <A, KeyId extends keyof A>(k: A[KeyId], d: KeyedMap<KeyId, A>): Option<A> =>
  lookupRecord(d.idDic.idIso.get(k), d.strmap)
