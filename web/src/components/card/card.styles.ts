import { palette } from '../style'
import { stylesheet } from 'typestyle'

export const classNames = stylesheet({
  card: {
    lineHeight: 1.2,
    $nest: {
      '&.disabled': {
        backgroundColor: palette.thinGray,
        cursor: 'not-allowed'
      }
    }
  }
})
