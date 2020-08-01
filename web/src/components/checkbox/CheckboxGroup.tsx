import { Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/lib/checkbox'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './checkbox-group.styles'
export class CheckboxGroup extends React.PureComponent<
  CheckboxGroupProps & { children?: React.ReactNode | React.ReactNode[] }
> {
  render() {
    const { className, children, ...rest } = this.props

    return (
      <Checkbox.Group {...rest} className={classes(classNames.container, className || '')}>
        {children}
      </Checkbox.Group>
    )
  }
}
