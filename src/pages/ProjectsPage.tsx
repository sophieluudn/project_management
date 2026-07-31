import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button, Card, Dialog } from "../components/ui";
import { DataTable, FilterSelect, PageTitle, StatusBadge } from "../components/common";
import { useProjectStore } from "../stores/projectStore";
import type { Project } from "../types";

export function ProjectsPage() {
  const { projects, deleteProject } = useProjectStore();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [type, setType] = useState("");
  const [progress, setProgress] = useState("");
  const [deleting, setDeleting] = useState<Project | null>(null);

  const productNames = useMemo(() => Array.from(new Set(projects.map((project) => project.productName))), [projects]);

  const filtered = useMemo(() => projects.filter((project) =>
    (!productName || project.productName === productName) &&
    (!type || project.productType === type) &&
    (!progress || project.progress === progress)
  ), [projects, productName, type, progress]);

  const clear = () => {
    setProductName("");
    setType("");
    setProgress("");
  };

  return <>
    <PageTitle title="專案列表" description="集中追蹤所有產品版本與專案進度。" actions={<Button onClick={() => navigate("/projects/new")}>新增專案</Button>} />
    <Card className="project-filter-card overflow-hidden bg-white">
      <form onSubmit={(event) => event.preventDefault()} className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-[minmax(160px,220px)_minmax(140px,180px)_minmax(140px,180px)_auto] lg:items-end">
        <FilterSelect value={productName} onChange={(event) => setProductName(event.target.value)}><option value="">全部產品</option>{productNames.map((option) => <option key={option}>{option}</option>)}</FilterSelect>
        <FilterSelect value={type} onChange={(event) => setType(event.target.value)}><option value="">全部類型</option>{["Android", "iOS", "平台", "模組", "後台", "API"].map((option) => <option key={option}>{option}</option>)}</FilterSelect>
        <FilterSelect value={progress} onChange={(event) => setProgress(event.target.value)}><option value="">全部進度</option>{["規劃中", "待開發", "開發中", "內測中", "公測中", "待上線", "已上線", "暫停", "取消"].map((option) => <option key={option}>{option}</option>)}</FilterSelect>
        <div className="flex items-center gap-2 justify-self-start">
          <Button className="filter-action-button project-filter-action-button" type="submit">搜尋</Button>
          <Button className="filter-action-button project-filter-action-button" type="button" variant="outline" onClick={clear}>重設</Button>
        </div>
      </form>
    </Card>
    <DataTable headers={["ID", "產品名稱", "產品類型", "版號", "預計上線日", "進度", "PM", "操作"]} empty={!filtered.length}>
      {filtered.map((project) => <tr key={project.id} className="transition hover:bg-blue-50/35">
        <td className="table-cell font-medium text-slate-500">{project.id}</td>
        <td className="table-cell font-medium text-slate-800">{project.productName}</td>
        <td className="table-cell"><span className="rounded-md bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-700">{project.productType}</span></td>
        <td className="table-cell">{project.version}</td>
        <td className="table-cell">{project.expectedReleaseDate ?? "—"}</td>
        <td className="table-cell"><StatusBadge status={project.progress} /></td>
        <td className="table-cell">{project.pm}</td>
        <td className="table-cell">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" title="檢視" aria-label="檢視" className="table-action-icon table-action-icon-view" onClick={() => navigate(`/projects/${project.id}`)}><Eye size={16} /></Button>
            <Button variant="ghost" size="icon" title="編輯" aria-label="編輯" className="table-action-icon table-action-icon-edit" onClick={() => navigate(`/projects/${project.id}/edit`)}><Pencil size={16} /></Button>
            <Button variant="ghost" size="icon" title="刪除" aria-label="刪除" className="table-action-icon table-action-icon-delete" onClick={() => setDeleting(project)}><Trash2 size={16} /></Button>
          </div>
        </td>
      </tr>)}
    </DataTable>
    <p className="mt-3 text-right text-xs text-slate-400">顯示 {filtered.length} 筆，共 {projects.length} 筆</p>
    <Dialog open={Boolean(deleting)} onClose={() => setDeleting(null)} title="刪除專案">
      <div className="space-y-5 p-6">
        <p className="leading-7 text-slate-700">確定要刪除「<span className="font-semibold text-slate-900">{deleting?.productName}</span>」專案嗎？刪除後將無法復原。</p>
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          <div>ID：{deleting?.id}</div>
          <div>版號：{deleting?.version}</div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setDeleting(null)}>取消</Button>
          <Button type="button" variant="danger" onClick={() => { if (deleting) deleteProject(deleting.id); setDeleting(null); }}>刪除</Button>
        </div>
      </div>
    </Dialog>
  </>;
}
