import { Tooltip as AntTooltip } from 'antd'
import { TooltipProps as AntTooltipProps } from 'antd/lib/tooltip'
import { rgba } from 'csx'
import * as React from 'react'
import { classes, style } from 'typestyle'

const COLOR = rgba(0, 0, 0, 0.75)
const overlayClass = style({
  $nest: {
    '.ant-tooltip-content .ant-tooltip-inner': {
      backgroundColor: COLOR.toString()
    },
    '.ant-tooltip-content .ant-tooltip-arrow': {
      borderTopColor: COLOR.toString(),
      borderLeftColor: COLOR.toString()
    }
  }
})

export const Tooltip: React.FC<TooltipProps> = ({ children, overlayClassName, ...props }) => (
  <AntTooltip {...props} overlayClassName={classes(overlayClass, overlayClassName || '')}>
    {children}
  </AntTooltip>
)

export type TooltipProps = AntTooltipProps
