import { useEffect, useState } from "react";
import "./YearPct.css";

const YearPct = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const percent = ((now - start) / (end - start)) * 100;
    setProgress(percent.toFixed(0));
  }, []);

  return (
    <div className="year-pct-container">
      <div className="year-pct-bar" style={{ width: `${progress}%` }}></div>
      <span className="year-pct-text">{progress}%</span>
    </div>
  );
};

export default YearPct;
