import React, { useEffect, useMemo, useRef, useState } from "react";
import "./DayOfYear.css";

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.floor((date - start) / 86400000) + 1;
}
function dateFromDay(year, day) {
  return new Date(year, 0, day);
}
const pad2 = (n) => String(n).padStart(2, "0");
const fmtBadge = (d) =>
  `${new Intl.DateTimeFormat("en", { weekday: "long" }).format(d)}, ${pad2(
    d.getMonth() + 1
  )}.${pad2(d.getDate())}`;

const COLS = 14;

const DayOfYear = () => {
  const now = useMemo(() => new Date(), []);
  const year = now.getFullYear();
  const wrapRef = useRef(null);

  const { totalDays, todayIndex, daysLeft, cells } = useMemo(() => {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDays = isLeap ? 366 : 365;
    const todayIndex = getDayOfYear(now);
    const daysLeft = totalDays - todayIndex;

    const startDow = new Date(year, 0, 1).getDay();
    const totalCells = startDow + totalDays;

    const cells = Array.from({ length: totalCells }, (_, i) =>
      i < startDow ? { type: "pad" } : { type: "day", day: i - startDow + 1 }
    );

    return { totalDays, todayIndex, daysLeft, cells };
  }, [now, year]);

  const rows = Math.ceil(cells.length / COLS);

  const [hoverDay, setHoverDay] = useState(null);
  const [tip, setTip] = useState({ x: 0, y: 0, visible: false });
  const onGridMouseMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const TIP_OFFSET_X = 6;
    const TIP_OFFSET_Y = 6;
    setTip({
      x: e.clientX - rect.left + TIP_OFFSET_X,
      y: e.clientY - rect.top + TIP_OFFSET_Y,
      visible: true,
    });
  };

  const targetLeft = hoverDay != null ? totalDays - hoverDay : daysLeft;
  const [animatedLeft, setAnimatedLeft] = useState(targetLeft);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = animatedLeft;
    const to = targetLeft;
    const dur = 300;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      const t = Math.min(1, (ts - start) / dur);
      const v = Math.round(from + (to - from) * easeOutCubic(t));
      setAnimatedLeft(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLeft]);

  const hoverLabel =
    hoverDay != null ? fmtBadge(dateFromDay(year, hoverDay)) : null;

  const colHeaders = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return (
    <div className="doy" ref={wrapRef}>
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

      <div
        className="doy-grid-box"
        onMouseMove={onGridMouseMove}
        onMouseLeave={() => {
          setTip((t) => ({ ...t, visible: false }));
          setHoverDay(null);
        }}
      >
        {tip.visible && (
          <div className="doy-overlay" aria-hidden="true">
            {colHeaders.map((txt, i) => (
              <span
                key={`h-${i}`}
                className="doy-col-head"
                style={{
                  gridColumn: i + 1,
                  gridRow: 1,
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {txt}
              </span>
            ))}
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
                {`W${String((r + 1) * 2).padStart(2, "0")}`}
              </span>
            ))}
          </div>
        )}

        <div className="doy-grid">
          {cells.map((cell, i) =>
            cell.type === "pad" ? (
              <span key={i} className="doy-dot doy-dot-pad" />
            ) : (
              <span
                key={`day-${cell.day}`}
                className={`doy-dot ${
                  cell.day <= todayIndex ? "is-active" : "is-inactive"
                }`}
                style={
                  cell.day <= todayIndex
                    ? { ["--delay"]: `${(cell.day - 1) * 40}ms` }
                    : undefined
                }
                onMouseEnter={() => setHoverDay(cell.day)}
                onMouseLeave={() => setHoverDay(null)}
                aria-label={`Day ${cell.day}`}
              />
            )
          )}
        </div>
      </div>

      <div className="doy-meta">
        <div className="doy-year">{year}</div>
        <div className="doy-right">
          <span className="doy-left-num">{animatedLeft}</span>
          <span className="doy-left-text">days left</span>
        </div>
      </div>
    </div>
  );
};

export default DayOfYear;
