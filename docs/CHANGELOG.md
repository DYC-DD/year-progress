# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2025-08-12

### Added

- 新增 **DayOfYear** 頁面，支援互動提示與格狀年度視覺化。
  - 年度格子顯示支援滑鼠懸浮顯示日期 Tooltip。
  - 自適應不同螢幕寬度，自動調整每行顯示週數與間距。

### Changed

- 大幅整理專案目錄架構，依照功能模組重新分類元件與樣式。
- 調整多數元件 UI/UX，提升視覺一致性與互動體驗。
- 部分動畫與數字變化改為僅在元件進入視窗時觸發，以節省效能。

## [2.0.0] - 2025-05-03

### Changed

- 專案架構由 Create React App 遷移至 Vite，大幅提升建置速度與開發體驗。
- 重構 `package.json` 腳本以支援 Vite。
- 調整專案目錄結構，符合現代前端開發流程。

### Removed

- 移除 `react-scripts` 相關設定與 CRA 預設配置。

## [1.1.1] - 2025-02-04

### Fixed

- 修正進度條元件樣式錯誤，改善響應式顯示與視覺效果。

## [1.1.0] - 2025-02-03

### Added

- 新增兩款年度進度條元件（`ProgressBar` 與 `ProgressBar2`），提供不同視覺風格。

## [1.0.0] - 2025-01-31

### Added

- 初始版本發布，包含首頁排版與畫面區塊吸附（snap scroll）功能。
