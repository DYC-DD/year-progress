import React, { useEffect, useState } from "react";
import "../styles/ProgressBar.css";

const ProgressBar = () => {
  // 取得目前年份與判斷是否為閏年
  const currentYear = new Date().getFullYear();
  const isLeapYear =
    (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
    currentYear % 400 === 0;
  const maxDays = isLeapYear ? 366 : 365;

  // 計算今天是今年的第幾天
  const dayOfYear = (() => {
    const now = new Date();
    const start = new Date(currentYear, 0, 1);
    const diff = now - start;
    return Math.floor(diff / 86400000) + 1;
  })();

  // 進度值：從 0 漸增到 dayOfYear
  const [value, setValue] = useState(0);

  // 每 100 毫秒增加 value，直到達到今天的天數
  useEffect(() => {
    if (value >= dayOfYear) return; // 已達到目標值時不再設定 interval
    const intervalId = setInterval(() => {
      setValue((prev) => {
        const next = prev + 1;
        if (next >= dayOfYear) {
          clearInterval(intervalId);
          return dayOfYear;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, [value, dayOfYear]);

  // 當進度條達到 dayOfYear 時，等待 10 秒後重新從 0 開始
  useEffect(() => {
    if (value !== dayOfYear) return;
    const timeoutId = setTimeout(() => {
      setValue(0);
    }, 10000); // 10 秒重置
    return () => clearTimeout(timeoutId);
  }, [value, dayOfYear]);

  return (
    <div className="progress-container">
      <div className="progress-wrapper">
        <progress max={maxDays} value={value} className="my-progress" />
        <div className="progress-text">
          {value} / {maxDays}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
