import { Button } from 'antd'
import { ButtonGroupProps } from 'antd/lib/button/button-group'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './button-group.styles'

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, children }) => (
  <Button.Group className={classes(classNames.buttonGroup, className || '')}>
    {children}
  </Button.Group>
)
