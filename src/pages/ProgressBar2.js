import { useState, useEffect } from "react";
import "../styles/ProgressBar2.css";

const ProgressBar2 = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const percent = ((now - start) / (end - start)) * 100;
    setProgress(percent.toFixed(0));
  }, []);

  return (
    <div className="progress-container2">
      <div className="progress-bar2" style={{ width: `${progress}%` }}></div>
      <span className="progress-text2">{progress}%</span>
    </div>
  );
};

export default ProgressBar2;
