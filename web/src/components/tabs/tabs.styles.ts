import { stylesheet } from 'typestyle'

export const classNames = stylesheet({
  tabs: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    $nest: {
      '.ant-tabs-content': {
        height: '100%'
      }
    }
  },
  pane: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
})
