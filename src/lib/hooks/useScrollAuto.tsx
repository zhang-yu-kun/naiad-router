import { useState, useCallback, useRef } from "react";

const useScrollAuto = () => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<0 | -1 | 1>(0); // 0 不动，-1 左，1 右
  const speed = 2; // 每帧滚动的像素，可调
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tabsRef.current) return;
    const { left, width } = tabsRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const ratio = x / width;

    if (ratio < 0.33) setDir(-1);
    else if (ratio > 0.66) setDir(1);
    else setDir(0);
  }, []);
  /* 鼠标离开停止滚动 */
  const handleMouseLeave = useCallback(() => setDir(0), []);

  return { tabsRef, dir, speed, handleMouseMove, handleMouseLeave };
};

export default useScrollAuto;
