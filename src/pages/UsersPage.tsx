import { useState, type FormEvent } from "react";
import { Select as AntSelect } from "antd";
import { Pencil, Plus } from "lucide-react";
import { Button, Dialog, Input, Select, Switch } from "../components/ui";
import { DataTable, Field, PageTitle } from "../components/common";
import { useAdminStore } from "../stores/adminStore";
import type { User } from "../types";

type UserForm = Omit<User, "id">;

const emptyForm: UserForm = {
  name: "",
  account: "",
  email: "",
  roleId: "R00002",
  productIds: [],
  status: "enabled",
};

function accountFromEmail(email: string) {
  return email.trim().split("@")[0] || "";
}

export function UsersPage() {
  const { users, roles, products, addUser, updateUser } = useAdminStore();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const edit = (user?: User) => {
    setId(user?.id ?? null);
    setForm(user ? { ...user } : emptyForm);
    setErrors({});
    setOpen(true);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "請輸入姓名";
    if (!form.roleId) nextErrors.roleId = "請選擇角色";
    if (!form.email.trim()) nextErrors.email = "請輸入 Email";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    const data: UserForm = {
      ...form,
      account: form.account || accountFromEmail(form.email),
      email: form.email.trim(),
    };
    id ? updateUser(id, data) : addUser(data);
    setOpen(false);
  };

  return (
    <>
      <PageTitle
        title="使用者管理"
        description="維護平台帳號、角色與負責產品。"
        actions={<Button onClick={() => edit()}><Plus size={16} />新增使用者</Button>}
      />

      <DataTable headers={["ID", "名稱", "Email", "角色", "負責產品", "狀態", "操作"]}>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-blue-50/35">
            <td className="table-cell text-slate-500">{user.id}</td>
            <td className="table-cell font-medium text-slate-800">{user.name}</td>
            <td className="table-cell">{user.email}</td>
            <td className="table-cell">{roles.find((role) => role.id === user.roleId)?.name ?? "—"}</td>
            <td className="table-cell max-w-60 truncate">
              {user.productIds.map((productId) => products.find((product) => product.id === productId)?.name).filter(Boolean).join("、") || "—"}
            </td>
            <td className="table-cell">
              <Switch
                checked={user.status === "enabled"}
                onChange={(checked) => updateUser(user.id, { status: checked ? "enabled" : "disabled" })}
              />
            </td>
            <td className="table-cell">
              <Button
                variant="ghost"
                size="icon"
                title="編輯"
                aria-label="編輯"
                className="table-action-icon table-action-icon-edit"
                onClick={() => edit(user)}
              >
                <Pencil size={16} />
              </Button>
            </td>
          </tr>
        ))}
      </DataTable>

      <Dialog open={open} onClose={() => setOpen(false)} title={id ? "編輯使用者" : "新增使用者"} wide>
        <form onSubmit={submit} noValidate className="grid gap-5 p-6 sm:grid-cols-2">
          <section className="user-status-card flex h-12 items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 sm:col-span-2">
            <div className="flex items-center">
              <p className="field-label m-0">啟用狀態</p>
            </div>
            <Switch
              checked={form.status === "enabled"}
              onChange={(checked) => setForm((current) => ({ ...current, status: checked ? "enabled" : "disabled" }))}
            />
          </section>

          <Field label="姓名" required error={errors.name}>
            <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          </Field>

          <Field label="角色" required error={errors.roleId}>
            <Select value={form.roleId} onChange={(event) => setForm((current) => ({ ...current, roleId: event.target.value }))}>
              {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
            </Select>
          </Field>

          <Field label="Email" required className="sm:col-span-2" error={errors.email}>
            <Input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value, account: accountFromEmail(event.target.value) }))} />
          </Field>

          <Field label="負責產品" className="sm:col-span-2">
            <AntSelect
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="請選擇負責產品"
              value={form.productIds}
              onChange={(productIds) => setForm((current) => ({ ...current, productIds }))}
              options={products.map((product) => ({ label: product.name, value: product.id }))}
            />
          </Field>

          <div className="flex items-end justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>取消</Button>
            <Button type="submit">儲存</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
