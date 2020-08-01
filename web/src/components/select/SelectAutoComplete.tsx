import { adoOption } from '../../prelude/fp/ado'
import { fromFoldable, KeyedMap, KeyedMapDic, lookup } from '../../prelude/fp/keyed-map'
import { Omit } from '../../prelude/fp/object'
import { SelectProps, SelectValue } from 'antd/lib/select'
import { array, eq, map, option, ord } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { getFirstSemigroup } from 'fp-ts/lib/Semigroup'
import { Iso } from 'monocle-ts'
import { OptionData, OptionGroupData } from 'rc-select/lib/interface'
import * as React from 'react'
import { classes } from 'typestyle'
import { overflowStyleSheet } from '../../core/styles/overflow'
import { ForwardRefInjectedProps, withRef } from '../../core/withRef'
import { Spin } from '../spin/Spin'
import { Option as SelectOption, Select } from './Select'
import { classNames } from './select-autocomplete.styles'

type Override = 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'onSelect' | 'onDeselect'

type RefCallback = (instance: any) => void

export interface SelectedProps<T> extends Omit<SelectProps<T>, Override> {}

export interface LinkedValue<T> {
  parent: T
  children: T[]
}

interface Props<idKey extends keyof T, T> {
  renderOption: (opt: T) => string
  renderParent?: (opt: T) => string
  renderIcon?: (opt: T) => React.ReactNode
  dataSource: Array<T>
  isLoading?: boolean
  identifier: idKey
  subGroups?: Map<T, T[]>
  iso: Iso<T[idKey], string>
  onSearch?: (query: string) => void
  value?: T[] | undefined
  defaultValue?: T[] | undefined
  onChange?: (val?: T[]) => void
  onBlur?: (val: T) => void
  onSelect?: (value: T, option: OptionData | OptionGroupData | undefined) => any
  onDeselect?: (value: T) => any
  onOptionHover?: (value?: T) => any
  onClear?: () => void
  isSubOption?: (val: T) => boolean
  linkedValues?: (val: T) => option.Option<LinkedValue<T>>
  ref?: React.RefObject<any> | null | RefCallback
}

export const Comp = <idKey extends keyof T, T extends {}>({
  renderOption,
  renderIcon,
  dataSource,
  isLoading,
  identifier,
  iso,
  value,
  defaultValue,
  onChange,
  onBlur,
  onSelect,
  onDeselect,
  onOptionHover,
  onClear,
  isSubOption,
  filterOption,
  forwardRef,
  linkedValues,
  ref,
  renderParent,
  subGroups,
  ...rest
}: Props<idKey, T> & SelectedProps<T> & ForwardRefInjectedProps) => {
  React.useEffect(() => {
    if (onChange !== undefined && value !== undefined) {
      const val = processValues(value)
      if (val === undefined) {
        onChange(val)
      }
    }
  })

  React.useEffect(() => {
    if (onChange !== undefined && defaultValue !== undefined) {
      const val = processValues(defaultValue)
      if (val === undefined) {
        onChange(val)
      }
    }
  })

  const eqT: eq.Eq<T> = {
    equals: (a, b) => iso.unwrap(a[identifier]) === iso.unwrap(b[identifier])
  }
  const ordT: ord.Ord<T> = ord.contramap((t: T) => iso.unwrap(t[identifier]))(ord.ordString)

  const processValues = (value?: T[]): string[] | undefined => {
    if (value !== undefined) {
      const r = value.map(processValue).filter(v => v !== undefined)
      return r.length === 0 ? undefined : (r as string[] | undefined)
    }
    return undefined
  }

  const processValue = (value?: T) => {
    if (
      value !== undefined &&
      option.isSome(
        lookupElementInKeyedMap(
          value[identifier],
          keyedMapT,
          isSubOption === undefined || !isSubOption(value)
        )
      )
    ) {
      return isSubOption && !isSubOption(value)
        ? `parent-${iso.unwrap(value[identifier])}`
        : iso.unwrap(value[identifier])
    }
    return undefined
  }

  const lookupElementInKeyedMap = (
    id: T[idKey],
    keyedMapT: KeyedMap<idKey, T>,
    isParent: boolean
  ) => {
    const parentElement = lookup(id, keyedMapT)
    const subElement = subGroups
      ? pipe(
          subGroups,
          map.values<T[]>(array.getOrd<T>(ordT)),
          array.flatten,
          array.findFirst(a => eq.eqString.equals(iso.unwrap(id), iso.unwrap(a[identifier]))),
          option.fold(() => parentElement, option.some)
        )
      : parentElement
    return isParent ? parentElement : subElement
  }

  // const internalOnBlur = (keyedMapT: KeyedMap<idKey, T>) => (val: SelectValue) => {
  //   const parent = typeof val === 'string' && isParent(val)
  //   const key = typeof val === 'string' && parent ? val.substring(7) : val
  //   const localValue =
  //     typeof key === 'string'
  //       ? lookupElementInKeyedMap(iso.wrap(key), keyedMapT, parent)
  //       : option.none
  //   pipe(
  //     localValue,
  //     option.map(val => (onBlur ? onBlur(val) : undefined))
  //   )
  // }

  const mergeValues = (newValues: T[]) => (currentValues: T[] | undefined) =>
    array.uniq<T>(eqT)(currentValues ? newValues.concat(currentValues) : newValues)

  const removeValues = (oldValues: T[]) => (currentValues: T[] | undefined) =>
    currentValues ? array.difference(eqT)(currentValues, oldValues) : undefined

  const isParent = (s: string) => new RegExp(/^parent-/i).test(s)

  const isParentInValues = (t: T) => {
    const ll = pipe(
      linkedValues,
      option.fromNullable,
      option.chain(l => l(t))
    )
    const currentValues = pipe(value || defaultValue, option.fromNullable)
    return pipe(
      adoOption({
        ll,
        currentValues
      }),
      option.map(({ ll, currentValues }) => array.elem(eqT)(ll.parent, currentValues)),
      option.getOrElse(() => false)
    )
  }

  const internalOnSelect = (keyedMapT: KeyedMap<idKey, T>) => (
    val: SelectValue,
    elementOptions: OptionData | OptionGroupData | undefined
  ) => {
    const parent = typeof val === 'string' && isParent(val)
    const key = typeof val === 'string' && parent ? val.substring(7) : val
    const localValue =
      typeof key === 'string'
        ? lookupElementInKeyedMap(iso.wrap(key), keyedMapT, parent)
        : option.none

    if (linkedValues && option.isSome(localValue)) {
      const ll = pipe(localValue, option.chain(linkedValues))
      pipe(
        adoOption({
          localValue,
          ll
        }),
        option.fold(
          () => onChange && onChange(mergeValues([localValue.value])(value || defaultValue)),
          ({ localValue, ll }) =>
            onChange &&
            onChange(
              isParentInValuesForChild(localValue)
                ? computeDeselectValue(localValue, ll)
                : computeSelectValue(localValue, ll)
            )
        )
      )
    } else if (option.isSome(localValue) && onChange) {
      onChange(mergeValues([localValue.value])(value || defaultValue))
    }
    pipe(
      localValue,
      option.map(val => (onSelect ? onSelect(val, elementOptions) : undefined))
    )
  }

  const internalOnDeselect = (keyedMapT: KeyedMap<idKey, T>) => (val: SelectValue) => {
    const parent = typeof val === 'string' && isParent(val)
    const key = typeof val === 'string' && parent ? val.substring(7) : val
    const localValue =
      typeof key === 'string'
        ? lookupElementInKeyedMap(iso.wrap(key), keyedMapT, parent)
        : option.none

    if (linkedValues && option.isSome(localValue)) {
      const ll = pipe(localValue, option.chain(linkedValues))
      pipe(
        adoOption({
          localValue,
          ll
        }),
        option.fold(
          () => onChange && onChange(removeValues([localValue.value])(value || defaultValue)),
          ({ localValue, ll }) => onChange && onChange(computeDeselectValue(localValue, ll))
        )
      )
    } else if (option.isSome(localValue) && onChange) {
      onChange(removeValues([localValue.value])(value || defaultValue))
    }
    pipe(
      localValue,
      option.map(val => (onDeselect ? onDeselect(val) : undefined))
    )
  }

  const getValuesToMergeOnSelect = (sl: T, ll: LinkedValue<T>, merge?: boolean) => {
    const childrenSelectedCount = value ? array.intersection(eqT)(value, ll.children).length : 0
    if (eqT.equals(ll.parent, sl)) {
      return [ll.parent]
    }
    if (childrenSelectedCount >= ll.children.length - 1) {
      return [ll.parent]
    }
    if (isParentInValues(sl) && merge) {
      return ll.children
    }
    return [sl]
  }

  const getValuesToRemoveOnDeselect = (sl: T, ll: LinkedValue<T>, merge?: boolean) => {
    const childrenSelectedCount = value ? array.intersection(eqT)(value, ll.children).length : 0
    if (eqT.equals(ll.parent, sl)) {
      return array.cons(ll.parent, ll.children)
    }
    if (childrenSelectedCount >= ll.children.length - 1 && merge) {
      return array.cons(ll.parent, ll.children)
    }
    return [ll.parent, sl]
  }

  const computeSelectValue = (sl: T, ll: LinkedValue<T>) => {
    const toRemove = getValuesToRemoveOnDeselect(sl, ll, true)
    const toMerge = getValuesToMergeOnSelect(sl, ll)

    return pipe(value || defaultValue, removeValues(toRemove), mergeValues(toMerge))
  }

  const computeDeselectValue = (sl: T, ll: LinkedValue<T>) => {
    const toMerge = getValuesToMergeOnSelect(sl, ll, true)
    const toRemove = getValuesToRemoveOnDeselect(sl, ll)

    return pipe(value || defaultValue, mergeValues(toMerge), removeValues(toRemove))
  }

  const dic = KeyedMapDic<T>()({ idKey: identifier, idIso: iso })

  const fromFoldableDic = fromFoldable(array.array)<T>()(dic)

  const keyedMapT = fromFoldableDic(dataSource, getFirstSemigroup<T>().concat)

  const isParentInValuesForChild = (t: T) =>
    isSubOption !== undefined && isSubOption(t) && isParentInValues(t)

  const internalDefaultValue: SelectValue | undefined = defaultValue
    ? processValues(defaultValue)
    : undefined

  const internalValue: SelectValue | undefined = value ? processValues(value) : undefined

  const renderSelectOption = (o: T) => (
    <SelectOption
      value={
        isSubOption === undefined || isSubOption(o)
          ? iso.unwrap(o[identifier])
          : `parent-${iso.unwrap(o[identifier])}`
      }
      key={
        isSubOption === undefined || isSubOption(o)
          ? iso.unwrap(o[identifier])
          : `parent-${iso.unwrap(o[identifier])}`
      }
      className={classes(
        classNames.optionContainer,
        isSubOption !== undefined && isSubOption(o) ? 'shifted' : '',
        isParentInValuesForChild(o) ? 'ant-select-dropdown-menu-item-selected' : ''
      )}
    >
      <div
        onMouseEnter={() => {
          if (onOptionHover !== undefined) {
            onOptionHover(o)
          }
        }}
        onMouseLeave={() => {
          if (onOptionHover) {
            onOptionHover(undefined)
          }
        }}
        className={classes(classNames.optionContainer)}
      >
        <div className={classes(classNames.icon, renderIcon === undefined ? 'hidden' : '')}>
          {renderIcon !== undefined && renderIcon(o)}
        </div>
        <div className={overflowStyleSheet.textEllipsis}>
          {isSubOption && !isSubOption(o) && renderParent ? renderParent(o) : renderOption(o)}
        </div>
      </div>
    </SelectOption>
  )

  const internalFilterOption = filterOption === undefined ? false : filterOption

  return (
    <Select
      filterOption={internalFilterOption}
      showSearch
      optionFilterProp="children"
      notFoundContent={isLoading === true ? <Spin size="small" /> : null}
      onChange={undefined}
      onSelect={(e, options) => internalOnSelect(keyedMapT)(e.valueOf(), options)}
      onDeselect={internalOnDeselect(keyedMapT)}
      loading={isLoading}
      value={internalValue}
      defaultValue={internalDefaultValue}
      ref={forwardRef}
      {...rest}
    >
      {dataSource.map(o => {
        if (subGroups) {
          const options = map.lookup(eqT)(o, subGroups)
          return pipe(
            options,
            option.fold(
              () => [renderSelectOption(o)],
              c => [renderSelectOption(o), ...c.map(renderSelectOption)]
            )
          )
        }
        return renderSelectOption(o)
      })}
    </Select>
  )
}

export const SelectAutoCompleteComp = withRef((Comp as unknown) as any)

export const SelectAutoComplete: <idKey extends keyof T, T extends {}>(
  props: Props<idKey, T> & SelectedProps<T>
) => React.ReactElement<
  Props<idKey, T> & SelectedProps<T>
> = (SelectAutoCompleteComp as unknown) as any
