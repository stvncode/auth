import { Card as AntCard } from 'antd'
import { CardProps } from 'antd/lib/card'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './card.styles'

interface ExtendedCardProps extends CardProps {
  disabled?: boolean
}
export const Card = ({
  bodyStyle,
  className,
  disabled,
  onClick,
  hoverable,
  ...props
}: ExtendedCardProps) => (
  <AntCard
    {...props}
    className={classes(
      className !== undefined ? className : '',
      classNames.card,
      disabled === true ? 'disabled' : ''
    )}
    bodyStyle={{ padding: '2rem', ...bodyStyle }}
    onClick={disabled === true ? undefined : onClick}
    hoverable={disabled === true ? false : hoverable}
  />
)
