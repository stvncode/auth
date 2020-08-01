import { useLayoutEffect, useRef, useState } from 'react'
import { Size } from 'react-virtualized'

export const useDimensions = (): [React.RefObject<HTMLDivElement>, Size] => {
  const ref = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState<Size>({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }
  }, [ref.current])

  return [ref, dimensions]
}
