import { Input as AntdInput } from 'antd'
import { GroupProps, InputProps } from 'antd/lib/input'
import * as React from 'react'
import { classes, style } from 'typestyle'
import { classNames as inputGroupClassNames } from './input-group.styles'
import { classNames } from './input.styles'

export class Input extends React.PureComponent<InputProps> {
  render() {
    const { className, ...props } = this.props
    return (
      <AntdInput
        {...props}
        className={classes(classNames.input, className !== undefined ? className : '')}
      />
    )
  }
}

export const InputGroup: React.FC<GroupProps> = ({ className, children, ...props }) => (
  <AntdInput.Group {...props} className={classes(inputGroupClassNames.container, className || '')}>
    {children}
  </AntdInput.Group>
)

const css = style({
  width: 'auto',
  $nest: {
    '.ant-input-group': {
      width: 'auto',
      height: '28px'
    },
    '.ant-input': {
      width: 0,
      paddingLeft: 0,
      paddingRight: 0,
      borderLeft: 0,
      borderRight: 0,
      boxSizing: 'border-box'
    }
  }
})
export const InputAddOn: React.FC<InputProps> = props => <Input {...props} className={css} />
