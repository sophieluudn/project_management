import { useMemo, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Button, Card, Dialog, Input, Select, Textarea } from "../components/ui";
import { DataTable, Field, FilterSelect, PageTitle, SearchInput, StatusBadge } from "../components/common";
import { useCalendarStore } from "../stores/calendarStore";
import type { CalendarEvent } from "../types";

type CalendarForm = Omit<CalendarEvent, "id">;
type CalendarFilters = {
  start: string;
  end: string;
  role: string;
  keyword: string;
};

const empty: CalendarForm = { userId: "U00002", userName: "王大明", role: "IT", status: "休假", startTime: "", endTime: "", note: "" };
const emptyFilters: CalendarFilters = { start: "", end: "", role: "", keyword: "" };
const people = [{ id: "U00002", name: "王大明", role: "IT" as const }, { id: "U00003", name: "陳怡君", role: "PM" as const }, { id: "U00004", name: "張家豪", role: "IT" as const }, { id: "U00005", name: "黃國倫", role: "PM" as const }, { id: "U00006", name: "李明哲", role: "IT" as const }, { id: "U00007", name: "吳佳穎", role: "PM" as const }, { id: "U00008", name: "林怡臻", role: "IT" as const }];
const roleOptions: CalendarEvent["role"][] = ["PM", "IT"];

export function CalendarPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useCalendarStore();
  const [dialog, setDialog] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<CalendarEvent | null>(null);
  const [form, setForm] = useState<CalendarForm>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<CalendarFilters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<CalendarFilters>(emptyFilters);

  const filtered = useMemo(() => events.filter((event) => {
    const eventStart = event.startTime.slice(0, 10);
    const eventEnd = event.endTime.slice(0, 10);
    const normalizedKeyword = appliedFilters.keyword.trim().toLowerCase();

    return (!appliedFilters.start || eventStart >= appliedFilters.start)
      && (!appliedFilters.end || eventEnd <= appliedFilters.end)
      && (!appliedFilters.role || event.role === appliedFilters.role)
      && (!normalizedKeyword || event.userName.toLowerCase().includes(normalizedKeyword));
  }), [events, appliedFilters]);

  const open = (event?: CalendarEvent) => {
    setEditing(event?.id ?? null);
    setForm(event ? { userId: event.userId, userName: event.userName, role: event.role, status: event.status, startTime: event.startTime.replace(" ", "T"), endTime: event.endTime.replace(" ", "T"), note: event.note ?? "" } : empty);
    setErrors({});
    setDialog(true);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.role) nextErrors.role = "請選擇角色";
    if (!form.userId) nextErrors.userId = "請選擇姓名";
    if (!form.status) nextErrors.status = "請選擇事件類型";
    if (!form.startTime) nextErrors.startTime = "請選擇開始時間";
    if (!form.endTime) nextErrors.endTime = "請選擇結束時間";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    const data = { ...form, startTime: form.startTime.replace("T", " "), endTime: form.endTime.replace("T", " ") };
    editing ? updateEvent(editing, data) : addEvent(data);
    setDialog(false);
  };

  const clearFilters = () => {
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const changeRole = (role: CalendarEvent["role"]) => {
    const firstPerson = people.find((person) => person.role === role);
    setForm((current) => ({
      ...current,
      role,
      userId: firstPerson?.id ?? "",
      userName: firstPerson?.name ?? "",
    }));
  };

  const changePerson = (userId: string) => {
    const person = people.find((item) => item.id === userId);
    if (!person) return;
    setForm((current) => ({
      ...current,
      userId: person.id,
      userName: person.name,
      role: person.role,
    }));
  };

  const peopleForSelectedRole = people.filter((person) => person.role === form.role);

  return <>
    <PageTitle title="團隊行事曆" actions={<Button onClick={() => open()}><Plus size={16} />新增事件</Button>} />

    <Card className="calendar-filter-card overflow-hidden bg-white">
      <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-[minmax(280px,1.35fr)_minmax(140px,0.7fr)_minmax(200px,1fr)_auto_auto] xl:items-end">
        <DateRangeField
          start={filters.start}
          end={filters.end}
          onStartChange={(start) => setFilters((current) => ({ ...current, start }))}
          onEndChange={(end) => setFilters((current) => ({ ...current, end }))}
        />
        <FilterSelect value={filters.role} onChange={(event) => setFilters((current) => ({ ...current, role: event.target.value }))}>
          <option value="">全部角色</option>
          <option>PM</option>
          <option>IT</option>
        </FilterSelect>
        <div>
          <SearchInput value={filters.keyword} onChange={(event) => setFilters((current) => ({ ...current, keyword: event.target.value }))} placeholder="搜尋姓名" />
        </div>
        <div className="flex items-end">
          <Button className="filter-action-button w-full xl:w-auto" onClick={() => setAppliedFilters(filters)}>搜尋</Button>
        </div>
        <div className="flex items-end">
          <Button variant="outline" className="filter-action-button w-full xl:w-auto" onClick={clearFilters}>重設</Button>
        </div>
      </div>
    </Card>

    <DataTable headers={["ID", "人員", "角色", "事件類型", "開始時間", "結束時間", "操作"]} empty={!filtered.length}>
      {filtered.map((event) => <tr key={event.id} className="hover:bg-blue-50/35">
        <td className="table-cell font-medium text-slate-500">{event.id}</td>
        <td className="table-cell font-medium text-slate-800">{event.userName}</td>
        <td className="table-cell">{event.role}</td>
        <td className="table-cell"><StatusBadge status={event.status} /></td>
        <td className="table-cell">{event.startTime}</td>
        <td className="table-cell">{event.endTime}</td>
        <td className="table-cell"><div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" title="編輯" aria-label="編輯" className="table-action-icon table-action-icon-edit" onClick={() => open(event)}><Pencil size={16} /></Button>
          <Button variant="ghost" size="icon" title="刪除" aria-label="刪除" className="table-action-icon table-action-icon-delete" onClick={() => setDeleting(event)}><Trash2 size={16} /></Button>
        </div></td>
      </tr>)}
    </DataTable>

    <Dialog open={dialog} onClose={() => setDialog(false)} title={editing ? "編輯行事曆事件" : "新增行事曆事件"}>
      <form onSubmit={submit} noValidate className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="角色" required error={errors.role}>
            <Select value={form.role} onChange={(event) => changeRole(event.target.value as CalendarEvent["role"])}>
              {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
            </Select>
          </Field>
          <Field label="姓名" required error={errors.userId}>
            <Select value={form.userId} onChange={(event) => changePerson(event.target.value)}>
              {peopleForSelectedRole.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
            </Select>
          </Field>
        </div>
        <Field label="事件類型" required error={errors.status}>
          <Select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}>
            <option>休假</option>
            <option>遠距</option>
          </Select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="開始時間" required error={errors.startTime}><Input type="datetime-local" value={form.startTime} onChange={(event) => setForm((current) => ({ ...current, startTime: event.target.value }))} /></Field>
          <Field label="結束時間" required error={errors.endTime}><Input type="datetime-local" value={form.endTime} onChange={(event) => setForm((current) => ({ ...current, endTime: event.target.value }))} /></Field>
        </div>
        <Field label="備註"><Textarea value={form.note} onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} /></Field>
        <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setDialog(false)}>取消</Button><Button type="submit">儲存</Button></div>
      </form>
    </Dialog>

    <Dialog open={Boolean(deleting)} onClose={() => setDeleting(null)} title="刪除行事曆事件">
      <div className="space-y-5 p-6">
        <p className="leading-7 text-slate-700">確定要刪除 <span className="font-semibold text-slate-900">{deleting?.userName}</span> 的「{deleting?.status}」事件嗎？刪除後將無法復原。</p>
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          <div>{deleting?.startTime} 至 {deleting?.endTime}</div>
          {deleting?.note && <div>備註：{deleting.note}</div>}
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setDeleting(null)}>取消</Button>
          <Button type="button" variant="danger" onClick={() => { if (deleting) deleteEvent(deleting.id); setDeleting(null); }}>刪除</Button>
        </div>
      </div>
    </Dialog>
  </>;
}

function DateRangeField({ start, end, onStartChange, onEndChange }: { start: string; end: string; onStartChange: (value: string) => void; onEndChange: (value: string) => void }) {
  return <div>
    <DatePicker.RangePicker
      className="w-full"
      value={[start ? dayjs(start, "YYYY-MM-DD") : null, end ? dayjs(end, "YYYY-MM-DD") : null]}
      format="YYYY-MM-DD"
      placeholder={["開始日期", "結束日期"]}
      onChange={(_, dateStrings) => {
        onStartChange(dateStrings[0] ?? "");
        onEndChange(dateStrings[1] ?? "");
      }}
    />
  </div>;
}
