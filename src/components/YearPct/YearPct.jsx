import { useEffect, useMemo, useRef, useState } from "react";
import "./YearPct.css";

const YearPct = () => {
  const target = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    return Number((((now - start) / (end - start)) * 100).toFixed(0));
  }, []);

  const [progress, setProgress] = useState(0);
  const hasStartedRef = useRef(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          setProgress(target);
        }
        if (!entry.isIntersecting) {
          hasStartedRef.current = false;
          setProgress(0);
        }
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div className="year-pct-block" ref={wrapRef}>
      <div className="year-pct-container">
        <div className="year-pct-bar" style={{ width: `${progress}%` }}></div>
        <span className="year-pct-text">{progress}%</span>
      </div>
      <p className="year-pct-description">Dividing the year into 100 pieces.</p>
    </div>
  );
};

export default YearPct;
