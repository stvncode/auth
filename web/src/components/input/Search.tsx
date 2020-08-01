import { Input as AntdInput } from 'antd'
import { SearchProps } from 'antd/lib/input'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './input.styles'

export class SearchInput extends React.PureComponent<SearchProps> {
  render() {
    const { className, ...props } = this.props
    return (
      <AntdInput.Search
        {...props}
        className={classes(classNames.input, className !== undefined ? className : '')}
      />
    )
  }
}
