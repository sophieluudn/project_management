import type { ReactNode } from "react";
import { CalendarDays, Inbox, Search } from "lucide-react";
import { Empty, Select as AntSelect, Tabs as AntTabs, Tag } from "antd";
import { cn } from "../lib/utils";
import { Button, Card, Dialog, Input, Select } from "./ui";

export function PageTitle({ title, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><h1 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h1>{actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}</div>;
}

export function DataTable({ headers, children, empty = false, emptyMessage = "目前沒有資料" }: { headers: string[]; children: ReactNode; empty?: boolean; emptyMessage?: string }) {
  return (
    <Card className="app-data-table-card overflow-hidden">
      <div className="app-data-table overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse bg-white">
          <thead>
            <tr>{headers.map((h) => <th key={h} className="table-head">{h}</th>)}</tr>
          </thead>
          <tbody>{!empty && children}</tbody>
        </table>
        {empty && <EmptyState message={emptyMessage} />}
      </div>
    </Card>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone = status === "已上線" || status === "啟用" || status === "enabled" ? "success" : status === "取消" || status === "停用" || status === "disabled" ? "default" : status.includes("測") ? "warning" : status === "暫停" ? "error" : status === "休假" ? "orange" : status === "遠距" ? "cyan" : "blue";
  const text = status === "enabled" ? "啟用" : status === "disabled" ? "停用" : status;
  return <Tag color={tone} className="m-0 text-xs font-semibold">{text}</Tag>;
}

export function FormSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) { return <Card className="p-6"><div className="mb-6 border-b border-slate-100 pb-4"><h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div>{children}</Card>; }
export function Field({ label, required, children, className, error }: { label: string; required?: boolean; children: ReactNode; className?: string; error?: string }) {
  return <label className={cn("block", className)}><span className={cn("field-label", required && "field-required")}>{label}</span>{children}{error && <p className="field-error">{error}</p>}</label>;
}

export function ConfirmDialog({ open, onClose, onConfirm, title = "確認操作", description = "確定要繼續嗎？" }: { open: boolean; onClose: () => void; onConfirm: () => void; title?: string; description?: string }) { return <Dialog open={open} onClose={onClose} title={title} description={description}><div className="flex justify-end gap-2 p-6"><Button variant="outline" onClick={onClose}>取消</Button><Button onClick={onConfirm}>確認</Button></div></Dialog>; }
export function EmptyState({ message = "目前沒有資料" }: { message?: string }) { return <div className="flex min-h-52 items-center justify-center p-8"><Empty image={<span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600"><Inbox size={24} /></span>} description={<div><p className="font-medium text-slate-700">{message}</p><p className="mt-1 text-sm text-slate-400">調整篩選條件或新增一筆資料</p></div>} /></div>; }

export function SearchInput(props: React.ComponentProps<typeof Input>) { return <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><Input {...props} className={cn("pl-9", props.className)} /></div>; }
export function FilterSelect({ label, children, ...props }: React.ComponentProps<typeof Select> & { label?: string }) { return <div className="relative min-w-40">{label && <span className="filter-field-label">{label}</span>}<Select {...props}>{children}</Select></div>; }
export function DatePicker(props: React.ComponentProps<typeof Input>) { return <div className="relative"><Input type="date" {...props} /><CalendarDays className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /></div>; }
export function DateTimePicker(props: React.ComponentProps<typeof Input>) { return <Input type="datetime-local" {...props} />; }

export function MultiSelect({ options, value, onChange, placeholder = "請選擇" }: { options: string[]; value: string[]; onChange: (value: string[]) => void; placeholder?: string }) {
  return <AntSelect
    mode="multiple"
    className="w-full"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    options={options.map((option) => ({ label: option, value: option }))}
  />;
}

export function Tabs({ tabs, active, onChange }: { tabs: { value: string; label: string }[]; active: string; onChange: (value: string) => void }) { return <AntTabs activeKey={active} onChange={onChange} items={tabs.map((tab) => ({ key: tab.value, label: tab.label }))} />; }
