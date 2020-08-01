import * as React from 'react'
import { Checkbox } from 'antd'
import { CheckboxProps as CProps } from 'antd/lib/checkbox'

export interface CheckboxProps<T> extends CProps {
  value?: T
}

const C = <T extends {}>(p: CheckboxProps<T>) => <Checkbox {...p} />
export { C as Checkbox }
