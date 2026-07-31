import { useState, type FormEvent } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button, Dialog, Input, Switch } from "../components/ui";
import { DataTable, Field, PageTitle } from "../components/common";
import { useAdminStore } from "../stores/adminStore";
import { adminPermissions, projectPermissions } from "../mocks/roles";
import type { Role } from "../types";

type RoleForm = Omit<Role, "id">;

const emptyForm: RoleForm = {
  name: "",
  status: "enabled",
  permissions: [],
};

export function RolesPage() {
  const { roles, addRole, updateRole } = useAdminStore();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [form, setForm] = useState<RoleForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const edit = (role?: Role) => {
    setId(role?.id ?? null);
    setForm(role ? { name: role.name, status: role.status, permissions: role.permissions } : emptyForm);
    setErrors({});
    setOpen(true);
  };

  const toggle = (permission: string) => {
    setForm((current) => ({
      ...current,
      permissions: current.permissions.includes(permission)
        ? current.permissions.filter((item) => item !== permission)
        : [...current.permissions, permission],
    }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "請輸入角色名稱";
    if (!form.permissions.length) nextErrors.permissions = "請至少選擇一項功能權限";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    id ? updateRole(id, form) : addRole(form);
    setOpen(false);
  };

  return (
    <>
      <PageTitle
        title="角色管理"
        description="設定平台角色與可使用的功能。"
        actions={<Button onClick={() => edit()}><Plus size={16} />新增角色</Button>}
      />

      <DataTable headers={["ID", "角色名稱", "狀態", "已啟用權限", "操作"]}>
        {roles.map((role) => (
          <tr key={role.id} className="hover:bg-blue-50/35">
            <td className="table-cell text-slate-500">{role.id}</td>
            <td className="table-cell font-medium text-slate-800">{role.name}</td>
            <td className="table-cell">
              <Switch checked={role.status === "enabled"} onChange={(checked) => updateRole(role.id, { status: checked ? "enabled" : "disabled" })} />
            </td>
            <td className="table-cell">{role.permissions.length} 項</td>
            <td className="table-cell">
              <Button
                variant="ghost"
                size="icon"
                title="編輯"
                aria-label="編輯"
                className="table-action-icon table-action-icon-edit"
                onClick={() => edit(role)}
              >
                <Pencil size={16} />
              </Button>
            </td>
          </tr>
        ))}
      </DataTable>

      <Dialog open={open} onClose={() => setOpen(false)} title={id ? "編輯角色" : "新增角色"} wide>
        <form onSubmit={submit} noValidate className="space-y-5 p-6">
          <section className="status-switch-card flex h-12 items-center justify-between gap-4 rounded-xl border border-slate-200 px-4">
            <div className="flex items-center">
              <p className="field-label m-0">啟用狀態</p>
            </div>
            <Switch checked={form.status === "enabled"} onChange={(checked) => setForm((current) => ({ ...current, status: checked ? "enabled" : "disabled" }))} />
          </section>

          <Field label="角色名稱" required error={errors.name}>
            <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          </Field>

          <div>
            <p className="field-label field-required">功能權限</p>
            <PermissionGroup title="專案管理" items={projectPermissions} selected={form.permissions} toggle={toggle} />
            <PermissionGroup title="權限管理" items={adminPermissions} selected={form.permissions} toggle={toggle} />
            {errors.permissions && <p className="field-error">{errors.permissions}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>取消</Button>
            <Button type="submit">儲存</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

function PermissionGroup({ title, items, selected, toggle }: { title: string; items: string[]; selected: string[]; toggle: (permission: string) => void }) {
  const all = items.every((item) => selected.includes(item));

  return (
    <section className="mb-3 rounded-xl border border-slate-200">
      <label className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3 font-semibold text-slate-800">
        <input
          type="checkbox"
          checked={all}
          onChange={() => items.forEach((item) => {
            if (all ? selected.includes(item) : !selected.includes(item)) toggle(item);
          })}
          className="h-4 w-4 accent-blue-600"
        />
        {title}
      </label>
      <div className="grid gap-2 p-4 sm:grid-cols-2">
        {items.map((permission) => (
          <label key={permission} className="flex items-center gap-3 rounded-lg p-2 text-sm text-slate-700 hover:bg-blue-50">
            <input type="checkbox" checked={selected.includes(permission)} onChange={() => toggle(permission)} className="h-4 w-4 accent-blue-600" />
            {permission}
          </label>
        ))}
      </div>
    </section>
  );
}
