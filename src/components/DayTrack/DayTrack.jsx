import React, { useEffect, useRef, useState } from "react";
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
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
          } else {
            setHasStarted(false);
            setValue(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!hasStarted || value >= dayOfYear) return;

    const intervalId = setInterval(() => {
      setValue((prev) => {
        const next = prev + 1;
        if (next >= dayOfYear) {
          clearInterval(intervalId);
          return dayOfYear;
        }
        return next;
      });
    }, 20);
    return () => clearInterval(intervalId);
  }, [hasStarted, value, dayOfYear]);

  return (
    <div id="day-track" ref={sectionRef} className="day-track-container">
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
