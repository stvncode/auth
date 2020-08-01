import { option } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { Size } from 'react-virtualized/dist/es/AutoSizer'

export const shouldResize = (
  previousSize: option.Option<Size>,
  size: Size,
  ratio = 1.5
): boolean => {
  if (size.width === 0 || size.height === 0) {
    return false
  }
  return !pipe(
    previousSize,
    option.exists(ps => ps.width * ratio > size.width && ps.height * ratio > size.height)
  )
}
