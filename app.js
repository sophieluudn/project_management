const projects = [
  {
    id: 1,
    version: "v1.4.0",
    projectType: "iOS",
    name: "會員中心改版",
    product: "App 產品線",
    pm: "Sophie Lu",
    it: "Kai Chen",
    status: "開發中",
    priority: "高",
    devDone: "2026-05-28",
    launch: "2026-06-05",
    reqDate: "05/06",
    startDate: "05/10",
    testDate: "05/29",
    summary: "調整會員資料、綁定手機與通知設定流程，降低客服協助修改資料的頻率。",
    requirementBackground: "目前會員資料修改流程分散在多個頁面，使用者需要反覆跳轉，客服也無法快速判斷使用者卡在哪個步驟。",
    requirements: ["整合會員資料、手機綁定與通知設定為單一流程。", "新增資料修改紀錄，PM 與客服可查詢最後異動時間。", "手機驗證碼需支援重送與倒數提示。"],
    acceptance: ["PM 可用測試帳號完成完整資料修改流程。", "手機驗證失敗時需顯示明確錯誤訊息。", "後台可查看資料異動紀錄。"],
    comments: [
      { author: "Kai Chen", role: "IT", time: "今天 10:20", text: "手機驗證碼服務會共用現有供應商，預計明天補上 API 錯誤碼清單。" },
      { author: "Sophie Lu", role: "PM", time: "今天 11:05", text: "驗收時會加入重送三次後的限制情境，請 IT 一起確認提示文字。" }
    ],
    history: ["Sophie Lu 建立專案需求", "Kai Chen 將狀態更新為開發中", "Sophie Lu 新增 2 件測試 Bug"]
  },
  {
    id: 2,
    version: "v2.1.0",
    projectType: "平台",
    name: "B2B 報表下載",
    product: "營運後台",
    pm: "Mia Wang",
    it: "Leo Huang",
    status: "測試中",
    priority: "中",
    devDone: "2026-05-24",
    launch: "2026-05-30",
    reqDate: "05/03",
    startDate: "05/08",
    testDate: "05/25",
    summary: "讓營運人員可依客戶與日期區間下載銷售報表。",
    requirementBackground: "營運團隊目前需要請工程師手動拉報表，等待時間較長。",
    requirements: ["支援 Excel 匯出。", "可依客戶、產品線與日期篩選。", "匯出任務完成後顯示下載入口。"],
    acceptance: ["10 萬筆資料可於 2 分鐘內產生。", "無權限使用者不可下載其他產品線報表。"],
    comments: [{ author: "Leo Huang", role: "IT", time: "昨天 16:40", text: "大量資料匯出會改成背景任務，避免頁面逾時。" }],
    history: ["Mia Wang 建立需求", "Leo Huang 上傳測試版", "Mia Wang 將狀態更新為測試中"]
  },
  {
    id: 3,
    version: "v1.2.3",
    projectType: "模組",
    name: "活動頁抽獎模組",
    product: "官網",
    pm: "Nina Lin",
    it: "Kai Chen",
    status: "待上線",
    priority: "高",
    devDone: "2026-05-20",
    launch: "2026-05-27",
    reqDate: "04/29",
    startDate: "05/04",
    testDate: "05/21",
    summary: "活動頁支援抽獎資格判定、獎項設定與名單匯出。",
    requirementBackground: "行銷活動頻率提高，需要可重複使用的抽獎模組。",
    requirements: ["可設定活動期間與獎項數量。", "支援黑名單排除。", "中獎名單可匯出 CSV。"],
    acceptance: ["活動結束後不可再抽獎。", "重複參與者只能保留一次資格。"],
    comments: [{ author: "Nina Lin", role: "PM", time: "05/22 14:12", text: "上線前請再確認黑名單匯入格式。" }],
    history: ["Nina Lin 建立專案", "Kai Chen 完成修復", "Nina Lin 通過驗收"]
  },
  {
    id: 4,
    version: "v0.9.0",
    projectType: "Android",
    name: "客服工單分類調整",
    product: "CRM",
    pm: "Sophie Lu",
    it: "Ivy Tsai",
    status: "需求確認中",
    priority: "低",
    devDone: "2026-06-14",
    launch: "2026-06-21",
    reqDate: "05/22",
    startDate: "06/03",
    testDate: "06/15",
    summary: "新增客服工單二層分類與結案原因統計。",
    requirementBackground: "客服主管需要更細的問題分類以追蹤改善成效。",
    requirements: ["新增二層分類維護。", "結案時必填原因。", "報表新增分類統計。"],
    acceptance: ["既有工單資料不受影響。", "主管角色可查看全部分類統計。"],
    comments: [{ author: "Ivy Tsai", role: "IT", time: "今天 09:10", text: "請 PM 補充目前分類清單，會影響資料表設計。" }],
    history: ["Sophie Lu 建立草稿", "Ivy Tsai 留言要求補充分類清單"]
  }
];

let bugs = [
  { id: 101, projectId: 1, title: "手機驗證碼重送後倒數未重置", type: "Bug", status: "待處理", priority: "高", assignee: "Kai Chen", description: "重送驗證碼後倒數仍停在 0 秒，使用者無法再次操作。" },
  { id: 102, projectId: 1, title: "會員資料儲存成功後缺少提示", type: "測試問題", status: "處理中", priority: "中", assignee: "Kai Chen", description: "資料已儲存，但頁面沒有成功訊息。" },
  { id: 103, projectId: 1, title: "異動紀錄需補上操作來源", type: "補充需求", status: "已修復", priority: "低", assignee: "Kai Chen", description: "需顯示 App 或後台。" },
  { id: 104, projectId: 2, title: "報表下載檔名未帶日期", type: "調整", status: "待 PM 確認", priority: "中", assignee: "Leo Huang", description: "匯出檔名需要方便營運辨識日期區間。" },
  { id: 105, projectId: 3, title: "黑名單匯入錯誤訊息不明確", type: "Bug", status: "已關閉", priority: "高", assignee: "Kai Chen", description: "格式錯誤時只顯示失敗。" }
];

let projectItems = [
  { id: 201, projectId: 1, name: "會員資料維護流程", it: "Kai Chen", priority: "高", progress: "開發中", requirementMarkdown: "## PM 需求\n- 整合會員資料、手機綁定與通知設定為單一流程。\n- 補上資料修改紀錄。", messages: [{ author: "Kai Chen", role: "IT", time: "今天 10:20", text: "會員資料異動紀錄是否需要顯示舊值與新值？" }, { author: "Sophie Lu", role: "PM", time: "今天 10:42", text: "需要，至少顯示欄位名稱、異動前、異動後與操作來源。" }] },
  { id: 202, projectId: 1, name: "手機驗證碼重送倒數修復", it: "Kai Chen", priority: "高", progress: "待處理", requirementMarkdown: "## 測試 Bug\n- 重送驗證碼後倒數需重新計算。\n- 三次重送後顯示限制提示。", messages: [{ author: "Sophie Lu", role: "PM", time: "昨天 15:10", text: "測試時重送後畫面仍停在 0 秒，請協助確認前端狀態。" }] },
  { id: 203, projectId: 2, name: "銷售報表匯出", it: "Leo Huang", priority: "中", progress: "測試中", requirementMarkdown: "## PM 需求\n- 依客戶、產品線與日期篩選。\n- 支援 Excel 匯出與背景任務。", messages: [] },
  { id: 204, projectId: 3, name: "黑名單匯入錯誤提示", it: "Kai Chen", priority: "低", progress: "已修復", requirementMarkdown: "## 測試 Bug\n- 匯入格式錯誤時需顯示欄位與行數。", messages: [] }
];

let products = [
  { id: 1, name: "App 產品線", type: "iOS", description: "會員、通知與 App 端核心流程管理。", enabled: true, note: "主要由 PM 團隊與 App IT 維護。" },
  { id: 2, name: "營運後台", type: "平台", description: "營運報表、活動設定與內部作業工具。", enabled: true, note: "需控管報表下載權限。" },
  { id: 3, name: "官網", type: "平台", description: "品牌官網、活動頁與公開內容管理。", enabled: true, note: "活動檔期前需提早排程。" },
  { id: 4, name: "CRM", type: "Chatbot", description: "客服工單、會員服務與客戶資料管理。", enabled: true, note: "涉及個資欄位需特別審核。" }
];

let productTypes = [
  { id: 1, name: "Android", option: "類型", enabled: true, note: "" },
  { id: 2, name: "iOS", option: "類型", enabled: true, note: "" },
  { id: 3, name: "平台", option: "類型", enabled: true, note: "" },
  { id: 4, name: "Chatbot", option: "類型", enabled: true, note: "" },
  { id: 5, name: "模組", option: "類型", enabled: true, note: "" },
  { id: 6, name: "需求確認中", option: "進度", enabled: true, note: "" },
  { id: 7, name: "開發中", option: "進度", enabled: true, note: "" },
  { id: 8, name: "測試中", option: "進度", enabled: true, note: "" },
  { id: 9, name: "待上線", option: "進度", enabled: true, note: "" },
  { id: 10, name: "已上線", option: "進度", enabled: true, note: "" },
  { id: 11, name: "暫停", option: "進度", enabled: true, note: "" },
  { id: 12, name: "待處理", option: "進度", enabled: true, note: "" },
  { id: 13, name: "已修復", option: "進度", enabled: true, note: "" },
  { id: 14, name: "已完成", option: "進度", enabled: true, note: "" }
];

let roles = [
  { id: 1, name: "系統管理員", description: "管理所有資料、使用者與權限設定。", enabled: true, permissions: ["專案查看", "專案新增編輯", "Todo Bug 管理", "產品管理", "角色管理", "使用者管理"], note: "僅限平台維護者。" },
  { id: 2, name: "PM 管理者", description: "管理產品、專案、需求與 PM 團隊。", enabled: true, permissions: ["專案查看", "專案新增編輯", "Todo Bug 管理", "產品管理"], note: "可維護產品基礎資料。" },
  { id: 3, name: "PM", description: "建立專案、撰寫需求、新增測試 Bug。", enabled: true, permissions: ["專案查看", "專案新增編輯", "Todo Bug 管理"], note: "不可調整角色權限。" },
  { id: 4, name: "IT 管理者", description: "指派開發人員、管理開發與修復進度。", enabled: true, permissions: ["專案查看", "Todo Bug 管理", "使用者管理"], note: "可協助指派 IT 成員。" },
  { id: 5, name: "IT", description: "查看需求、留言、更新開發與 Bug 狀態。", enabled: true, permissions: ["專案查看", "Todo Bug 管理"], note: "不可新增產品與角色。" },
  { id: 6, name: "檢視者", description: "查看被授權的專案與進度，不可編輯。", enabled: true, permissions: ["專案查看"], note: "通常給主管或跨部門檢視。" }
];

let users = [
  { id: 1, name: "Sophie Lu", email: "sophie@example.com", role: "PM 管理者", products: ["App 產品線", "CRM"], enabled: true },
  { id: 2, name: "Kai Chen", email: "kai@example.com", role: "IT", products: ["App 產品線", "官網"], enabled: true },
  { id: 3, name: "Mia Wang", email: "mia@example.com", role: "PM", products: ["營運後台"], enabled: true },
  { id: 4, name: "Leo Huang", email: "leo@example.com", role: "IT 管理者", products: ["營運後台"], enabled: true },
  { id: 5, name: "Ivy Tsai", email: "ivy@example.com", role: "IT", products: ["CRM"], enabled: true }
];

const permissionModules = ["專案", "開發需求", "Todo / Bug", "產品", "使用者", "角色", "權限"];
const statuses = ["待處理", "處理中", "已修復", "待 PM 確認", "已關閉"];
let selectedProjectId = 1;
let versionAttachments = [];
let activeEditorId = "versionEditor";
let projectFormCanEdit = true;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function statusClass(status) {
  if (status === "開發中") return "status-build";
  if (status === "測試中") return "status-test";
  if (status === "待上線") return "status-launch";
  return "status-confirm";
}

function formatDate(dateString) {
  if (!dateString || dateString === "待排程") return "待排程";
  return dateString.replace("2026-", "").replace("-", "/");
}

function toIsoDate(dateString) {
  if (!dateString || dateString === "待排程") return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  if (/^\d{2}\/\d{2}$/.test(dateString)) return `2026-${dateString.replace("/", "-")}`;
  return "";
}

function getProject(id) {
  return projects.find((project) => project.id === Number(id)) || projects[0];
}

function selectedValues(select) {
  return Array.from(select.selectedOptions).map((option) => option.value);
}

function setSelectedValues(select, values) {
  const nextValues = Array.isArray(values) ? values : String(values || "").split("、").filter(Boolean);
  Array.from(select.options).forEach((option) => {
    option.selected = nextValues.includes(option.value);
  });
  syncMultiSelect(select);
}

function syncMultiSelect(select) {
  const widget = select?.nextElementSibling?.classList?.contains("multi-select") ? select.nextElementSibling : null;
  if (!widget) return;
  const selectedOptions = Array.from(select.selectedOptions);
  const tags = widget.querySelector(".multi-select-tags");
  const dropdown = widget.querySelector(".multi-select-dropdown");
  const placeholder = select.getAttribute("placeholder") || "請選擇";
  widget.classList.toggle("is-disabled", select.disabled);
  tags.innerHTML = selectedOptions.length
    ? selectedOptions.map((option) => `
        <span class="multi-select-tag" data-value="${escapeHtml(option.value)}">
          <span>${escapeHtml(option.textContent)}</span>
          <button type="button" aria-label="移除 ${escapeHtml(option.textContent)}">×</button>
        </span>
      `).join("")
    : `<span class="multi-select-placeholder">${placeholder}</span>`;
  dropdown.innerHTML = Array.from(select.options).map((option) => `
    <div class="multi-select-option ${option.selected ? "is-selected" : ""}" data-value="${escapeHtml(option.value)}" role="option" aria-selected="${option.selected}">
      ${escapeHtml(option.textContent)}
    </div>
  `).join("");
}

function enhanceMultiSelect(select) {
  if (!select || select.dataset.enhancedSelect === "true") {
    syncMultiSelect(select);
    return;
  }
  select.dataset.enhancedSelect = "true";
  select.classList.add("native-multi-select");
  const widget = document.createElement("div");
  widget.className = "multi-select";
  widget.innerHTML = `
    <button class="multi-select-control" type="button" aria-haspopup="listbox" aria-expanded="false">
      <span class="multi-select-tags"></span>
      <span class="multi-select-arrow">⌄</span>
    </button>
    <div class="multi-select-dropdown" role="listbox" aria-multiselectable="true"></div>
  `;
  select.insertAdjacentElement("afterend", widget);

  const keepDropdownInModalView = () => {
    window.requestAnimationFrame(() => {
      const modal = widget.closest(".modal-card");
      const dropdown = widget.querySelector(".multi-select-dropdown");
      if (!modal || !dropdown || !widget.classList.contains("is-open")) return;
      const modalRect = modal.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const overflow = dropdownRect.bottom - modalRect.bottom + 16;
      if (overflow > 0) {
        modal.scrollTop += overflow;
      }
    });
  };

  widget.querySelector(".multi-select-control").addEventListener("click", () => {
    if (select.disabled) return;
    $$(".multi-select.is-open").forEach((item) => {
      if (item !== widget) {
        item.classList.remove("is-open");
        item.querySelector(".multi-select-control").setAttribute("aria-expanded", "false");
      }
    });
    const open = !widget.classList.contains("is-open");
    widget.classList.toggle("is-open", open);
    widget.querySelector(".multi-select-control").setAttribute("aria-expanded", String(open));
    if (open) keepDropdownInModalView();
  });

  widget.addEventListener("click", (event) => {
    const tagRemove = event.target.closest(".multi-select-tag button");
    if (tagRemove) {
      event.stopPropagation();
      const value = tagRemove.closest(".multi-select-tag").dataset.value;
      const option = Array.from(select.options).find((item) => item.value === value);
      if (option) option.selected = false;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      syncMultiSelect(select);
      return;
    }
    const optionItem = event.target.closest(".multi-select-option");
    if (!optionItem) return;
    const option = Array.from(select.options).find((item) => item.value === optionItem.dataset.value);
    if (!option) return;
    option.selected = !option.selected;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    syncMultiSelect(select);
    keepDropdownInModalView();
  });

  syncMultiSelect(select);
}

function enhanceAllMultiSelects() {
  $$("select[multiple]").forEach(enhanceMultiSelect);
}

function userOptionsByRole(roleText) {
  return users.filter((user) => user.role.includes(roleText) || user.role.includes(`${roleText} 管理者`));
}

function responsibleUsersForProduct(productName) {
  return users.filter((user) => user.enabled && user.products.includes(productName) && (user.role.includes("PM") || user.role.includes("IT")));
}

function uniqueList(values) {
  return [...new Set(values.filter(Boolean))];
}

function splitAssignees(value) {
  return String(value || "").split("、").filter(Boolean);
}

function currentUser() {
  return users.find((user) => user.name === "Sophie Lu") || users[0];
}

function currentRole() {
  const user = currentUser();
  return roles.find((role) => role.name === user.role);
}

function hasPermission(permission) {
  return currentRole()?.permissions.includes(permission);
}

function projectVersion(project) {
  return project.version || `v1.${project.id}.0`;
}

function productTypeForProject(project) {
  return products.find((product) => product.name === project.product)?.type || project.projectType || "平台";
}

function optionNamesByKind(kind, selectedName = "") {
  return uniqueList([
    ...productTypes.filter((item) => item.option === kind && (item.enabled || item.name === selectedName)).map((item) => item.name),
    selectedName
  ]).filter(Boolean);
}

function renderProjects() {
  const keyword = $("#projectSearch").value.trim().toLowerCase();
  const product = $("#productFilter").value;
  const pm = $("#pmFilter").value;
  const it = $("#itFilter").value;
  const status = $("#statusFilter").value;
  const rows = projects
    .filter((project) => product === "all" || project.product === product)
    .filter((project) => pm === "all" || splitAssignees(project.pm).includes(pm))
    .filter((project) => it === "all" || splitAssignees(project.it).includes(it))
    .filter((project) => status === "all" || project.status === status)
    .filter((project) => {
      const haystack = `${project.version} ${productTypeForProject(project)} ${project.product} ${project.pm} ${project.it}`.toLowerCase();
      return haystack.includes(keyword);
    })
    .map((project) => {
      const count = bugs.filter((bug) => bug.projectId === project.id && bug.status !== "已關閉").length;
      return `
        <tr>
          <td>${project.product}</td>
          <td>${productTypeForProject(project)}</td>
          <td><button class="link-button" data-open-overview="${project.id}" type="button">${projectVersion(project)}</button></td>
          <td>${project.pm}</td>
          <td>${project.it}</td>
          <td><span class="status ${statusClass(project.status)}">${project.status}</span></td>
          <td>${formatDate(project.devDone)}</td>
          <td>${formatDate(project.launch)}</td>
          <td>${count} 件</td>
          <td>
            <div class="row-actions">
              <button type="button" data-open-project="${project.id}">查看</button>
              <button type="button" data-edit-project="${project.id}">編輯</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
  $("#projectRows").innerHTML = rows;
  renderBugProjectOptions();
}

function renderProjectFilters() {
  const productOptions = uniqueList(projects.map((project) => project.product));
  const pmOptions = uniqueList(projects.flatMap((project) => splitAssignees(project.pm)));
  const itOptions = uniqueList(projects.flatMap((project) => splitAssignees(project.it)));
  $("#productFilter").innerHTML = `<option value="all">全部產品</option>${productOptions.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  $("#pmFilter").innerHTML = `<option value="all">全部 PM</option>${pmOptions.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  $("#itFilter").innerHTML = `<option value="all">全部 IT</option>${itOptions.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  $("#statusFilter").innerHTML = `<option value="all">全部狀態</option>${optionNamesByKind("進度").map((item) => `<option value="${item}">${item}</option>`).join("")}`;
}

function renderDashboard() {
  const activeProjects = projects.filter((project) => ["開發中", "測試中"].includes(project.status)).length;
  const confirmProjects = projects.filter((project) => project.status === "需求確認中").length;
  const openBugs = bugs.filter((bug) => bug.status !== "已關閉").length;
  const highBugs = bugs.filter((bug) => bug.status !== "已關閉" && bug.priority === "高").length;
  const launchProjects = projects.filter((project) => ["待上線", "已上線"].includes(project.status)).length;
  $("#dashboardActiveProjects").textContent = activeProjects;
  $("#dashboardConfirmProjects").textContent = confirmProjects;
  $("#dashboardOpenBugs").textContent = openBugs;
  $("#dashboardHighBugs").textContent = `高優先級 ${highBugs} 件`;
  $("#dashboardLaunchProjects").textContent = launchProjects;
  const statuses = uniqueList(projects.map((project) => project.status));
  $("#dashboardStatusList").innerHTML = statuses.map((status) => {
    const count = projects.filter((project) => project.status === status).length;
    return `<div class="dashboard-list-item"><span>${status}</span><strong>${count}</strong></div>`;
  }).join("");
  const launchSoon = projects.filter((project) => project.status === "待上線").length;
  const waiting = projects.filter((project) => project.status === "需求確認中").length;
  $("#dashboardAttentionList").innerHTML = `
    <div class="dashboard-list-item"><span>未關閉 Todo / Bug</span><strong>${openBugs}</strong></div>
    <div class="dashboard-list-item"><span>待上線專案</span><strong>${launchSoon}</strong></div>
    <div class="dashboard-list-item"><span>需求確認中</span><strong>${waiting}</strong></div>
  `;
}

function renderDetail(projectId) {
  const project = getProject(projectId);
  selectedProjectId = project.id;
  $("#detailProduct").textContent = project.product;
  $("#detailTitle").textContent = project.name;
  $("#detailSummary").textContent = project.summary;
  $("#detailStatus").textContent = project.status;
  $("#detailStatus").className = `status ${statusClass(project.status)}`;
  $("#dateReq").textContent = project.reqDate;
  $("#dateStart").textContent = formatDate(project.startDate);
  $("#dateDev").textContent = formatDate(project.devDone);
  $("#dateTest").textContent = project.testDate;
  $("#dateLaunch").textContent = formatDate(project.launch);
  $("#detailPm").textContent = project.pm;
  $("#detailIt").textContent = project.it;
  $("#detailPriority").textContent = project.priority;
  $("#detailBugCount").textContent = `${bugs.filter((bug) => bug.projectId === project.id && bug.status !== "已關閉").length} 件`;
  $("#detailLeavePeriods").innerHTML = (project.leavePeriods || []).length
    ? project.leavePeriods.map((period) => `<div class="dashboard-list-item"><span>${period.person || "未指定"}：${period.start || "未填"} - ${period.end || "未填"}</span><strong>${period.reason || "請假"}</strong></div>`).join("")
    : `<p class="muted">未設定請假期間</p>`;
  $("#detailVersionHtml").innerHTML = project.versionMarkdown
    ? markdownToHtml(project.versionMarkdown)
    : project.versionHtml || "未填寫版本更新內容";
  $("#requirementBackground").innerHTML = project.requirementHtml || project.requirementBackground;
  $("#requirementList").innerHTML = project.requirements.map((item) => `<li>${item}</li>`).join("");
  $("#acceptanceList").innerHTML = project.acceptance.map((item) => `<li>${item}</li>`).join("");
  renderComments(project);
  renderHistory(project);
  renderBugBoard(project.id, "#bugBoard");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, '<img src="$2" alt="$1" title="$3" />')
    .replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  const html = [];
  let listType = "";
  let inCode = false;
  const closeList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = "";
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        html.push("</code></pre>");
        inCode = false;
      } else {
        closeList();
        html.push("<pre><code>");
        inCode = true;
      }
      return;
    }
    if (inCode) {
      html.push(`${escapeHtml(line)}\n`);
      return;
    }
    if (!line.trim()) {
      closeList();
      return;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length, 5);
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
    } else if (unordered || ordered) {
      const targetList = unordered ? "ul" : "ol";
      if (listType !== targetList) {
        closeList();
        listType = targetList;
        html.push(`<${listType}>`);
      }
      html.push(`<li>${renderInlineMarkdown((unordered || ordered)[1])}</li>`);
    } else if (line.startsWith(">")) {
      closeList();
      html.push(`<blockquote>${renderInlineMarkdown(line.replace(/^>\s?/, ""))}</blockquote>`);
    } else {
      closeList();
      html.push(`<p>${renderInlineMarkdown(line)}</p>`);
    }
  });
  closeList();
  if (inCode) html.push("</code></pre>");
  return html.join("");
}

function updateMarkdownPreview(editorId = "versionEditor") {
  const preview = editorId === "itemRequirementEditor" ? $("#itemRequirementPreview") : $("#versionPreview");
  const editor = $(`#${editorId}`);
  if (!preview || !editor) return;
  const markdown = editor.value.trim();
  preview.classList.toggle("muted", !markdown);
  if (editorId === "itemRequirementEditor") {
    preview.textContent = markdown || "Markdown 原始碼會顯示在這裡。";
  } else {
    preview.innerHTML = markdown ? markdownToHtml(markdown) : "Markdown 預覽會顯示在這裡。";
  }
}

function visualEditorTextToMarkdown() {
  const editor = $("#itemRequirementVisualEditor");
  return Array.from(editor.childNodes)
    .map((node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim();
      if (node.nodeName === "H1") return `# ${node.textContent.trim()}`;
      if (node.nodeName === "H2") return `## ${node.textContent.trim()}`;
      if (node.nodeName === "H3") return `### ${node.textContent.trim()}`;
      if (node.nodeName === "UL") {
        return Array.from(node.querySelectorAll("li")).map((li) => `- ${li.textContent.trim()}`).join("\n");
      }
      if (node.nodeName === "OL") {
        return Array.from(node.querySelectorAll("li")).map((li, index) => `${index + 1}. ${li.textContent.trim()}`).join("\n");
      }
      return node.textContent.trim();
    })
    .filter(Boolean)
    .join("\n");
}

function syncVisualRequirementToMarkdown() {
  $("#itemRequirementEditor").value = visualEditorTextToMarkdown();
  updateMarkdownPreview("itemRequirementEditor");
}

function applyVisualMarkdownShortcuts() {
  const editor = $("#itemRequirementVisualEditor");
  const text = editor.innerText.trim();
  const heading = text.match(/^(#{1,3})\s+(.+?)\s*#*$/);
  if (heading && !editor.querySelector("h1,h2,h3,ul,ol")) {
    const level = heading[1].length;
    editor.innerHTML = `<h${level}>${escapeHtml(heading[2])}</h${level}>`;
  } else if (/^[-*]\s+/.test(text) && !editor.querySelector("ul,ol")) {
    const items = text.split(/\n/).map((line) => line.replace(/^[-*]\s+/, "").trim()).filter(Boolean);
    editor.innerHTML = `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }
  syncVisualRequirementToMarkdown();
}

function setVisualRequirementMarkdown(markdown = "") {
  const editor = $("#itemRequirementVisualEditor");
  $("#itemRequirementEditor").value = markdown;
  editor.innerHTML = markdown ? markdownToHtml(markdown) : "";
  updateMarkdownPreview("itemRequirementEditor");
}

function renderComments(project) {
  const html = project.comments
    .map((comment) => `
      <article class="comment-item">
        <header><strong>${comment.author} <span class="muted">${comment.role}</span></strong><span class="muted">${comment.time}</span></header>
        <p>${comment.text}</p>
      </article>
    `)
    .join("");
  $("#commentList").innerHTML = html;
  $("#overviewComments").innerHTML = html;
}

function renderHistory(project) {
  $("#historyList").innerHTML = project.history
    .map((item, index) => `<article class="history-item"><strong>${item}</strong><span class="muted">${index + 1} 筆紀錄</span></article>`)
    .join("");
}

function renderBugBoard(projectId, targetSelector) {
  const target = $(targetSelector);
  const filtered = bugs.filter((bug) => !projectId || bug.projectId === projectId);
  target.innerHTML = statuses
    .map((status) => {
      const cards = filtered
        .filter((bug) => bug.status === status)
        .map((bug) => bugCard(bug))
        .join("");
      return `
        <section class="kanban-column">
          <h4>${status}<span class="muted">${filtered.filter((bug) => bug.status === status).length}</span></h4>
          ${cards || `<p class="muted">目前沒有項目</p>`}
        </section>
      `;
    })
    .join("");
}

function bugCard(bug) {
  const project = getProject(bug.projectId);
  const priorityClass = bug.priority === "高" ? "high" : bug.priority === "中" ? "medium" : "low";
  return `
    <article class="bug-card">
      <strong>${bug.title}</strong>
      <span class="muted">${project.name}</span>
      <p class="muted">${bug.description}</p>
      <div class="bug-meta">
        <span class="pill">${bug.type}</span>
        <span class="pill ${priorityClass}">${bug.priority}</span>
        <span class="pill">${bug.assignee}</span>
      </div>
      <select data-bug-status="${bug.id}" aria-label="修改 ${bug.title} 狀態">
        ${statuses.map((status) => `<option ${status === bug.status ? "selected" : ""}>${status}</option>`).join("")}
      </select>
    </article>
  `;
}

function renderTodoKanban() {
  renderBugBoard(null, "#todoKanban");
}

function renderProducts() {
  $("#productRows").innerHTML = products.map((product) => `
      <tr>
        <td>${product.id}</td>
        <td><button class="link-button" data-edit-product="${product.id}" type="button">${product.name}</button></td>
        <td>${product.type || "平台"}</td>
        <td>${product.description || "<span class=\"muted\">未填寫</span>"}</td>
        <td>
        <label class="switch" aria-label="${product.name} 啟用狀態">
          <input data-toggle-product="${product.id}" type="checkbox" ${product.enabled ? "checked" : ""} />
          <span></span>
        </label>
      </td>
    </tr>
  `).join("");
}

function renderProductTypes() {
  $("#productTypeRows").innerHTML = productTypes.map((type) => `
    <tr>
      <td>${type.id}</td>
      <td><button class="link-button" data-edit-product-type="${type.id}" type="button">${type.name}</button></td>
      <td>${type.option || "類型"}</td>
      <td>
        <label class="switch" aria-label="${type.name} 啟用狀態">
          <input data-toggle-product-type="${type.id}" type="checkbox" ${type.enabled ? "checked" : ""} />
          <span></span>
        </label>
      </td>
    </tr>
  `).join("");
}

function renderRoles() {
  $("#roleRows").innerHTML = roles.map((role) => `
    <tr>
      <td>${role.id}</td>
      <td><button class="link-button" data-edit-role="${role.id}" type="button">${role.name}</button></td>
      <td>
        <label class="switch" aria-label="${role.name} 啟用狀態">
          <input data-toggle-role="${role.id}" type="checkbox" ${role.enabled ? "checked" : ""} />
          <span></span>
        </label>
      </td>
    </tr>
  `).join("");
}

function renderPermissions() {
  $("#permissionRows").innerHTML = permissionModules.map((module, index) => `
    <tr>
      <td><strong>${module}</strong></td>
      ${[0, 1, 2, 3, 4].map((permissionIndex) => {
        const checked = index < 3 || permissionIndex < 3 ? "checked" : "";
        return `<td><input type="checkbox" ${checked} aria-label="${module} 權限 ${permissionIndex + 1}" /></td>`;
      }).join("")}
    </tr>
  `).join("");
}

function renderUsers() {
  $("#userRows").innerHTML = users.map((user) => `
    <tr>
      <td>${user.id}</td>
      <td><button class="link-button" data-edit-user="${user.id}" type="button">${user.name}</button></td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.products.join("、")}</td>
      <td>
        <label class="switch" aria-label="${user.name} 啟用狀態">
          <input data-toggle-user="${user.id}" type="checkbox" ${user.enabled ? "checked" : ""} />
          <span></span>
        </label>
      </td>
    </tr>
  `).join("");
}

function renderBugProjectOptions() {
  $("#bugProjectSelect").innerHTML = projects
    .map((project) => `<option value="${project.id}" ${project.id === selectedProjectId ? "selected" : ""}>${project.name}</option>`)
    .join("");
}

function renderProjectFormOptions(selectedStatus = "") {
  $("#projectProductSelect").innerHTML = products
    .filter((product) => product.enabled)
    .map((product) => `<option value="${product.name}">${product.name}</option>`)
    .join("");
  $("#projectPmSelect").innerHTML = userOptionsByRole("PM")
    .map((user) => `<option value="${user.name}">${user.name}</option>`)
    .join("");
  $("#projectItSelect").innerHTML = userOptionsByRole("IT")
    .map((user) => `<option value="${user.name}">${user.name}</option>`)
    .join("");
  $("#projectStatusSelect").innerHTML = optionNamesByKind("進度", selectedStatus)
    .map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`)
    .join("");
  enhanceAllMultiSelects();
}

function renderProductTypeOptions(selectedType = "") {
  $("#productTypeSelect").innerHTML = optionNamesByKind("類型", selectedType)
    .map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`)
    .join("");
}

function renderProjectProgressOptions(selectedProgress = "") {
  $("#projectItemProgressSelect").innerHTML = optionNamesByKind("進度", selectedProgress)
    .map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`)
    .join("");
}

function renderUserFormOptions() {
  $("#userRoleSelect").innerHTML = roles
    .map((role) => `<option value="${role.name}">${role.name}</option>`)
    .join("");
  $("#userProductCheckboxes").innerHTML = products
    .map((product) => `
      <label>
        <input type="checkbox" name="products" value="${escapeHtml(product.name)}" />
        ${escapeHtml(product.name)}
      </label>
    `)
    .join("");
  enhanceAllMultiSelects();
}

function setUserProductChecks(values = []) {
  const selected = Array.isArray(values) ? values : String(values || "").split("、").filter(Boolean);
  $$("#userProductCheckboxes input[name='products']").forEach((input) => {
    input.checked = selected.includes(input.value);
  });
}

function switchPage(page) {
  $$(".page").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.pagePanel === page));
  const group = page === "dashboard" || page === "projects" || page === "todos" || page === "detail" || page === "projectForm" || page === "itemForm" ? "project" : "permission";
  $$(".nav-group").forEach((item) => item.classList.toggle("is-open", item.dataset.menuGroup === group));
  $$(".nav-parent").forEach((item) => {
    const isActive = item.dataset.parent === group;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-expanded", String(item.closest(".nav-group").classList.contains("is-open")));
  });
  $$(".nav-subitem").forEach((item) => item.classList.toggle("is-active", item.dataset.page === page || ((page === "detail" || page === "projectForm" || page === "itemForm") && item.dataset.page === "projects")));
  const titles = {
    dashboard: ["Dashboard", "專案總覽"],
    projects: ["專案管理", "專案列表"],
    detail: ["專案管理", "專案詳情"],
    projectForm: ["專案管理", $("#projectFormTitle")?.textContent || "新增專案"],
    itemForm: ["專案管理", $("#projectItemFormTitle")?.textContent || "新增項目"],
    todos: ["Todo / Bug", "修復項目看板"],
    products: ["產品管理", "產品列表"],
    roles: ["角色管理", "角色列表"],
    permissions: ["權限管理", "權限矩陣"],
    users: ["使用者管理", "使用者列表"]
  };
  $("#pageEyebrow").textContent = titles[page][0];
  $("#pageTitle").textContent = titles[page][1];
}

function openModal(id) {
  $(id).classList.remove("is-hidden");
}

function closeModals() {
  $$(".modal-backdrop").forEach((modal) => modal.classList.add("is-hidden"));
}

function setMobileMenu(open) {
  $("#appView").classList.toggle("menu-open", open);
  $("#mobileMenuButton").setAttribute("aria-expanded", open ? "true" : "false");
}

function seedNewProject(form) {
  const data = new FormData(form);
  const id = Number(data.get("id"));
  const versionMarkdown = $("#versionEditor").value.trim();
  const version = data.get("version").trim();
  const payload = {
    version,
    name: version,
    product: data.get("product"),
    projectType: products.find((product) => product.name === data.get("product"))?.type || "平台",
    pm: selectedValues(form.pm).join("、"),
    it: selectedValues(form.it).join("、"),
    status: data.get("status"),
    priority: data.get("priority"),
    devEffort: data.get("devEffort"),
    internalTestEffort: data.get("internalTestEffort"),
    publicTestEffort: data.get("publicTestEffort"),
    devDone: data.get("expectedDone") || "待排程",
    launch: data.get("launch") || "待排程",
    reqDate: "05/23",
    startDate: data.get("devStart") || "待排程",
    testDate: data.get("internalTestStart") ? formatDate(data.get("internalTestStart")) : "待排程",
    expectedDone: data.get("expectedDone"),
    publicTestStart: data.get("publicTestStart"),
    versionMarkdown,
    versionHtml: versionMarkdown ? markdownToHtml(versionMarkdown) : "",
    versionAttachments: [...versionAttachments],
    summary: versionMarkdown.replace(/[#*_`>\-]/g, "").trim().slice(0, 80) || "PM 已建立初版專案設定。",
    requirements: ["完整內容請查看開發需求欄位。"],
    acceptance: ["PM 與 IT 完成需求確認後補上驗收條件。"],
    comments: [{ author: "Sophie Lu", role: "PM", time: "剛剛", text: "已建立專案，請 IT 協助確認開發評估。" }],
    history: ["Sophie Lu 新增專案"]
  };
  if (id) {
    const project = getProject(id);
    Object.assign(project, payload);
    selectedProjectId = id;
  } else {
    const nextId = Math.max(...projects.map((project) => project.id)) + 1;
    projects.unshift({
      id: nextId,
      ...payload,
      leavePeriods: [],
      requirementBackground: "尚未填寫開發需求內容。",
      requirementHtml: "尚未填寫開發需求內容。",
      requirementAttachments: []
    });
    selectedProjectId = nextId;
  }
}

function seedNewBug(form) {
  const data = new FormData(form);
  const projectId = Number(data.get("project"));
  const nextId = Math.max(...bugs.map((bug) => bug.id)) + 1;
  bugs.unshift({
    id: nextId,
    projectId,
    title: data.get("title"),
    type: data.get("type"),
    status: data.get("status"),
    priority: data.get("priority"),
    assignee: data.get("assignee"),
    description: data.get("description")
  });
  const project = getProject(projectId);
  project.history.unshift(`Sophie Lu 新增 Todo / Bug：${data.get("title")}`);
}

function openProductModal(productId) {
  const form = $("#productForm");
  form.reset();
  form.enabled.checked = true;
  renderProductTypeOptions();
  $("#productModalTitle").textContent = "新增產品";
  if (productId) {
    const product = products.find((item) => item.id === Number(productId));
    if (!product) return;
    $("#productModalTitle").textContent = "編輯產品";
    renderProductTypeOptions(product.type || "平台");
    form.id.value = product.id;
    form.name.value = product.name;
    form.type.value = product.type || "平台";
    form.description.value = product.description;
    form.note.value = product.note;
    form.enabled.checked = product.enabled;
  }
  openModal("#productModal");
}

function saveProduct(form) {
  const data = new FormData(form);
  const id = Number(data.get("id"));
  const payload = {
    name: data.get("name").trim(),
    type: data.get("type"),
    description: data.get("description").trim(),
    note: data.get("note").trim(),
    enabled: form.enabled.checked
  };
  if (id) {
    const product = products.find((item) => item.id === id);
    Object.assign(product, payload);
  } else {
    const nextId = Math.max(0, ...products.map((product) => product.id)) + 1;
    products.push({ id: nextId, ...payload });
  }
}

function openProductTypeModal(typeId) {
  const form = $("#productTypeForm");
  form.reset();
  form.enabled.checked = true;
  $("#productTypeModalTitle").textContent = "新增選項";
  if (typeId) {
    const type = productTypes.find((item) => item.id === Number(typeId));
    if (!type) return;
    $("#productTypeModalTitle").textContent = "編輯選項";
    form.id.value = type.id;
    form.name.value = type.name;
    form.option.value = type.option || "類型";
    form.note.value = type.note || "";
    form.enabled.checked = type.enabled;
  }
  openModal("#productTypeModal");
}

function saveProductType(form) {
  const data = new FormData(form);
  const id = Number(data.get("id"));
  const payload = {
    name: data.get("name").trim(),
    option: data.get("option"),
    note: data.get("note").trim(),
    enabled: form.enabled.checked
  };
  if (id) {
    const type = productTypes.find((item) => item.id === id);
    const oldName = type.name;
    const oldOption = type.option || "類型";
    Object.assign(type, payload);
    if (oldOption === "類型") {
      products.forEach((product) => {
        if (product.type === oldName) product.type = payload.name;
      });
    }
    if (oldOption === "進度") {
      projects.forEach((project) => {
        if (project.status === oldName) project.status = payload.name;
      });
      projectItems.forEach((item) => {
        if (item.progress === oldName) item.progress = payload.name;
      });
    }
  } else {
    const nextId = Math.max(0, ...productTypes.map((type) => type.id)) + 1;
    productTypes.push({ id: nextId, ...payload });
  }
}

function openRoleModal(roleId) {
  const form = $("#roleForm");
  form.reset();
  form.enabled.checked = true;
  form.querySelectorAll('input[name="permissions"]').forEach((input) => {
    input.checked = ["專案查看", "專案新增編輯", "Todo Bug 管理"].includes(input.value);
  });
  $("#roleModalTitle").textContent = "新增角色";
  if (roleId) {
    const role = roles.find((item) => item.id === Number(roleId));
    if (!role) return;
    $("#roleModalTitle").textContent = "編輯角色";
    form.id.value = role.id;
    form.name.value = role.name;
    form.description.value = role.description;
    form.note.value = role.note;
    form.enabled.checked = role.enabled;
    form.querySelectorAll('input[name="permissions"]').forEach((input) => {
      input.checked = role.permissions.includes(input.value);
    });
  }
  openModal("#roleModal");
}

function selectedRolePermissions(form) {
  return Array.from(form.querySelectorAll('input[name="permissions"]:checked')).map((input) => input.value);
}

function saveRole(form) {
  const data = new FormData(form);
  const id = Number(data.get("id"));
  const payload = {
    name: data.get("name").trim(),
    description: data.get("description").trim(),
    note: data.get("note").trim(),
    enabled: form.enabled.checked,
    permissions: selectedRolePermissions(form)
  };
  if (id) {
    const role = roles.find((item) => item.id === id);
    Object.assign(role, payload);
  } else {
    const nextId = Math.max(0, ...roles.map((role) => role.id)) + 1;
    roles.push({ id: nextId, ...payload });
  }
}

function openUserModal(userId) {
  const form = $("#userForm");
  renderUserFormOptions();
  form.reset();
  form.enabled.checked = true;
  $("#userModalTitle").textContent = "新增使用者";
  if (userId) {
    const user = users.find((item) => item.id === Number(userId));
    if (!user) return;
    $("#userModalTitle").textContent = "編輯使用者";
    form.id.value = user.id;
    form.name.value = user.name;
    form.email.value = user.email;
    form.role.value = user.role;
    setUserProductChecks(user.products);
    form.enabled.checked = user.enabled;
  }
  openModal("#userModal");
}

function saveUser(form) {
  const data = new FormData(form);
  const id = Number(data.get("id"));
  const payload = {
    name: data.get("name").trim(),
    email: data.get("email").trim(),
    role: data.get("role"),
    products: data.getAll("products"),
    enabled: form.enabled.checked
  };
  if (id) {
    const user = users.find((item) => item.id === id);
    Object.assign(user, payload);
  } else {
    const nextId = Math.max(0, ...users.map((user) => user.id)) + 1;
    users.push({ id: nextId, ...payload });
  }
}

function resetRequirementEditor() {
  $("#versionEditor").value = "";
  versionAttachments = [];
  renderEditorAttachments("versionEditor");
  updateMarkdownPreview("versionEditor");
}

function resetProjectEditTabs(showItems) {
  $("#projectEditTabs").classList.toggle("is-hidden", !showItems);
  $$("#projectEditTabs .tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.projectEditTab === "overview"));
  $$(".project-edit-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.projectEditPanel === "overview"));
}

function renderProjectItems(projectId = selectedProjectId) {
  const rows = projectItems
    .filter((item) => item.projectId === Number(projectId))
    .map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><button class="link-button" data-edit-item="${item.id}" type="button">${item.name}</button></td>
        <td>${item.it}</td>
        <td>${item.priority || "中"}</td>
        <td><span class="status ${statusClass(item.progress)}">${item.progress}</span></td>
        <td><button class="ghost-button danger-button" data-delete-item="${item.id}" type="button">刪除</button></td>
      </tr>
    `)
    .join("");
  $("#projectItemRows").innerHTML = rows || `<tr><td colspan="6" class="muted">尚未建立項目。</td></tr>`;
}

function setProjectFormMode(canEdit) {
  projectFormCanEdit = canEdit;
  const form = $("#projectForm");
  const note = $("#projectFormModeNote");
  note.textContent = canEdit ? "可編輯" : "僅能檢視";
  note.classList.toggle("is-readonly", !canEdit);
  form.querySelectorAll("input, select, textarea, button").forEach((control) => {
    if (["backFromProjectForm", "cancelProjectForm"].includes(control.id)) return;
    if (control.matches("[data-project-edit-tab], [data-edit-item]")) return;
    if (control.type === "hidden") return;
    control.disabled = !canEdit;
  });
  form.querySelector('button[type="submit"]').classList.toggle("is-hidden", !canEdit);
  $$(".editor-toolbar button, .ai-panel button, .ai-panel select, .ai-panel textarea").forEach((control) => {
    control.disabled = !canEdit;
  });
  $$(".ai-panel[data-ai-panel='versionEditor']").forEach((panel) => panel.classList.toggle("is-hidden", !canEdit));
  enhanceAllMultiSelects();
}

function openProjectForm(projectId) {
  const form = $("#projectForm");
  renderProjectFormOptions();
  form.reset();
  enhanceAllMultiSelects();
  resetRequirementEditor();
  resetProjectEditTabs(Boolean(projectId));
  const canEdit = !projectId || hasPermission("專案新增編輯");
  $("#projectFormTitle").textContent = projectId ? "專案總覽" : "新增專案";
  if (projectId) {
    const project = getProject(projectId);
    renderProjectFormOptions(project.status);
    selectedProjectId = project.id;
    form.id.value = project.id;
    form.version.value = projectVersion(project);
    form.product.value = project.product;
    setSelectedValues(form.pm, project.pm);
    setSelectedValues(form.it, project.it);
    form.status.value = project.status;
    form.priority.value = project.priority;
    form.devStart.value = toIsoDate(project.startDate);
    form.devEffort.value = project.devEffort || "";
    form.internalTestStart.value = toIsoDate(project.testDate);
    form.internalTestEffort.value = project.internalTestEffort || "";
    form.publicTestStart.value = project.publicTestStart || "";
    form.publicTestEffort.value = project.publicTestEffort || "";
    form.expectedDone.value = toIsoDate(project.expectedDone || project.devDone);
    form.launch.value = toIsoDate(project.launch);
    $("#versionEditor").value = project.versionMarkdown || project.versionHtml || "";
    versionAttachments = [...(project.versionAttachments || [])];
    renderEditorAttachments("versionEditor");
    updateMarkdownPreview("versionEditor");
    renderProjectItems(project.id);
  }
  setProjectFormMode(canEdit);
  enhanceAllMultiSelects();
  switchPage("projectForm");
}

function renderProjectItemFormOptions(projectId = selectedProjectId, selectedProgress = "") {
  const project = getProject(projectId);
  $("#projectItemItSelect").innerHTML = splitAssignees(project.it)
    .map((name) => `<option value="${name}">${name}</option>`)
    .join("");
  renderProjectProgressOptions(selectedProgress);
  enhanceAllMultiSelects();
}

function renderItemMessages(messages = []) {
  $("#itemMessageList").innerHTML = messages.length
    ? messages.map((message) => `
      <article class="item-message">
        <header><strong>${message.author}</strong><span>${message.role} · ${message.time}</span></header>
        <p>${message.text}</p>
      </article>
    `).join("")
    : `<p class="muted">尚無訊息。PM 或 IT 可在這裡針對此項目補充與提問。</p>`;
}

function setProjectItemFormMode(canEdit) {
  const form = $("#projectItemForm");
  form.querySelectorAll("input, select, textarea, button").forEach((control) => {
    if (["backFromItemForm", "cancelProjectItemForm"].includes(control.id)) return;
    if (["itemMessageInput", "addItemMessageButton"].includes(control.id)) return;
    if (control.type === "hidden") return;
    control.disabled = !canEdit;
  });
  $("#itemRequirementVisualEditor").contentEditable = String(canEdit);
  $("#itemRequirementAiPanel").classList.toggle("is-hidden", !canEdit);
  form.querySelector('button[type="submit"]').classList.toggle("is-hidden", !canEdit);
  enhanceAllMultiSelects();
}

function openProjectItemForm(itemId) {
  const form = $("#projectItemForm");
  form.reset();
  renderProjectItemFormOptions(selectedProjectId);
  enhanceAllMultiSelects();
  form.projectId.value = selectedProjectId;
  setVisualRequirementMarkdown("");
  renderItemMessages([]);
  $("#itemMessageInput").value = "";
  $("#projectItemFormTitle").textContent = itemId ? "編輯項目" : "新增項目";
  if (itemId) {
    const item = projectItems.find((entry) => entry.id === Number(itemId));
    if (!item) return;
    selectedProjectId = item.projectId;
        renderProjectItemFormOptions(item.projectId, item.progress);
    form.id.value = item.id;
    form.projectId.value = item.projectId;
    form.name.value = item.name;
    setSelectedValues(form.it, item.it);
    form.priority.value = item.priority || "中";
    form.progress.value = item.progress;
    setVisualRequirementMarkdown(item.requirementMarkdown || "");
    renderItemMessages(item.messages || []);
  }
  setProjectItemFormMode(hasPermission("專案新增編輯"));
  enhanceAllMultiSelects();
  switchPage("itemForm");
}

function saveProjectItem(form) {
  const data = new FormData(form);
  const id = Number(data.get("id"));
  const payload = {
    projectId: Number(data.get("projectId")) || selectedProjectId,
    name: data.get("name").trim(),
    it: data.getAll("it").join("、"),
    priority: data.get("priority"),
    progress: data.get("progress"),
    requirementMarkdown: data.get("requirementMarkdown").trim()
  };
  if (id) {
    const item = projectItems.find((entry) => entry.id === id);
    Object.assign(item, payload);
  } else {
    const nextId = Math.max(200, ...projectItems.map((item) => item.id)) + 1;
    projectItems.unshift({ id: nextId, ...payload, messages: [] });
  }
}

function editorAttachmentStore(editorId) {
  return editorId === "versionEditor" ? versionAttachments : [];
}

function editorAttachmentList(editorId) {
  return editorId === "versionEditor" ? $("#versionAttachmentList") : null;
}

function renderEditorAttachments(editorId) {
  const list = editorAttachmentList(editorId);
  if (!list) return;
  list.innerHTML = editorAttachmentStore(editorId)
    .map((file) => `<li>${file.name}</li>`)
    .join("");
}

function insertMarkdown(editorId, before, after = "", placeholder = "文字") {
  const editor = $(`#${editorId}`);
  if (!editor || editor.tagName !== "TEXTAREA") return;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const selected = editor.value.slice(start, end) || placeholder;
  const nextText = `${before}${selected}${after}`;
  editor.setRangeText(nextText, start, end, "end");
  editor.focus();
  updateMarkdownPreview(editorId);
}

function insertMarkdownBlock(editorId, text) {
  const editor = $(`#${editorId}`);
  if (!editor || editor.tagName !== "TEXTAREA") return;
  const prefix = editor.value && !editor.value.endsWith("\n") ? "\n" : "";
  editor.setRangeText(`${prefix}${text}`, editor.selectionStart, editor.selectionEnd, "end");
  editor.focus();
  updateMarkdownPreview(editorId);
}

function insertMarkdownLink(editorId, label, url) {
  insertMarkdown(editorId, `[${label || "連結文字"}](`, ")", url || "https://example.com");
}

function appendEditorImage(editorId, file) {
  if (!file || !file.type.startsWith("image/")) return;
  insertMarkdownBlock(editorId, `![${file.name}](${URL.createObjectURL(file)} "${file.name}")\n`);
}

function appendEditorVideo(editorId, file) {
  if (!file || !file.type.startsWith("video/")) return;
  insertMarkdownBlock(editorId, `[影音：${file.name}](${URL.createObjectURL(file)} "${file.name}")\n`);
}

function addEditorAttachments(editorId, files) {
  editorAttachmentStore(editorId).push(...Array.from(files).map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream"
  })));
  renderEditorAttachments(editorId);
}

function aiEditorLabel(editorId) {
  if (editorId === "versionEditor") return "版本更新內容";
  if (editorId === "itemRequirementEditor") return "項目需求內容";
  return "開發需求內容";
}

function buildAiDraft(editorId, model, prompt) {
  const editor = $(`#${editorId}`);
  if (editorId === "itemRequirementEditor") syncVisualRequirementToMarkdown();
  const sourceText = (editor?.value || editor?.innerText || "").trim() || "目前尚未輸入內容。";
  const shortSource = sourceText.length > 180 ? `${sourceText.slice(0, 180)}...` : sourceText;
  return `
**${model} 建議**

針對「${aiEditorLabel(editorId)}」，已依據你的指示「${prompt || "請協助優化內容"}」整理如下：

- 補強目的、使用情境與驗收標準，避免 PM / IT 對範圍理解不同。
- 檢查時程、例外狀況、錯誤提示與資料回寫是否有遺漏。
- 建議將內容拆成背景、異動項目、影響範圍、待確認問題。

**原文摘要：** ${shortSource}
  `;
}

$("#googleLogin").addEventListener("click", () => {
  $("#loginView").classList.add("is-hidden");
  $("#appView").classList.remove("is-hidden");
  switchPage("dashboard");
});

$(".nav-list").addEventListener("click", (event) => {
  const parentButton = event.target.closest("[data-parent]");
  if (parentButton) {
    const group = parentButton.closest(".nav-group");
    const shouldOpen = !group.classList.contains("is-open");
    $$(".nav-group").forEach((item) => item.classList.remove("is-open"));
    group.classList.add("is-open");
    if (shouldOpen || !parentButton.classList.contains("is-active")) {
      switchPage(parentButton.dataset.defaultPage);
    }
    if (window.matchMedia("(max-width: 680px)").matches) {
      setMobileMenu(false);
    }
    return;
  }
  const button = event.target.closest("[data-page]");
  if (!button) return;
  switchPage(button.dataset.page);
  if (window.matchMedia("(max-width: 680px)").matches) {
    setMobileMenu(false);
  }
});

$("#mobileMenuButton").addEventListener("click", () => {
  setMobileMenu(!$("#appView").classList.contains("menu-open"));
});

$("#sidebarBackdrop").addEventListener("click", () => setMobileMenu(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMobileMenu(false);
    $$(".multi-select.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".multi-select-control").setAttribute("aria-expanded", "false");
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".multi-select")) return;
  $$(".multi-select.is-open").forEach((item) => {
    item.classList.remove("is-open");
    item.querySelector(".multi-select-control").setAttribute("aria-expanded", "false");
  });
});

$("#projectRows").addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-project]");
  const editButton = event.target.closest("[data-edit-project]");
  const overviewButton = event.target.closest("[data-open-overview]");
  if (overviewButton) {
    openProjectForm(overviewButton.dataset.openOverview);
  }
  if (openButton) {
    renderDetail(openButton.dataset.openProject);
    switchPage("detail");
  }
  if (editButton) {
    openProjectForm(editButton.dataset.editProject);
  }
});

$("#backToProjects").addEventListener("click", () => switchPage("projects"));
$("#backFromProjectForm").addEventListener("click", () => switchPage("projects"));
$("#cancelProjectForm").addEventListener("click", () => switchPage("projects"));
$("#backFromItemForm").addEventListener("click", () => {
  openProjectForm(selectedProjectId);
  $$("#projectEditTabs .tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.projectEditTab === "items"));
  $$(".project-edit-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.projectEditPanel === "items"));
});
$("#cancelProjectItemForm").addEventListener("click", () => $("#backFromItemForm").click());
$("#newProjectButton").addEventListener("click", () => openProjectForm());
$("#newProjectItemButton").addEventListener("click", () => openProjectItemForm());
$("#quickBugButton").addEventListener("click", () => openModal("#bugModal"));
$("#newTodoButton").addEventListener("click", () => openModal("#bugModal"));
$("#newProductButton").addEventListener("click", () => openProductModal());
$("#newProductTypeButton").addEventListener("click", () => openProductTypeModal());
$("#newRoleButton").addEventListener("click", () => openRoleModal());
$("#newUserButton").addEventListener("click", () => openUserModal());

$("#projectSearch").addEventListener("input", renderProjects);
$("#productFilter").addEventListener("change", renderProjects);
$("#pmFilter").addEventListener("change", renderProjects);
$("#itFilter").addEventListener("change", renderProjects);
$("#statusFilter").addEventListener("change", renderProjects);

$(".tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  $$(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
  $$(".tab-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.tabPanel === button.dataset.tab));
});

$("#projectEditTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-project-edit-tab]");
  if (!button) return;
  $$("#projectEditTabs .tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
  $$(".project-edit-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.projectEditPanel === button.dataset.projectEditTab));
});

$("#productTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-product-tab]");
  if (!button) return;
  $$("#productTabs .tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
  $$(".product-tab-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.productTabPanel === button.dataset.productTab));
});

$("#projectItemRows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-item]");
  const deleteButton = event.target.closest("[data-delete-item]");
  if (editButton) openProjectItemForm(editButton.dataset.editItem);
  if (deleteButton) {
    projectItems = projectItems.filter((item) => item.id !== Number(deleteButton.dataset.deleteItem));
    renderProjectItems(selectedProjectId);
  }
});

$("#addItemMessageButton").addEventListener("click", () => {
  const form = $("#projectItemForm");
  const itemId = Number(form.id.value);
  const item = projectItems.find((entry) => entry.id === itemId);
  const text = $("#itemMessageInput").value.trim();
  if (!item || !text) return;
  const role = currentUser().role.includes("IT") ? "IT" : "PM";
  item.messages = item.messages || [];
  item.messages.unshift({
    author: currentUser().name,
    role,
    time: "剛剛",
    text
  });
  $("#itemMessageInput").value = "";
  renderItemMessages(item.messages);
});

$$(".markdown-editor").forEach((editor) => {
  editor.addEventListener("focus", () => {
    activeEditorId = editor.id;
  });
  editor.addEventListener("input", () => updateMarkdownPreview(editor.id));
});

$("#itemRequirementVisualEditor").addEventListener("input", syncVisualRequirementToMarkdown);
$("#itemRequirementVisualEditor").addEventListener("blur", applyVisualMarkdownShortcuts);
$("#itemRequirementVisualEditor").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    window.setTimeout(applyVisualMarkdownShortcuts, 0);
  }
});

$$(".editor-toolbar").forEach((toolbar) => {
  toolbar.addEventListener("click", (event) => {
    const editorId = toolbar.dataset.editorToolbar;
    activeEditorId = editorId;
    const markdownButton = event.target.closest("[data-markdown-action]");
    const actionButton = event.target.closest("[data-editor-action]");
    if (markdownButton) {
      const action = markdownButton.dataset.markdownAction;
      const actions = {
        heading: () => insertMarkdownBlock(editorId, "## 標題\n"),
        bold: () => insertMarkdown(editorId, "**", "**", "粗體文字"),
        italic: () => insertMarkdown(editorId, "*", "*", "斜體文字"),
        list: () => insertMarkdownBlock(editorId, "- 項目\n"),
        quote: () => insertMarkdownBlock(editorId, "> 引用內容\n"),
        code: () => insertMarkdown(editorId, "`", "`", "code")
      };
      actions[action]?.();
    }
    if (actionButton?.dataset.editorAction === "link") {
      const url = window.prompt("請輸入連結 URL");
      if (url) insertMarkdownLink(editorId, "連結文字", url);
    }
    if (actionButton?.dataset.editorAction === "image") $("#sharedImageInput").click();
    if (actionButton?.dataset.editorAction === "video") $("#sharedVideoInput").click();
    if (actionButton?.dataset.editorAction === "attachment") $("#sharedAttachmentInput").click();
  });
});

$("#sharedImageInput").addEventListener("change", (event) => {
  Array.from(event.target.files).forEach((file) => appendEditorImage(activeEditorId, file));
  event.target.value = "";
});

$("#sharedVideoInput").addEventListener("change", (event) => {
  Array.from(event.target.files).forEach((file) => appendEditorVideo(activeEditorId, file));
  event.target.value = "";
});

$("#sharedAttachmentInput").addEventListener("change", (event) => {
  addEditorAttachments(activeEditorId, event.target.files);
  event.target.value = "";
});

$$(".markdown-editor").forEach((editor) => {
  editor.addEventListener("paste", (event) => {
    const files = Array.from(event.clipboardData?.files || []);
    const images = files.filter((file) => file.type.startsWith("image/"));
    if (!images.length) return;
    event.preventDefault();
    images.forEach((file) => appendEditorImage(editor.id, file));
  });
});

$$(".ai-panel").forEach((panel) => {
  panel.addEventListener("click", (event) => {
    const templateButton = event.target.closest("[data-ai-template]");
    const submitButton = event.target.closest("[data-ai-submit]");
    const insertButton = event.target.closest("[data-ai-insert]");
    const promptInput = panel.querySelector("[data-ai-prompt]");
    const response = panel.querySelector("[data-ai-response]");
    const editorId = panel.dataset.aiPanel;

    if (templateButton) {
      const templates = {
        優化: `請協助優化${aiEditorLabel(editorId)}，讓內容更清楚、完整、適合 PM 與 IT 溝通。`,
        偵錯: `請協助檢查${aiEditorLabel(editorId)}是否有邏輯矛盾、遺漏情境、風險或驗收條件不足。`,
        補充: `請協助補充${aiEditorLabel(editorId)}，包含背景、影響範圍、例外情境與待確認問題。`
      };
      promptInput.value = templates[templateButton.dataset.aiTemplate];
    }

    if (submitButton) {
      const model = panel.querySelector("[data-ai-model]").value;
      const draft = buildAiDraft(editorId, model, promptInput.value.trim());
      response.dataset.aiMarkdown = draft.trim();
      response.innerHTML = markdownToHtml(draft);
    }

    if (insertButton) {
      const editor = $(`#${editorId}`);
      if (response.textContent.trim() === "AI 回覆會顯示在這裡。") return;
      const markdown = response.dataset.aiMarkdown || response.textContent.trim();
      if (editorId === "itemRequirementEditor") {
        syncVisualRequirementToMarkdown();
        const current = editor.value.trim();
        const nextMarkdown = insertButton.dataset.aiInsert === "replace" ? markdown : `${current}${current ? "\n\n---\n\n" : ""}${markdown}`;
        setVisualRequirementMarkdown(nextMarkdown);
      } else {
        if (insertButton.dataset.aiInsert === "replace") {
          editor.value = markdown;
        } else {
          const divider = editor.value.trim() ? "\n\n---\n\n" : "";
          editor.value = `${editor.value}${divider}${markdown}`;
        }
        updateMarkdownPreview(editorId);
      }
      editor.focus();
    }
  });
});

$("#addCommentButton").addEventListener("click", () => {
  const text = $("#newCommentText").value.trim();
  if (!text) return;
  const project = getProject(selectedProjectId);
  project.comments.unshift({ author: "Sophie Lu", role: "PM", time: "剛剛", text });
  project.history.unshift("Sophie Lu 新增留言");
  $("#newCommentText").value = "";
  renderComments(project);
  renderHistory(project);
});

document.body.addEventListener("change", (event) => {
  const productSwitch = event.target.closest("[data-toggle-product]");
  if (productSwitch) {
    const product = products.find((item) => item.id === Number(productSwitch.dataset.toggleProduct));
    if (product) product.enabled = productSwitch.checked;
    renderProducts();
    renderProjectFilters();
    return;
  }
  const roleSwitch = event.target.closest("[data-toggle-role]");
  if (roleSwitch) {
    const role = roles.find((item) => item.id === Number(roleSwitch.dataset.toggleRole));
    if (role) role.enabled = roleSwitch.checked;
    renderRoles();
    return;
  }
  const productTypeSwitch = event.target.closest("[data-toggle-product-type]");
  if (productTypeSwitch) {
    const type = productTypes.find((item) => item.id === Number(productTypeSwitch.dataset.toggleProductType));
    if (type) type.enabled = productTypeSwitch.checked;
    renderProductTypes();
    renderProductTypeOptions();
    renderProjectFilters();
    renderProjectFormOptions();
    return;
  }
  const userSwitch = event.target.closest("[data-toggle-user]");
  if (userSwitch) {
    const user = users.find((item) => item.id === Number(userSwitch.dataset.toggleUser));
    if (user) user.enabled = userSwitch.checked;
    renderUsers();
    return;
  }
  const select = event.target.closest("[data-bug-status]");
  if (!select) return;
  const bug = bugs.find((item) => item.id === Number(select.dataset.bugStatus));
  if (bug) {
    bug.status = select.value;
    renderBugBoard(selectedProjectId, "#bugBoard");
    renderTodoKanban();
    renderProjects();
    renderDashboard();
  }
});

$("#productRows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-product]");
  if (editButton) {
    openProductModal(editButton.dataset.editProduct);
  }
});

$("#productTypeRows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-product-type]");
  if (editButton) {
    openProductTypeModal(editButton.dataset.editProductType);
  }
});

$("#roleRows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-role]");
  if (editButton) {
    openRoleModal(editButton.dataset.editRole);
  }
});

$("#userRows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-user]");
  if (editButton) {
    openUserModal(editButton.dataset.editUser);
  }
});

$$(".close-modal").forEach((button) => button.addEventListener("click", closeModals));
$$(".modal-backdrop").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModals();
  });
});

$("#projectForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!projectFormCanEdit) return;
  seedNewProject(event.currentTarget);
  renderProjectFilters();
  renderProjects();
  renderDashboard();
  renderDetail(selectedProjectId);
  switchPage("detail");
});

$("#projectItemForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasPermission("專案新增編輯")) return;
  saveProjectItem(event.currentTarget);
  openProjectForm(selectedProjectId);
  $$("#projectEditTabs .tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.projectEditTab === "items"));
  $$(".project-edit-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.projectEditPanel === "items"));
});

$("#bugForm").addEventListener("submit", (event) => {
  event.preventDefault();
  seedNewBug(event.currentTarget);
  renderProjects();
  renderDashboard();
  renderDetail(selectedProjectId);
  renderTodoKanban();
  closeModals();
});

$("#productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveProduct(event.currentTarget);
  renderProducts();
  renderProductTypes();
  renderUserFormOptions();
  renderProjectFormOptions();
  renderProjectFilters();
  closeModals();
});

$("#productTypeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveProductType(event.currentTarget);
  renderProductTypes();
  renderProducts();
  renderProjects();
  renderDashboard();
  renderProductTypeOptions();
  renderProjectFilters();
  renderProjectFormOptions();
  closeModals();
});

$("#roleForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveRole(event.currentTarget);
  renderRoles();
  renderUserFormOptions();
  renderProjectFormOptions();
  closeModals();
});

$("#userForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveUser(event.currentTarget);
  renderUsers();
  renderProjectFormOptions();
  closeModals();
});

renderProjectFilters();
renderProjects();
renderDashboard();
renderDetail(selectedProjectId);
renderTodoKanban();
renderProducts();
renderProductTypes();
renderRoles();
renderPermissions();
renderUsers();
renderUserFormOptions();
renderProjectFormOptions();
enhanceAllMultiSelects();
