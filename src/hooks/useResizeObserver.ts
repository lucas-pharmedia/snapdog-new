import { useEffect, useRef } from 'react';

/**
 * 用於監聽元素的尺寸變化與視窗縮放
 * @param element 要監聽的 DOM 元素
 * @param onResize 尺寸變化時的回調函式
 * @param deps 額外的依賴項，當這些項變化時會重新觸發監聽邏輯
 */
export const useResizeObserver = (element: HTMLElement | null, onResize: () => void, deps: any[] = []) => {
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;

  useEffect(() => {
    if (!element) return;

    const handleResize = () => {
      requestAnimationFrame(() => {
        onResizeRef.current();
      });
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(element);

    window.addEventListener('resize', handleResize);

    // 初始執行一次以確保座標正確
    handleResize();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [element, ...deps]);
};
