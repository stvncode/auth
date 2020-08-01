import { color, important } from 'csx'
import { palette } from '../style'
import { stylesheet } from 'typestyle'

export const classNames = stylesheet({
  input: {
    display: 'flex',
    alignItems: 'center',
    top: important(0),
    $nest: {
      '&.ant-input-search.ant-input-search-enter-button': {
        display: 'flex'
      },
      '&.ant-input-search .ant-input-group-addon': {
        backgroundColor: color(palette.thinGray)
          .lighten(0.05)
          .toString(),
        color: palette.gray
      }
    }
  }
})
