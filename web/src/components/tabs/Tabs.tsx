import { Tabs as AntTabs } from 'antd'
import { TabsProps } from 'antd/lib/tabs'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './tabs.styles'

interface Props extends TabsProps {
  noMargin?: boolean
  align?: 'center' | 'left' | 'right'
}
export const Tabs: React.FC<Props> = ({
  children,
  tabBarStyle,
  noMargin,
  align,
  className,
  ...rest
}) => (
  <AntTabs
    {...rest}
    tabBarStyle={{
      ...tabBarStyle,
      textAlign: align === undefined ? 'center' : align,
      ...(noMargin && { margin: 0 })
    }}
    className={classes(classNames.tabs, className || '')}
  >
    {children}
  </AntTabs>
)
