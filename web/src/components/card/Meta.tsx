import { Card } from 'antd'
import { CardMetaProps } from 'antd/lib/card'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './meta.styles'

type Props = CardMetaProps

export const Meta: React.FC<Props> = ({ className, ...props }) => (
  <Card.Meta className={classes(classNames.container, className || '')} {...props} />
)
