// import React, { useEffect, useState } from "react";
// import "../styles/ProgressBar.css";

// /**
//  * ProgressBar:
//  *  - 自動判斷是否為閏年，確定當年的總天數（365 或 366）。
//  *  - 計算今天是今年的第幾天。
//  *  - 透過 useState 和 useEffect 讓進度條從 0 累加到當前年進度。
//  *  - 讓進度條的數值顯示 "X / 365" 或 "X / 366"，並且其背景根據進度變化位移。
//  */
// const ProgressBar = () => {
//   // 取得當前年份
//   const currentYear = new Date().getFullYear();

//   // 判斷是否為閏年
//   const isLeapYear =
//     (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
//     currentYear % 400 === 0;

//   // 設定今年的總天數
//   const maxDays = isLeapYear ? 366 : 365;

//   // 計算今天是今年的第幾天
//   const dayOfYear = (() => {
//     const now = new Date();
//     const start = new Date(currentYear, 0, 1); // 取得當年 1 月 1 日
//     const diff = now - start; // 計算從 1 月 1 日至今的毫秒數
//     return Math.floor(diff / 86400000) + 1; // 換算成天數（1 天 = 86400000 毫秒），+1 代表包含今天
//   })();

//   // 進度條當前值，從 0 開始逐步增加到 dayOfYear
//   const [value, setValue] = useState(0);

//   // 控制背景位置變化的狀態，使用百分比來對應進度
//   const [pos, setPos] = useState("100%");

//   useEffect(() => {
//     let timer;
//     if (value < dayOfYear) {
//       timer = setInterval(() => {
//         setValue((prev) => {
//           const next = prev + 1;
//           if (next >= dayOfYear) {
//             clearInterval(timer); // 當達到目標值時停止計時器
//             return dayOfYear;
//           }
//           return next;
//         });
//         setPos(`${100 - (value / maxDays) * 100}%`); // 根據 365 或 366 來計算背景位移百分比
//       }, 100); // 每 100 毫秒更新一次
//     }
//     // 清除計時器，防止記憶體洩漏
//     return () => clearInterval(timer);
//   }, [value, dayOfYear, maxDays]);

//   return (
//     <div className="progress-container">
//       <div className="progress-wrapper">
//         {/* 進度條 */}
//         <progress max={maxDays} value={value} className="my-progress" />
//         {/* 顯示進度的文字，並且背景會根據進度變化 */}
//         <div
//           className="progress-text"
//           style={{ backgroundPosition: `0 ${pos}` }}
//         >
//           {value} / {maxDays}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;
import React, { useEffect, useState } from "react";
import "../styles/ProgressBar.css";

const ProgressBar = () => {
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

  // 進度條當前值（數字逐漸增加）
  const [value, setValue] = useState(0);

  // 控制背景位置變化（由下往上）
  const [pos, setPos] = useState(0);

  useEffect(() => {
    let timer;
    if (value < dayOfYear) {
      timer = setInterval(() => {
        setValue((prev) => {
          const next = prev + 1;
          if (next >= dayOfYear) {
            clearInterval(timer);
            return dayOfYear;
          }
          return next;
        });

        // 由下往上：pos 從 0% 增加到 100%
        setPos(((value + 1) / maxDays) * 100);
      }, 100);
    }

    return () => clearInterval(timer);
  }, [value, dayOfYear, maxDays]);

  return (
    <div className="progress-container">
      <div className="progress-wrapper">
        <progress max={maxDays} value={value} className="my-progress" />
        <div
          className="progress-text"
          style={{
            // 讓背景由下往上移動
            backgroundPosition: `0 calc(100% - ${pos}%)`,
            // 可自行調整大小，看你想要多少拉伸／壓縮
            backgroundSize: "100% 150%",
          }}
        >
          {value} / {maxDays}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
