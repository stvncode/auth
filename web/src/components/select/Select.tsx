import { Select as AntSelect } from 'antd'
import { SelectProps, SelectValue } from 'antd/lib/select'
import { important } from 'csx'
import * as React from 'react'
import { classes, stylesheet } from 'typestyle'
import { withRef } from '../../core/withRef'
import { useDimensions } from '../../hooks/dimensions'

type RefCallback = (instance: any) => void

interface Props<T extends SelectValue> extends SelectProps<T> {
  children?: React.ReactNode | React.ReactNode[] | string
  fullWidth?: boolean
  ref?: React.RefObject<AntSelect<T>> | null | RefCallback
}

const css = stylesheet({
  dropdown: {
    width: '100%'
  },
  select: {
    width: important('auto'),
    minWidth: '12rem'
  },
  container: {
    display: 'inline',
    $nest: {
      '.ant-select-selection--multiple .ant-select-selection__choice': {
        marginRight: 0,
        width: '100%'
      },
      '.ant-select-selection--multiple .ant-select-selection__rendered': {
        width: '100%',
        paddingRight: '1rem'
      },
      '.ant-select-selection--multiple .ant-select-search--inline': {},
      '.ant-select-selection--multiple .ant-select-selection__rendered li': {
        width: 'auto'
      }
    }
  }
})

const Comp: React.FC<any> = ({
  children,
  dropdownClassName,
  className,
  forwardRef,
  dropdownStyle,
  ...props
}) => {
  const [dimRef, { width }] = useDimensions()
  return (
    <div ref={dimRef} className={css.container}>
      <AntSelect<any>
        {...props}
        ref={forwardRef}
        className={className || css.select}
        dropdownClassName={classes(css.dropdown, dropdownClassName || '')}
        dropdownStyle={{ ...dropdownStyle, minWidth: width }}
      >
        {children}
      </AntSelect>
    </div>
  )
}

export const Select: <T extends SelectValue>(
  p: Props<T>
) => React.ReactElement<Props<T>> = (withRef(Comp) as unknown) as any

export const Option = AntSelect.Option

export const OptionGroup = AntSelect.OptGroup
