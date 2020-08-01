import { LoadingOutlined } from '@ant-design/icons'
import { SpinProps } from 'antd/lib/spin'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './spin.styles'

export const Spin = (props: SpinProps & { fullScreen?: boolean; inline?: boolean }) => {
  const { fullScreen, inline, size, ...rest } = props
  return (
    <div
      className={classes(
        inline ? classNames.inlineContainer : classNames.container,
        fullScreen && 'fullScreen'
      )}
    >
      <LoadingOutlined spin {...rest} />
    </div>
  )
}
