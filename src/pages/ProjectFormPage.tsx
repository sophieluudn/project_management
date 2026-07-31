import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MarkdownEditor } from "../components/MarkdownEditor";
import { Button, Input, Select } from "../components/ui";
import { Field, FormSection, MultiSelect, PageTitle } from "../components/common";
import { addBusinessDays, subtractBusinessDays } from "../lib/businessDays";
import { useAdminStore } from "../stores/adminStore";
import { useProjectStore } from "../stores/projectStore";

const progressOptions = ["規劃中", "待開發", "開發中", "內測中", "公測中", "待上線", "已上線", "暫停", "取消"];
const members = ["王大明", "張家豪", "李明哲", "林怡臻"];

type FormState = {
  productType: string;
  productName: string;
  version: string;
  progress: string;
  pm: string;
  itMembers: string[];
  scheduleCalculationMode: "forward" | "backward";
  devWorkDays: string;
  internalTestWorkDays: string;
  publicTestWorkDays: string;
  devStartDate: string;
  devCompletedDate: string;
  internalTestStartDate: string;
  internalTestCompletedDate: string;
  publicTestStartDate: string;
  publicTestCompletedDate: string;
  expectedReleaseDate: string;
  actualReleaseDate: string;
  releaseItems: string;
};

export function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = useProjectStore();
  const current = projects.find((project) => project.id === id);
  const availableProducts = useAdminStore((state) => state.products);
  const productOptions = availableProducts.filter((product) => product.status === "enabled").map((product) => product.name);
  if (current?.productName && !productOptions.includes(current.productName)) productOptions.push(current.productName);

  const [form, setForm] = useState<FormState>({
    productType: current?.productType ?? "平台",
    productName: current?.productName ?? "",
    version: current?.version ?? "",
    progress: current?.progress ?? "規劃中",
    pm: current?.pm ?? "Sophie Lu",
    itMembers: current?.itMembers ?? [],
    scheduleCalculationMode: current?.scheduleCalculationMode ?? "forward",
    devWorkDays: current?.devWorkDays ? String(current.devWorkDays) : "",
    internalTestWorkDays: current?.internalTestWorkDays ? String(current.internalTestWorkDays) : "",
    publicTestWorkDays: current?.publicTestWorkDays ? String(current.publicTestWorkDays) : "",
    devStartDate: current?.devStartDate ?? "",
    devCompletedDate: current?.devCompletedDate ?? "",
    internalTestStartDate: current?.internalTestStartDate ?? "",
    internalTestCompletedDate: current?.internalTestCompletedDate ?? "",
    publicTestStartDate: current?.publicTestStartDate ?? "",
    publicTestCompletedDate: current?.publicTestCompletedDate ?? "",
    expectedReleaseDate: current?.expectedReleaseDate ?? "",
    actualReleaseDate: current?.actualReleaseDate ?? "",
    releaseItems: current?.releaseItems ?? "",
  });
  const [calculationError, setCalculationError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((currentForm) => ({ ...currentForm, [key]: value }));
  const setWorkDays = (key: "devWorkDays" | "internalTestWorkDays" | "publicTestWorkDays", value: string) => {
    if (value === "" || /^[1-9]\d*$/.test(value)) set(key, value);
  };

  const calculateSchedule = () => {
    const devWorkDays = Number(form.devWorkDays);
    const internalTestWorkDays = Number(form.internalTestWorkDays);
    const publicTestWorkDays = Number(form.publicTestWorkDays);
    const workDaysAreValid = [devWorkDays, internalTestWorkDays, publicTestWorkDays].every((value) => Number.isInteger(value) && value >= 1);

    if (!workDaysAreValid) {
      setCalculationError("請先輸入完整的開發、內測與公測工時。");
      return;
    }

    if (form.scheduleCalculationMode === "forward") {
      if (!form.devStartDate) {
        setCalculationError("請先選擇開始開發日。");
        return;
      }
      const devCompletedDate = addBusinessDays(form.devStartDate, devWorkDays);
      const internalTestStartDate = devCompletedDate;
      const internalTestCompletedDate = addBusinessDays(internalTestStartDate, internalTestWorkDays);
      const publicTestStartDate = internalTestCompletedDate;
      const publicTestCompletedDate = addBusinessDays(publicTestStartDate, publicTestWorkDays);
      setForm((currentForm) => ({
        ...currentForm,
        devCompletedDate,
        internalTestStartDate,
        internalTestCompletedDate,
        publicTestStartDate,
        publicTestCompletedDate,
        expectedReleaseDate: publicTestCompletedDate,
      }));
    } else {
      if (!form.expectedReleaseDate) {
        setCalculationError("請先選擇預計上線日。");
        return;
      }
      const publicTestCompletedDate = form.expectedReleaseDate;
      const publicTestStartDate = subtractBusinessDays(publicTestCompletedDate, publicTestWorkDays);
      const internalTestCompletedDate = publicTestStartDate;
      const internalTestStartDate = subtractBusinessDays(internalTestCompletedDate, internalTestWorkDays);
      const devCompletedDate = internalTestStartDate;
      const devStartDate = subtractBusinessDays(devCompletedDate, devWorkDays);
      setForm((currentForm) => ({
        ...currentForm,
        devStartDate,
        devCompletedDate,
        internalTestStartDate,
        internalTestCompletedDate,
        publicTestStartDate,
        publicTestCompletedDate,
      }));
    }
    setCalculationError("");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      ...form,
      devWorkDays: Number(form.devWorkDays) || undefined,
      internalTestWorkDays: Number(form.internalTestWorkDays) || undefined,
      publicTestWorkDays: Number(form.publicTestWorkDays) || undefined,
    };
    if (current) {
      updateProject(current.id, data);
      navigate(`/projects/${current.id}`);
    } else {
      const created = addProject(data);
      navigate(`/projects/${created.id}`);
    }
  };

  return <form onSubmit={submit}>
    <PageTitle title={current ? "編輯專案" : "新增專案"} actions={<><Button type="button" variant="outline" onClick={() => navigate("/projects")}>取消</Button><Button type="submit">儲存</Button></>} />
    <div className="space-y-5">
      <FormSection title="基本資料">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Field label="產品類型" required><Select value={form.productType} onChange={(event) => set("productType", event.target.value)}>{["Android", "iOS", "平台", "模組", "後台", "API"].map((option) => <option key={option}>{option}</option>)}</Select></Field>
          <Field label="產品" required><Select required value={form.productName} onChange={(event) => set("productName", event.target.value)}><option value="" disabled>請選擇產品</option>{productOptions.map((product) => <option key={product} value={product}>{product}</option>)}</Select></Field>
          <Field label="版號" required><Input required value={form.version} onChange={(event) => set("version", event.target.value)} placeholder="例如 v1.0.0" /></Field>
          <Field label="PM" required><Select value={form.pm} onChange={(event) => set("pm", event.target.value)}>{["Sophie Lu", "陳怡君", "黃國倫", "吳佳穎"].map((option) => <option key={option}>{option}</option>)}</Select></Field>
          <div><span className="field-label field-required">IT</span><MultiSelect options={members} value={form.itMembers} onChange={(value) => set("itMembers", value)} placeholder="選擇 IT 人員" /></div>
          <Field label="進度" required><Select value={form.progress} onChange={(event) => set("progress", event.target.value)}>{progressOptions.map((option) => <option key={option}>{option}</option>)}</Select></Field>
        </div>
      </FormSection>

      <FormSection title="專案時程">
        <div className="mb-5 flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4 lg:flex-row lg:items-end lg:justify-between">
          <fieldset>
            <legend className="field-label">時程推算模式</legend>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <label className="flex cursor-pointer items-center gap-2 text-slate-700">
                <input type="radio" name="scheduleCalculationMode" value="forward" checked={form.scheduleCalculationMode === "forward"} onChange={() => { set("scheduleCalculationMode", "forward"); setCalculationError(""); }} className="h-5 w-5 accent-blue-600" />
                <span>依開始開發日</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-slate-700">
                <input type="radio" name="scheduleCalculationMode" value="backward" checked={form.scheduleCalculationMode === "backward"} onChange={() => { set("scheduleCalculationMode", "backward"); setCalculationError(""); }} className="h-5 w-5 accent-blue-600" />
                <span>依預計上線日</span>
              </label>
            </div>
          </fieldset>
          <Button type="button" onClick={calculateSchedule} className="self-start lg:self-auto">計算</Button>
        </div>
        {calculationError && <p role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{calculationError}</p>}
        <div className="grid gap-5 lg:grid-cols-3">
          <WorkDaysField label="開發工時" value={form.devWorkDays} onChange={(value) => setWorkDays("devWorkDays", value)} />
          <Field label="開始開發日"><Input type="date" value={form.devStartDate} onChange={(event) => set("devStartDate", event.target.value)} /></Field>
          <Field label="開發完成日"><Input type="date" value={form.devCompletedDate} onChange={(event) => setForm((currentForm) => ({ ...currentForm, devCompletedDate: event.target.value, internalTestStartDate: event.target.value }))} /></Field>

          <WorkDaysField label="內測工時" value={form.internalTestWorkDays} onChange={(value) => setWorkDays("internalTestWorkDays", value)} />
          <Field label="開始內測日"><Input type="date" value={form.internalTestStartDate} onChange={(event) => set("internalTestStartDate", event.target.value)} /></Field>
          <Field label="內測完成日"><Input type="date" value={form.internalTestCompletedDate} onChange={(event) => setForm((currentForm) => ({ ...currentForm, internalTestCompletedDate: event.target.value, publicTestStartDate: event.target.value }))} /></Field>

          <WorkDaysField label="公測工時" value={form.publicTestWorkDays} onChange={(value) => setWorkDays("publicTestWorkDays", value)} />
          <Field label="開始公測日"><Input type="date" value={form.publicTestStartDate} onChange={(event) => set("publicTestStartDate", event.target.value)} /></Field>
          <Field label="公測完成日"><Input type="date" value={form.publicTestCompletedDate} onChange={(event) => setForm((currentForm) => ({ ...currentForm, publicTestCompletedDate: event.target.value, expectedReleaseDate: event.target.value }))} /></Field>

          <Field label="預計上線日"><Input type="date" value={form.expectedReleaseDate} onChange={(event) => set("expectedReleaseDate", event.target.value)} /></Field>
          <Field label="實際上線日"><Input type="date" value={form.actualReleaseDate} onChange={(event) => set("actualReleaseDate", event.target.value)} /></Field>
        </div>
      </FormSection>

      <FormSection title="版本更新項目"><MarkdownEditor value={form.releaseItems} onChange={(value) => set("releaseItems", value)} placeholder="請說明本版新增、調整或修正項目" height={640} minHeight={640} /></FormSection>
    </div>
    <div className="mt-6 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => navigate("/projects")}>返回專案列表</Button><Button type="submit">儲存專案</Button></div>
  </form>;
}

function WorkDaysField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <Field label={label}><div className="relative"><Input type="number" inputMode="numeric" min={1} step={1} placeholder="例如 10" value={value} onChange={(event) => onChange(event.target.value)} className="pr-20" /><span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">工作天</span></div></Field>;
}
