import { newLayer } from 'csstips'
import * as React from 'react'
import { classes, style } from 'typestyle'
import { Tooltip, TooltipProps } from './Tooltip'

const css = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  $nest: {
    '> :last-child': { ...newLayer }
  }
})

const keepWidth = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
})

type CompExternalProps = {
  tooltipProps: TooltipProps
  className?: string
} & {
  inline?: boolean
}

interface OwnExternalProps {
  showTooltip: boolean
  withScreen: boolean
}

type ExternalProps = OwnExternalProps & CompExternalProps

export const withConditionalTooltip = <P extends object>(
  Wrapped: React.ComponentType<P>
): React.FC<P & ExternalProps> => ({
  showTooltip,
  tooltipProps,
  withScreen,
  className,
  inline,
  ...rest
}) => {
  const wrapped =
    showTooltip && withScreen ? (
      <span className={classes(css, className)}>
        <Wrapped {...(rest as P)} />
        <div />
      </span>
    ) : inline !== true ? (
      <span className={keepWidth}>
        <Wrapped {...(rest as P)} />
      </span>
    ) : (
      <span>
        <Wrapped {...(rest as P)} />
      </span>
    )
  return showTooltip ? <Tooltip children={wrapped} {...tooltipProps} /> : wrapped
}
