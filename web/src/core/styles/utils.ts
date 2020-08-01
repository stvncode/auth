import { NestedCSSProperties } from 'typestyle/lib/types'

export const makeClasses = <T extends Record<string, NestedCSSProperties>>(
  classes: T
): Record<keyof T, NestedCSSProperties> => classes
