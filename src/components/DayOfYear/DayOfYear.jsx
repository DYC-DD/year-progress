import React, { useEffect, useMemo, useRef, useState } from "react";
import "./DayOfYear.css";

// ----- 工具函式 -----
// 取得日期是當年的第幾天
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.floor((date - start) / 86400000) + 1;
}
// 由年份與天數取得日期物件
function dateFromDay(year, day) {
  return new Date(year, 0, day);
}

// 補零並格式化日期為 MM.DD
const pad2 = (n) => String(n).padStart(2, "0");
const fmtBadge = (d) => `${pad2(d.getMonth() + 1)}.${pad2(d.getDate())}`;

// 根據視窗寬度決定欄數
const pickColsByViewport = (w, h) => {
  if (w > h) return 28;
  if (w < 980) return 14;
  if (w < 1400) return 21;
  return 28;
};

const DayOfYear = () => {
  // ----- 初始化日期與參考物件 -----
  const now = useMemo(() => new Date(), []);
  const year = now.getFullYear();
  const wrapRef = useRef(null);

  // ----- 計算年份資訊與格子資料 -----
  const { totalDays, todayIndex, daysLeft, cells, startDow } = useMemo(() => {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDays = isLeap ? 366 : 365;
    const todayIndex = getDayOfYear(now);
    const daysLeft = totalDays - todayIndex;
    const startDow = new Date(year, 0, 1).getDay();
    const totalCells = startDow + totalDays;
    const cells = Array.from({ length: totalCells }, (_, i) =>
      i < startDow ? { type: "pad" } : { type: "day", day: i - startDow + 1 }
    );
    return { totalDays, todayIndex, daysLeft, cells, startDow };
  }, [now, year]);

  // ----- 響應式欄數設定 -----
  const [cols, setCols] = useState(() =>
    typeof window !== "undefined"
      ? pickColsByViewport(window.innerWidth, window.innerHeight)
      : 14
  );

  useEffect(() => {
    const onResize = () =>
      setCols(pickColsByViewport(window.innerWidth, window.innerHeight));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const weeksPerRow = cols / 7;
  const rows = Math.ceil((startDow + totalDays) / cols);

  // ----- 進出視窗時重播 -----
  const [playIndex, setPlayIndex] = useState(0);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPlayIndex(todayIndex);
        } else {
          setPlayIndex(0);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [todayIndex]);

  // ----- 滑鼠懸停與提示框狀態 -----
  const [hoverDay, setHoverDay] = useState(null);
  const [hoverTarget, setHoverTarget] = useState(null);
  const isPreview = hoverTarget != null;
  const displayIndex = isPreview ? hoverTarget : playIndex;

  const [tip, setTip] = useState({ x: 0, y: 0, visible: false });
  const onGridMouseMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const TIP_OFFSET_X = 6,
      TIP_OFFSET_Y = 6;
    setTip({
      x: e.clientX - rect.left + TIP_OFFSET_X,
      y: e.clientY - rect.top + TIP_OFFSET_Y,
      visible: true,
    });
  };

  // ----- days left 數字動畫 -----
  const isHovering = hoverDay != null;
  const targetLeft = isHovering ? totalDays - hoverDay : daysLeft;
  const [animatedLeft, setAnimatedLeft] = useState(targetLeft);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = animatedLeft;
    const to = targetLeft;
    const dur = isHovering ? 120 : 200;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      const t = Math.min(1, (ts - start) / dur);
      setAnimatedLeft(Math.round(from + (to - from) * ease(t)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLeft, isHovering]);

  // ----- 計算提示框顯示文字 -----
  const hoverLabel =
    hoverDay != null ? fmtBadge(dateFromDay(year, hoverDay)) : null;

  // 星期標頭
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const colHeaders = Array.from({ length: cols }, (_, i) => weekday[i % 7]);

  return (
    <div className="doy" ref={wrapRef} data-cols={cols}>
      {/* 提示框 */}
      {tip.visible && hoverLabel && (
        <div
          className="doy-tooltip"
          style={{ transform: `translate(${tip.x}px, ${tip.y}px)` }}
          role="status"
          aria-live="polite"
        >
          {hoverLabel}
        </div>
      )}

      {/* 年度格子容器 */}
      <div
        className="doy-grid-box"
        style={{ ["--cols"]: cols }}
        onMouseMove={onGridMouseMove}
        onMouseLeave={() => {
          setTip((t) => ({ ...t, visible: false }));
          setHoverDay(null);
          setHoverTarget(null);
        }}
      >
        {/* 標頭（滑鼠在格內才顯示） */}
        {tip.visible && (
          <div className="doy-overlay" aria-hidden="true">
            {/* 欄標頭：星期 */}
            {colHeaders.map((txt, i) => (
              <span
                key={`h-${i}`}
                className="doy-col-head"
                style={{
                  gridColumn: i + 1,
                  gridRow: 1,
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {txt}
              </span>
            ))}
            {/* 列標頭：週數 */}
            {Array.from({ length: rows }, (_, r) => (
              <span
                key={`w-${r}`}
                className="doy-row-head"
                style={{
                  gridColumn: 1,
                  gridRow: r + 1,
                  animationDelay: `${r * 60}ms`,
                }}
              >
                {`W${String((r + 1) * weeksPerRow).padStart(2, "0")}`}
              </span>
            ))}
          </div>
        )}

        {/* 年度格子 */}
        <div className="doy-grid">
          {cells.map((cell, i) =>
            cell.type === "pad" ? (
              <span key={i} className="doy-dot doy-dot-pad" />
            ) : (
              <span
                key={`day-${cell.day}`}
                className={`doy-dot ${
                  cell.day <= displayIndex ? "is-active" : "is-inactive"
                }`}
                style={
                  cell.day <= displayIndex
                    ? {
                        ["--delay"]: isPreview
                          ? `${Math.max(cell.day - todayIndex, 0) * 10}ms`
                          : `${(cell.day - 1) * 10}ms`,
                      }
                    : undefined
                }
                onMouseEnter={() => {
                  setHoverDay(cell.day);
                  if (cell.day > todayIndex) setHoverTarget(cell.day);
                }}
                onMouseLeave={() => {
                  setHoverDay(null);
                  setHoverTarget(null);
                }}
                aria-label={`Day ${cell.day}`}
              />
            )
          )}
        </div>

        {/* 年與剩餘天數 */}
        <div className="doy-meta">
          <div className="doy-year">{year}</div>
          <div className="doy-right">
            <span className="doy-left-num">{animatedLeft}</span>
            <span className="doy-left-text">days left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayOfYear;
