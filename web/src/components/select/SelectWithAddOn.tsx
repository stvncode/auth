import { SelectProps, SelectValue } from 'antd/lib/select'
import * as React from 'react'
import { InputAddOn, InputGroup } from '../input/Input'
import { Select } from './Select'

interface Props<T> extends SelectProps<T> {
  addOn: React.ReactNode | string
}

export const SelectWithAddOn: React.FC<Props<SelectValue>> = ({ addOn, children, ...rest }) => (
  <InputGroup compact>
    <InputAddOn addonBefore={addOn} />
    <Select {...rest}>{children}</Select>
  </InputGroup>
)
