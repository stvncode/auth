import { Button as AntButton } from 'antd'
import { AnchorButtonProps, NativeButtonProps } from 'antd/lib/button/button'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './button.styles'

// We must export 2 distinct components because we do not support Union types in Props in our HOC

export const Button = (props: NativeButtonProps) => <AntButton {...props} />

export const AnchorButton = (props: AnchorButtonProps) => <AntButton {...props} />

export const TextButton = ({ className, ...props }: NativeButtonProps) => (
  <AntButton {...props} ghost className={classes(classNames.container, className || '')} />
)
