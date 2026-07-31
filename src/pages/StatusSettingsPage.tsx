import { useState, type FormEvent } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button, Dialog, Input, Select, Switch } from "../components/ui";
import { DataTable, Field, PageTitle, Tabs } from "../components/common";
import { useAdminStore } from "../stores/adminStore";
import type { StatusSetting } from "../types";

type OptionForm = {
  name: string;
  sort: number;
  enabled: boolean;
  category: StatusSetting["category"];
};

const categoryOptions: { value: StatusSetting["category"]; label: string }[] = [
  { value: "progress", label: "進度" },
  { value: "leave", label: "事件" },
  { value: "product", label: "產品類型" },
];

const tabs = [
  { value: "progress", label: "進度類型" },
  { value: "leave", label: "事件類型" },
  { value: "product", label: "產品類型" },
];

export function StatusSettingsPage() {
  const { statusSettings, addStatus, updateStatus } = useAdminStore();
  const [tab, setTab] = useState<StatusSetting["category"]>("progress");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [form, setForm] = useState<OptionForm>({ name: "", sort: 1, enabled: true, category: "progress" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const list = statusSettings.filter((status) => status.category === tab);

  const edit = (status?: StatusSetting) => {
    setId(status?.id ?? null);
    setForm(status
      ? { name: status.name, sort: status.sort, enabled: status.enabled, category: status.category }
      : { name: "", sort: list.length + 1, enabled: true, category: tab },
    );
    setErrors({});
    setOpen(true);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "請輸入選項名稱";
    if (!form.category) nextErrors.category = "請選擇項目類型";
    if (!Number.isInteger(form.sort) || form.sort < 1) nextErrors.sort = "請輸入大於 0 的排序";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    id ? updateStatus(id, form) : addStatus(form);
    setTab(form.category);
    setOpen(false);
  };

  return (
    <>
      <PageTitle
        title="選項設定"
        description="集中管理進度、事件與產品類型選項。"
        actions={<Button onClick={() => edit()}><Plus size={16} />新增選項</Button>}
      />

      <div className="mb-5">
        <Tabs tabs={tabs} active={tab} onChange={(value) => setTab(value as StatusSetting["category"])} />
      </div>

      <DataTable headers={["ID", "名稱", "排序", "啟用狀態", "操作"]}>
        {list.map((status) => (
          <tr key={status.id} className="hover:bg-blue-50/35">
            <td className="table-cell text-slate-500">{status.id}</td>
            <td className="table-cell font-medium text-slate-800">{status.name}</td>
            <td className="table-cell">{status.sort}</td>
            <td className="table-cell">
              <Switch checked={status.enabled} onChange={(checked) => updateStatus(status.id, { enabled: checked })} />
            </td>
            <td className="table-cell">
              <Button
                variant="ghost"
                size="icon"
                title="編輯"
                aria-label="編輯"
                className="table-action-icon table-action-icon-edit"
                onClick={() => edit(status)}
              >
                <Pencil size={16} />
              </Button>
            </td>
          </tr>
        ))}
      </DataTable>

      <Dialog open={open} onClose={() => setOpen(false)} title={id ? "編輯選項" : "新增選項"}>
        <form onSubmit={submit} noValidate className="space-y-5 p-6">
          <section className="status-switch-card flex h-12 items-center justify-between gap-4 rounded-xl border border-slate-200 px-4">
            <div className="flex items-center">
              <p className="field-label m-0">啟用狀態</p>
            </div>
            <Switch checked={form.enabled} onChange={(enabled) => setForm((current) => ({ ...current, enabled }))} />
          </section>

          <Field label="選項名稱" required error={errors.name}>
            <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          </Field>

          <Field label="項目類型" required error={errors.category}>
            <Select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as StatusSetting["category"] }))}>
              {categoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </Select>
          </Field>

          <Field label="排序" required error={errors.sort}>
            <Input type="number" min="1" value={form.sort} onChange={(event) => setForm((current) => ({ ...current, sort: Number(event.target.value) }))} />
          </Field>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>取消</Button>
            <Button type="submit">儲存</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
