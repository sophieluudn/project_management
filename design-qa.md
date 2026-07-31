# Design QA

- source visual truth path: `/Users/sophielu/.codex/generated_images/019ee9a6-9907-7fc2-824e-cf469510eaa9/exec-3c9e69f8-b765-47e7-b7f3-ded79408b93e.png`
- implementation screenshot path: `qa-projects-final.png`
- viewport: 1440 × 1024
- state: 已登入的專案列表，預設篩選條件，10 筆 mock data
- full-view comparison evidence: `qa-comparison-final.png`
- focused region comparison evidence: `qa-table-comparison.png`（篩選工具列、表頭、列密度、Badge、圖示與日期欄位）

**Findings**

- 無 P0／P1／P2 問題。
- 字型與排版：實作採 Noto Sans TC／PingFang TC fallback，標題、表頭、內文與輔助文字層級清楚；密度比來源略緊湊，但保持可讀性且符合後台效率需求。
- 間距與版面節奏：側欄、72px Header、主內容邊界、工具列與單一表格面均對齊來源結構；桌機無裁切，手機版工具列垂直排列且表格可水平捲動。
- 色彩與視覺 token：主色固定為科技藍 `#2563EB`，無紫色與漸層；淺藍 active surface 與語意狀態色符合確認方向，文字對比清楚。
- 圖像與素材：來源沒有照片或插圖；所有介面圖示使用同一套 Lucide React icon，無 CSS 圖像、手繪 SVG 或 placeholder 素材。
- 文案與內容：所有介面文字為繁體中文；資料格式與日期格式符合需求，標題與篩選文案可獨立理解。
- 狀態與互動：登入保護、搜尋過濾、詳情 Tabs、需求新增、行事曆 Dialog、手機導覽與登出均已在瀏覽器驗證；console 無錯誤。
- Accessibility：表單具可見 label、必填標示、focus ring 與語意按鈕；手機選單與登出具 accessible name。

**Open Questions**

- 無阻擋項目。視覺稿的歡迎句未放入實作，保留使用者需求中的「目前頁面標題」結構，視為有意的產品文案調整。

**Implementation Checklist**

- [x] 桌機視覺結構與科技藍 token
- [x] 10 筆專案表格與狀態 Badge
- [x] 桌機及手機響應式檢查
- [x] 核心互動與 console error 檢查
- [x] TypeScript 與 production build

**Patches Made Since Previous QA Pass**

- 移除登入頁裝飾性漸層，統一為科技業淺灰底。
- 為手機選單與登出補上 accessible name。
- 將文字形式的 Google 標記替換為一致的 icon library 圖示。
- 完成 pnpm esbuild allowBuilds 設定，使標準建置指令可正常執行。

**Follow-up Polish**

- P3：若日後有品牌字型，可替換目前系統繁中字型 fallback 以進一步統一跨平台字寬。

final result: passed
