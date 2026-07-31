import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import { MarkdownViewer } from "../components/MarkdownViewer";
import { Button } from "../components/ui";
import { DataTable, EmptyState, FormSection, PageTitle, StatusBadge, Tabs } from "../components/common";
import { useProjectStore } from "../stores/projectStore";

export function ProjectDetailPage() {
  const { id } = useParams(); const navigate = useNavigate(); const project = useProjectStore((s) => s.projects.find((p) => p.id === id)); const [tab, setTab] = useState("info");
  if (!project) return <EmptyState message="找不到此專案" />;
  const basicDetails = [["產品類型", project.productType], ["產品", project.productName], ["版號", project.version], ["PM", project.pm], ["IT", project.itMembers.join("、")], ["進度", project.progress]];
  const formatWorkDays = (value?: number) => value ? `${value} 工作天` : undefined;
  const scheduleDetails = [
    ["開發工時", formatWorkDays(project.devWorkDays)], ["開始開發日", project.devStartDate], ["開發完成日", project.devCompletedDate],
    ["內測工時", formatWorkDays(project.internalTestWorkDays)], ["開始內測日", project.internalTestStartDate], ["內測完成日", project.internalTestCompletedDate],
    ["公測工時", formatWorkDays(project.publicTestWorkDays)], ["開始公測日", project.publicTestStartDate], ["公測完成日", project.publicTestCompletedDate],
    ["預計上線日", project.expectedReleaseDate], ["實際上線日", project.actualReleaseDate],
  ];
  return <><button className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600" onClick={() => navigate("/projects")}><ArrowLeft size={16} />返回專案列表</button><PageTitle title={project.productName} description={`專案編號 ${project.id}`} actions={<><StatusBadge status={project.progress} /><Button onClick={() => navigate(`/projects/${project.id}/edit`)}><Pencil size={16} />編輯專案</Button></>} /><Tabs tabs={[{ value: "info", label: "專案資訊" }, { value: "requirements", label: `需求列表 (${project.requirements.length})` }]} active={tab} onChange={setTab} />
    <div className="mt-5">{tab === "info" ? <div className="space-y-5"><FormSection title="基本資料"><DetailGrid items={basicDetails} /></FormSection><FormSection title="專案時程"><DetailGrid items={scheduleDetails} /></FormSection><FormSection title="版本更新項目"><MarkdownViewer value={project.releaseItems} height={640} /></FormSection></div> : <><div className="mb-4 flex justify-end"><Button onClick={() => navigate(`/projects/${project.id}/requirements/new`)}><Plus size={16} />新增需求</Button></div><DataTable headers={["ID", "需求項目名稱", "IT", "進度", "留言數"]} empty={!project.requirements.length}>{project.requirements.map((r) => <tr key={r.id} className="hover:bg-blue-50/35"><td className="table-cell font-medium text-slate-500">{r.id}</td><td className="table-cell"><button type="button" onClick={() => navigate(`/projects/${project.id}/requirements/${r.id}`)} className="font-medium text-blue-600 hover:text-blue-700 hover:underline">{r.title}</button></td><td className="table-cell">{r.itMembers.join("、")}</td><td className="table-cell"><StatusBadge status={r.progress} /></td><td className="table-cell">{r.comments.length}</td></tr>)}</DataTable></>}</div></>;
}

function DetailGrid({ items }: { items: (string | undefined)[][] }) {
  return <div className="grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">{items.map(([label, value]) => <div key={label}><p className="text-xs font-medium text-slate-400">{label}</p><div className="mt-2 text-sm font-medium text-slate-800">{label === "進度" ? <StatusBadge status={value ?? "—"} /> : value || "—"}</div></div>)}</div>;
}
