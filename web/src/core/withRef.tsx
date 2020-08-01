import * as React from 'react'

export interface ForwardRefInjectedProps {
  forwardRef: React.Ref<any>
}
export const withRef = <P extends object>(
  WrappedComponent: React.ComponentType<P & ForwardRefInjectedProps>
) =>
  (React.forwardRef((props, ref) => (
    <WrappedComponent {...(props as P)} forwardRef={ref} />
  )) as unknown) as React.FC<P>
