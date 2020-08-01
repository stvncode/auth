import { newLayer } from 'csstips'
import { stylesheet } from 'typestyle'

export const classNames = stylesheet({
  picture: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    $nest: {
      '&.contain': {
        objectFit: 'contain'
      }
    }
  },
  container: {
    ...newLayer
  },
  placeholder: {
    width: '100%',
    height: '100%'
  },
  loader: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    top: 0
  },
  pictureContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  }
})
