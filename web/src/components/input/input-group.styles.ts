import { important } from 'csx'
import { stylesheet } from 'typestyle'

export const classNames = stylesheet({
  container: {
    display: important('flex'),
    width: 'auto'
  }
})
