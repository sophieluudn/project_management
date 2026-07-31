import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Save, Send } from "lucide-react";
import { MarkdownEditor } from "../components/MarkdownEditor";
import { MarkdownViewer } from "../components/MarkdownViewer";
import { Button, Input, Select, Textarea } from "../components/ui";
import { Field, FormSection, MultiSelect, PageTitle, StatusBadge } from "../components/common";
import { useProjectStore } from "../stores/projectStore";

const options = ["規劃中", "待開發", "開發中", "內測中", "公測中", "待上線", "已上線", "暫停", "取消"];
const members = ["王大明", "張家豪", "李明哲", "林怡臻"];

const safeFileName = (value: string) => value.trim().replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "-") || "requirement";

export function RequirementPage() {
  const { id, requirementId } = useParams();
  const navigate = useNavigate();
  const store = useProjectStore();
  const project = store.projects.find((projectItem) => projectItem.id === id);
  const current = project?.requirements.find((requirement) => requirement.id === requirementId);
  const isNew = !requirementId;
  const [editing, setEditing] = useState(isNew);
  const [form, setForm] = useState({
    title: current?.title ?? "",
    itMembers: current?.itMembers ?? [] as string[],
    progress: current?.progress ?? "規劃中",
    description: current?.description ?? "",
  });
  const [comment, setComment] = useState("");

  if (!project) return null;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (current) {
      store.updateRequirement(project.id, current.id, form);
      setEditing(false);
    } else {
      const created = store.addRequirement(project.id, form);
      navigate(`/projects/${project.id}/requirements/${created.id}`);
    }
  };

  const cancelEdit = () => {
    if (isNew) {
      navigate(`/projects/${project.id}`);
      return;
    }
    setForm({
      title: current?.title ?? "",
      itMembers: current?.itMembers ?? [] as string[],
      progress: current?.progress ?? "規劃中",
      description: current?.description ?? "",
    });
    setEditing(false);
  };

  const addComment = () => {
    if (!current || !comment.trim()) return;
    store.addComment(project.id, current.id, comment.trim());
    setComment("");
  };

  const exportRequirement = () => {
    const markdown = [
      `# ${form.title || current?.title || "未命名需求"}`,
      "",
      `- 專案：${project.productName}`,
      `- 專案編號：${project.id}`,
      `- 版本：${project.version}`,
      `- 需求編號：${current?.id ?? "尚未建立"}`,
      `- IT：${form.itMembers.length ? form.itMembers.join("、") : "—"}`,
      `- 進度：${form.progress}`,
      "",
      "## 需求說明",
      "",
      form.description.trim() || "尚未填寫需求說明。",
      "",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFileName(project.productName)}-${safeFileName(form.title || current?.id || "需求")}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const title = isNew ? "新增需求" : current?.title ?? "需求資訊";

  return <>
    <button className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600" onClick={() => navigate(`/projects/${project.id}`)}>
      <ArrowLeft size={16} />返回專案資訊
    </button>

    {editing ? <form onSubmit={submit}>
      <PageTitle title={title} description={`${project.productName}・${project.version}`} actions={<><Button type="button" variant="outline" onClick={cancelEdit}>取消</Button><Button type="submit"><Save size={16} />儲存需求</Button></>} />
      <FormSection title="開發需求">
        <RequirementEditForm form={form} setForm={setForm} />
        <div className="mt-6 flex justify-end">
          <Button type="button" variant="outline" onClick={exportRequirement}>匯出需求</Button>
        </div>
      </FormSection>
    </form> : <div>
      <PageTitle title={title} description={`${project.productName}・${project.version}`} actions={<Button type="button" onClick={() => setEditing(true)}><Pencil size={16} />編輯</Button>} />
      <FormSection title="開發需求">
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          <ReadOnlyItem label="需求項目名稱" value={current?.title} />
          <ReadOnlyItem label="IT" value={current?.itMembers.join("、")} />
          <div>
            <p className="text-xs font-medium text-slate-400">進度</p>
            <div className="mt-2"><StatusBadge status={current?.progress ?? "—"} /></div>
          </div>
        </div>
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-slate-400">需求說明</p>
          <MarkdownViewer value={current?.description} />
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="button" variant="outline" onClick={exportRequirement}>匯出需求</Button>
        </div>
      </FormSection>
    </div>}

    {!isNew && current && <div className="mt-5">
      <FormSection title={`留言區（${current.comments.length}）`} description="同步需求進度、問題與決策。">
        <div className="space-y-4">
          {current.comments.map((commentItem) => <article key={commentItem.id} className="flex gap-3 rounded-xl bg-slate-50 p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">{commentItem.userName.slice(0, 1)}</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-800">{commentItem.userName}</span>
                <span className="rounded bg-white px-2 py-0.5 text-xs text-slate-500 ring-1 ring-slate-200">{commentItem.role}</span>
                <time className="text-xs text-slate-400">{commentItem.createdAt}</time>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">{commentItem.content}</p>
            </div>
          </article>)}
        </div>
        <div className="mt-5 border-t border-slate-100 pt-5">
          <Field label="新增留言">
            <Textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="輸入留言內容…" />
          </Field>
          <div className="mt-3 flex justify-end">
            <Button type="button" onClick={addComment} disabled={!comment.trim()}><Send size={16} />送出留言</Button>
          </div>
        </div>
      </FormSection>
    </div>}
  </>;
}

function RequirementEditForm({ form, setForm }: { form: { title: string; itMembers: string[]; progress: string; description: string }; setForm: Dispatch<SetStateAction<{ title: string; itMembers: string[]; progress: string; description: string }>> }) {
  return <div className="grid gap-5 md:grid-cols-2">
    <Field label="需求項目名稱" required className="md:col-span-2">
      <Input required value={form.title} onChange={(event) => setForm((value) => ({ ...value, title: event.target.value }))} />
    </Field>
    <div>
      <span className="field-label field-required">IT</span>
      <MultiSelect options={members} value={form.itMembers} onChange={(value) => setForm((currentValue) => ({ ...currentValue, itMembers: value }))} placeholder="選擇 IT 人員" />
    </div>
    <Field label="進度" required>
      <Select value={form.progress} onChange={(event) => setForm((value) => ({ ...value, progress: event.target.value }))}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </Select>
    </Field>
    <div className="md:col-span-2">
      <MarkdownEditor
        label="需求說明"
        required
        value={form.description}
        onChange={(value) => setForm((currentValue) => ({ ...currentValue, description: value }))}
        placeholder="請以 Markdown 撰寫需求背景、流程、驗收條件或補充說明"
      />
    </div>
  </div>;
}

function ReadOnlyItem({ label, value }: { label: string; value?: string }) {
  return <div>
    <p className="text-xs font-medium text-slate-400">{label}</p>
    <div className="mt-2 text-sm font-medium text-slate-800">{value || "—"}</div>
  </div>;
}
