import { stylesheet } from 'typestyle'

export const classNames = stylesheet({
  container: {
    maxWidth: '100%',
    $nest: {
      '.ant-card-meta-detail > div:not(:last-child)': {
        margin: '.5rem 0'
      }
    }
  }
})
