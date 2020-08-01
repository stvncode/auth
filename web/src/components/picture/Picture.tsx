import { logger } from '../../framework/logger'
import { standardizeSize, toUrlMagellan } from '../../framework/images'
import { option } from 'fp-ts'
import { fromNullable, none, Option, some } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as React from 'react'
import { Size } from 'react-virtualized'
import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { classes } from 'typestyle'
import { useDimensions } from '../../hooks/dimensions'
import { usePrevious } from '../../hooks/use-previous-hook'
import { Spin } from '../spin/Spin'
import { classNames } from './picture.styles'
import { shouldResize } from './picture.utils'

const log = logger('PICTURE', false)

interface Pic {
  url: string
  description: option.Option<string>
}

interface ImgProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

const toSizedUrl = (size: Size, src: string) => toUrlMagellan(standardizeSize(size), src)

const TrackWidth = <P extends ImgProps>(Wrapped: React.ComponentType<P>) => {
  const Comp: React.FC<P> = ({ src, ...rest }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [dimRef, { width, height }] = useDimensions()
    const previousSize = usePrevious({ width, height })
    const [resizedSrc, setResizedSrc] = React.useState(
      src && toSizedUrl({ width: 1, height: 1 }, src)
    )
    const switchURL = (size: Size) => {
      log('switchUrl', size)
      src && setResizedSrc(toSizedUrl(size, src))
    }
    const [subject] = React.useState(new Subject<Size>())
    React.useEffect(() => {
      log('EFFECT width, height', width, height)
      subject.next({ width, height })
    }, [width, height])
    React.useEffect(() => {
      const sub = subject
        .pipe(filter(size => shouldResize(option.fromNullable(previousSize), size)))
        .subscribe(switchURL)
      return () => sub.unsubscribe()
    }, [])
    const onLoad = React.useCallback(() => setIsLoading(false), [])
    return (
      <div ref={dimRef} className={classNames.pictureContainer}>
        <Wrapped {...(rest as P)} src={resizedSrc} onLoad={onLoad} />
        <div className={classNames.loader}>{isLoading && <Spin />}</div>
      </div>
    )
  }
  return Comp
}

const Img: React.FC<
  ImgProps & {
    ref?: React.Ref<HTMLImageElement>
  }
> = React.forwardRef((props, ref) => <img {...props} ref={ref} />)

const TrackedImg = TrackWidth(Img)

interface Props {
  pictureUrl: string | Option<Pic>
  placeholder?: React.ReactNode
  className?: string
  customOnError?: (p: Pic) => void
  containerClassName?: string
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
  contain?: boolean
  optimize?: boolean
}

export const Picture: React.FC<Props> = ({
  pictureUrl,
  placeholder,
  onClick,
  containerClassName,
  customOnError,
  className,
  contain,
  optimize,
  ...props
}) => {
  const [hasError, setError] = React.useState(false)

  const onError = () => setError(true)

  const finalPlaceholder = pipe(
    fromNullable<React.ReactNode>(placeholder),
    option.getOrElse<React.ReactNode>(() => <div>No Picture</div>)
  )
  const maybeUrl: Option<string> =
    typeof pictureUrl === 'string'
      ? some(pictureUrl)
      : pipe(
          pictureUrl,
          option.map(p => p.url)
        )
  const shouldContain = hasError
    ? true
    : pipe(
        maybeUrl,
        option.fold(
          () => true,
          () => false
        )
      )
  const url = pipe(
    maybeUrl,
    option.getOrElse(() => '')
  )

  const imgProps = {
    onClick,
    className: classes(
      classNames.picture,
      contain || shouldContain ? 'contain' : '',
      className || ''
    ),
    onError: () => (customOnError ? customOnError({ url, description: none }) : onError()),
    src: url,
    ...props
  }

  return (
    <div className={containerClassName ? containerClassName : classNames.container}>
      {!shouldContain ? (
        optimize ? (
          <TrackedImg {...imgProps} />
        ) : (
          <div className={classNames.pictureContainer}>
            <img {...imgProps} />
          </div>
        )
      ) : (
        finalPlaceholder
      )}
    </div>
  )
}
