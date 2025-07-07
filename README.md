# 任務內容設計工具 (Task Content Designer)

Task Content Designer 是一個以 Vue 3 為基礎所開發的任務內容設計工具，支援視覺化拖曳與階層化任務編輯，適合用於表單設計、問卷管理、任務模板配置等場景。

---

## ✨ 功能特色

- **拖曳式操作**：透過滑鼠拖曳從題型區加入標題、單選、複選、填空等內容。
- **多層級結構**：標題下可巢狀各式題型，打造清晰的內容架構。
- **即時預覽**：可開啟預覽分頁查看結構與內容呈現。
- **本地儲存**：使用 `sessionStorage` 快速保存與傳遞設計內容。
- **JSON 查看**：可一鍵查看整體任務結構的 JSON 格式，方便整合後端或匯出使用。

---

## 🛠️ 技術棧

- [Vue 3](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [vue-draggable-plus](https://github.com/SortableJS/vue-draggable-next)
- [Tailwind CSS](https://tailwindcss.com/)
- [Remix Icon](https://remixicon.com/)
- [Vue Router](https://router.vuejs.org/)

---

## ⚙️ 安裝步驟

請先確認已安裝 [Node.js](https://nodejs.org/) 與 [npm](https://www.npmjs.com/)。

```bash
# 1. 複製專案
git clone https://github.com/your-username/task-content-designer.git

# 2. 進入目錄
cd task-content-designer

# 3. 安裝依賴
npm install
```

---

## ▶️ 啟動方式

```bash
npm run dev
```
