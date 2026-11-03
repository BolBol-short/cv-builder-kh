import { useLayoutEffect, useState } from 'react'

/**
 * How much to shrink something `contentWidth` px wide so it fits inside the
 * element in `ref`. Never grows above 1. Updates when the element is resized.
 */
export function useFitScale(ref, contentWidth) {
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    function measure() {
      const width = element.clientWidth
      if (width > 0) setScale(Math.min(1, width / contentWidth))
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, contentWidth])

  return scale
}
