import React, { useEffect, useState } from "react";
import "./DayTrack.css";

const DayTrack = () => {
  const currentYear = new Date().getFullYear();
  const isLeapYear =
    (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
    currentYear % 400 === 0;
  const maxDays = isLeapYear ? 366 : 365;

  const dayOfYear = (() => {
    const now = new Date();
    const start = new Date(currentYear, 0, 1);
    const diff = now - start;
    return Math.floor(diff / 86400000) + 1;
  })();

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value >= dayOfYear) return;
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

  useEffect(() => {
    if (value !== dayOfYear) return;
    const timeoutId = setTimeout(() => {
      setValue(0);
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, [value, dayOfYear]);

  return (
    <div className="day-track-container">
      <div className="day-track-wrapper">
        <progress max={maxDays} value={value} className="day-track-progress" />
        <div className="day-track-text">
          {value} / {maxDays}
        </div>
      </div>
    </div>
  );
};

export default DayTrack;
