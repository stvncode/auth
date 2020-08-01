import { Tabs } from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'
import * as React from 'react'
import { classes } from 'typestyle'
import { classNames } from './tabs.styles'
export const TabPane: React.FC<TabPaneProps> = ({ className, ...rest }) => (
  <Tabs.TabPane className={classes(classNames.pane, className || '')} {...rest} />
)
