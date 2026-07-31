# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Confirmed visual direction

- Use the selected airy light workspace layout with a pale sidebar and one large table surface.
- Use Ant Design blue as the dominant accent: primary `#1890ff`, deeper active `#096dd9`, hover `#40a9ff`, pale active surface `#e6f7ff`.
- Use Ant Design text and neutral color tokens from the provided reference image: title and primary text `#000000E0`, secondary text `#000000A6`, disabled text `#00000040`, primary border `#D9D9D9`, divider `#0505050F`, and layout background `#F5F5F5`.
- Avoid purple and gradients. Keep the product stable, precise, professional, and appropriate for a technology company.
- System-generated IDs use English-letter prefixes followed by exactly five digits, such as `P00001`. Preserve meaningful prefixes by entity, such as projects `P`, requirements `RQ`, comments `CM`, calendar events `C`, products `PD`, roles `R`, users `U`, and option/status settings `S`.
- Platform component anatomy, interaction patterns, design specifications, and base UI implementation should use Ant Design (`antd`) component guidance (`https://ant.design/components/overview-cn/`) for core admin components such as Button, Form, Input, Select, DatePicker, Card, Table, Tag, Modal, Tabs, Switch, and Empty, while preserving the confirmed Ant Design blue palette and existing airy workspace direction. New platform base components should wrap or use Ant Design instead of hand-rolled controls unless a custom wrapper is needed for product-specific behavior.
- In project create/edit forms, use the label `產品` instead of `產品名稱`.
- Project IT assignment uses a multi-select dropdown, with selected members displayed as tags.
- The project information tab groups basic data, schedule, and release items into separate cards matching the project form sections.
- Typography follows the Ant Design font specification (`https://ant.design/docs/spec/font-cn`): body and primary content text use 14px with 22px line-height, helper/auxiliary text can use 12px, headings scale through 16px, 20px, 24px, and 30px as appropriate, and font weights should stay restrained with regular 400, medium 500, and semibold/strong 600.
- Card section titles such as `基本資料` use semantic `h2` headings and must be visibly larger than field labels.
- The admin shell uses a viewport-height layout with an explicit vertically scrollable content column; the sticky header and fixed sidebar remain visible while long create, detail, and edit pages scroll.
- The platform name `專案管理平台` in the sidebar header uses 20px text.
- Header contents are vertically centered. The header shows only the logged-in user icon; user name, role, and standalone logout button are hidden. Clicking the user icon opens a dropdown menu containing `登出`.
- The sidebar menu uses 16px regular-weight text. Primary menu groups have icons and up/down arrow expand controls; submenu items do not show icons. Primary menu group order is `專案管理`, `團隊管理`, `產品管理`, `權限管理`. Groups include `專案管理` with `專案列表`, `團隊管理` with `團隊行事曆`, `產品管理` with `產品列表` followed by `選項設定`, and `權限管理` for role/user permission-related pages.
- Table column header text uses the same 14px size as table body text.
- Shared list tables follow Ant Design Table styling: white table surface, `#fafafa` header and row hover background, `#0505050F` row dividers, 16px cell padding, 14px text, and semibold column headers.
- Buttons, inputs, selects, date pickers, range pickers, and other single-line form controls use the Ant Design default/middle 32px height across the platform. Avoid large 40px controls unless a future request explicitly makes an exception.
- Text action buttons do not use decorative icons. Keep icons only for compact system controls such as the mobile menu and dialog close button.
- Header menu button toggles the left sidebar between expanded and collapsed states on desktop; the collapsed sidebar is 80px wide and keeps main menu icons visible. Header menu button, breadcrumb/title, and login avatar must be vertically centered on the same line.
- Do not show a secondary left-sidebar footer collapse control; sidebar collapse/expand is controlled from the header menu button.
- Login avatar displays the first letter of the logged-in user's English name, such as `J` for Jack.
- Active submenu background in the left sidebar spans the full sidebar width while preserving the submenu text indentation.
- Project list search is applied only on submit; filters appear before the search field, followed by `搜尋` and `清除` actions.
- Project list search controls should stay on one row at standard desktop and laptop widths whenever space allows, wrapping only on narrower screens.
- Project list filters/search are presented inside a card; all filter controls, the search input, and search/clear actions must stay within that card.
- Filter blocks do not show field labels; use default options and placeholders to communicate each filter's purpose.
- Project list filter order starts with product name, followed by product type, progress, search, and reset. The project list filter block does not include a free-text search input.
- Project list filter `搜尋` and `重設` buttons use fixed widths and sit together inside one grid item so the two actions stay close.
- Project list table columns are ordered as `ID`, `產品名稱`, `產品類型`, `版號`, `預計上線日`, `進度`, `PM`, and `操作`; do not show IT or actual release date columns. The version column is plain text. The operation column shows icon-only circular buttons for view, edit, and delete.
- Project list filter card and table should have clear vertical spacing, currently 24px.
- Team calendar filters are applied only when `搜尋` is pressed, and `重設` resets both the fields and the applied results.
- Team calendar uses the label `新增事件`; filter actions use `搜尋` and `重設`.
- Team calendar filter controls are ordered as period range picker, role, and name search input; the previous person select and status filter are removed. The period range picker should visually follow Ant Design RangePicker styling with start/end placeholders, an arrow separator, and a right-side calendar icon. The name search input filters by person name only after search is pressed.
- Team calendar filters are presented in a large card with all filter controls and actions inside the card body. At desktop widths, the filter controls should be arranged in a single row where space allows.
- Filter search and reset actions are text buttons, not icon-only. Filter-card controls use consistent 32px heights, including inputs, selects, date range pickers, and search/reset buttons.
- Table operation icon colors are semantic: view is green, edit is blue, and delete is red, each with a matching pale circular background.
- Edit actions in all list operation columns use the same icon-only circular blue button style as the project list edit action.
- User management list account column displays email only. The user create/edit popup places `啟用狀態` in a separated pale-blue card at the top, removes the account field, orders fields as `姓名`, `角色`, `Email`, then `負責產品`, and uses Ant Design multi-select for existing product options.
- User management list header for the account column is `Email`. The compact `啟用狀態` card is 48px high, uses background `#f5f5f5`, and has a Switch control, defaulting new users to enabled; the label and switch are vertically centered on the same line.
- Role create/edit popup uses the same 48px `啟用狀態` switch card pattern as the user create/edit popup.
- Product create/edit popup uses the same top 48px `啟用狀態` switch card pattern as the user create/edit popup.
- All platform modal dialogs should use the Ant Design `Modal` component through the shared `Dialog` wrapper, preserving Ant Design modal structure, default 520px width unless `wide` is requested, close behavior, and `destroyOnHidden` content cleanup. Modal body padding is standardized to 24px, top-level dialog content should not add another outer padding layer, and modal content/button row spacing should use a compact 16px gap.
- Modal forms validate required fields only after the user clicks `儲存` or a confirmation action. Missing required inputs/selections keep the modal open and show red helper text directly below the relevant field.
- Any destructive list delete action must open a warning/confirmation modal first; data is deleted only after the user clicks the destructive `刪除` button. Delete modals use `取消` and `刪除` as their action labels.
- User management, role management, and option settings list status columns display Switch controls only, without enabled/disabled text badges. The option settings page title is `選項設定`, its status column is labeled `啟用狀態`, and the former `休假類型` tab is labeled `事件類型`.
- Option settings create/edit popup titles are `新增選項` and `編輯選項`. The popup fields are ordered as `啟用狀態`, `選項名稱`, `項目類型`, and `排序`; item type is a select with `進度`, `事件`, and `產品類型`.
- Select dropdown option hover and selected backgrounds use `#e6f4ff` across the platform.
- Team calendar list does not show a notes column. List edit and delete actions are icon-only circular buttons following Ant Design Button behavior.
- Team calendar create/edit popup uses separate `角色` and `姓名` dropdowns instead of a combined `人員` dropdown. The name dropdown is filtered by selected role. Team calendar event category/status is labeled `事件類型` in both the popup and list table.
- Page titles do not display introduction or subtitle copy. Project schedule sections do not show date-format helper copy.
- Project create/edit uses selects for product type, product, PM, IT, and progress; only version remains a text input among the basic fields.
- Project create/edit uses `@uiw/react-md-editor` for version update items, with live preview plus H1–H6, text color, bold, italic, link, image, table, bullet-list, and numbered-list tools.
- Version update items use a 640px-high Markdown editor on project create/edit. Saved version update content is displayed as rendered Markdown so text colors are visible while color markup/code remains hidden from the interface.
- Project requirement create/edit uses the Markdown editor for requirement descriptions, preserves Markdown text when copying and pasting editor content, and provides an `匯出需求` action that downloads a Markdown file.
- Project requirement lists navigate from the requirement title text to the requirement content page and do not show a separate operation column. Existing requirement content pages open in read-only view mode by default, allow comments, and use an `編輯` button to enter edit mode.
- Project requirement edit forms use the tag-style multi-select for IT assignment, with selected members displayed as removable tags. Do not show a duplicate progress badge under the progress select. Markdown helper copy uses a smaller helper-text size such as 12px.
- Project schedules support positive-integer workday durations for development, internal testing, and public testing. Dates are recalculated only when the user presses `計算`, while excluding weekends, national holidays, and mock company-calendar days off; company working-weekend overrides are supported.
- Schedule calculation has two modes: forward from the development start date, or backward from the expected release date. Both modes fill all phase start and completion dates.
- Project detail mirrors the schedule workday and date fields from project create/edit as read-only values, but hides the calculation mode, date-format helper copy, and calculation controls.
- Each project phase shows workdays, start date, and completion date. A calculated completion date becomes the next phase start date; public-test completion becomes expected release. Manual completion-date changes propagate to the next phase.
