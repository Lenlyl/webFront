import { useEffect, useRef, useState, UIEvent, useMemo } from "react";
import Product from "./components/Product/index.tsx";
import "./App.css";

/** @name 页面容器高度 */
const SCROLL_VIEW_HEIGHT: number = window.screen.height;

/** @name 列表项高度 */
const ITEM_HEIGHT: number = 100;

/** @name 预加载数量 */
const PRE_LOAD_COUNT: number = SCROLL_VIEW_HEIGHT / ITEM_HEIGHT;

export default function App() {
  const [sourceData, setSourceData] = useState<number[]>([]);

  const [showRange, setShowPageRange] = useState({
    start: 0,
    end: 10
  });

  /** 容器Ref */
  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * 创建列表显示数据
   */
  const createListData = () => {
    const initnalList: number[] = Array.from(Array(20).keys());
    setSourceData(initnalList);
  };

  useEffect(() => {
    createListData();
  }, []);

  /**
   * 计算元素范围
   */
  const calculateRange = () => {
    const element = containerRef.current;
    if (element) {
      const offset: number = Math.floor(element.scrollTop / ITEM_HEIGHT) + 1;
      console.log(offset, "offset");
      const viewItemSize: number = Math.ceil(
        element.clientHeight / ITEM_HEIGHT
      );
      const startSize: number = offset - PRE_LOAD_COUNT;
      const endSize: number = viewItemSize + offset + PRE_LOAD_COUNT;
      setShowPageRange({
        start: startSize < 0 ? 0 : startSize,
        end: endSize > sourceData.length ? sourceData.length : endSize
      });
    }
  };

  /**
   * 计算当前是否已经到底底部
   * @returns 是否到达底部
   */
  const reachScrollBottom = (): boolean => {
    const contentScrollTop = containerRef.current?.scrollTop || 0; //滚动条距离顶部
    const clientHeight = containerRef.current?.clientHeight || 0; //可视区域
    const scrollHeight = containerRef.current?.scrollHeight || 0; //滚动条内容的总高度
    console.log(
      scrollHeight,
      clientHeight,
      contentScrollTop,
      "scrollContainer"
    );
    if (contentScrollTop + clientHeight >= scrollHeight) {
      return true;
    }
    return false;
  };

  /**
   * onScroll事件回调
   * @param event { UIEvent<HTMLDivElement> } scrollview滚动参数
   */
  const onContainerScroll = (event: UIEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (reachScrollBottom()) {
      setTimeout(() => {
        let endIndex = showRange.end;
        let pushData: number[] = [];
        for (let index = 0; index < 20; index++) {
          pushData.push(endIndex++);
        }
        setSourceData((arr) => {
          return [...arr, ...pushData];
        });
      }, 0);
    }
    calculateRange();
  };

  /**
   * 当前scrollView展示列表
   */
  const currentViewList = useMemo(() => {
    
    return sourceData
      .slice(showRange.start, showRange.end)
      .map((el, index) => ({
        data: el,
        index
      }));
  }, [showRange, sourceData]);

  /**
   * scrollView整体高度
   */
  const scrollViewHeight = useMemo(() => {
    return sourceData.length * ITEM_HEIGHT;
  }, [sourceData]);

  /**
   * scrollView 偏移量
   */
  const scrollViewOffset = useMemo(() => {
    console.log(showRange.start, "showRange.start");
    return showRange.start * ITEM_HEIGHT;
  }, [showRange.start]);

  return (
    <div
      ref={containerRef}
      style={{
        height: SCROLL_VIEW_HEIGHT,
        overflow: "auto"
      }}
      className="scrollView"
      onScroll={onContainerScroll}
    >
      <div
        style={{
          width: "100%",
          height: scrollViewHeight - scrollViewOffset,
          // transform: `translete3d(0,${scrollViewOffset},0)`,
          marginTop: scrollViewOffset
        }}
      >
        {currentViewList.map((e) => (
          <Product key={e.data} row={e.data} />
        ))}
      </div>
    </div>
  );
}
