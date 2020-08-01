import { palette } from '../style'
import { stylesheet } from 'typestyle'

export const classNames = stylesheet({
  icon: {
    color: palette.primary,
    marginRight: '1rem',
    marginTop: '.5rem',
    $nest: {
      '&.hidden': {
        marginRight: 0,
        marginTop: 0
      }
    }
  },
  optionContainer: {
    display: 'flex',
    alignItems: 'center',
    $nest: {
      '&.shifted': {
        paddingLeft: '3rem'
      }
    }
  }
})
