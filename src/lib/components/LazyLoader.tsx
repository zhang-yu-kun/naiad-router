import React, { useEffect, useState } from "react";
import { CacheItem } from "../types";

type LazyLoaderProps = {
  cacheItem: CacheItem;
  onMount: (element: React.ReactElement) => void;
};
const LazyLoader: React.FC<LazyLoaderProps> = ({ cacheItem, onMount }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const loadComponent = async () => {
      try {
        const module = await cacheItem.loader();
        const Component = module.default;

        if (isMounted) {
          onMount(<Component />);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setIsLoading(false);
        }
      }
    };

    // 如果元素尚未加载，则加载组件
    if (!cacheItem.element) {
      loadComponent();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [cacheItem, onMount]);

  if (isLoading) {
    return <div className="loader">加载组件...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>组件加载失败</p>
        <pre>{error.message}</pre>
        <button onClick={() => window.location.reload()}>重试</button>
      </div>
    );
  }

  // 如果组件已加载，直接返回缓存元素
  return cacheItem.element || null;
};

export default LazyLoader;
