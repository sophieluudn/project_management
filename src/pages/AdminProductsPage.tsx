import { useState, type FormEvent } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button, Dialog, Input, Select, Switch } from "../components/ui";
import { DataTable, Field, PageTitle, StatusBadge } from "../components/common";
import { useAdminStore } from "../stores/adminStore";
import type { Product } from "../types";

const productTypes = ["Android", "iOS", "平台", "模組", "後台", "API"];

type ProductForm = Omit<Product, "id">;

const emptyForm: ProductForm = {
  name: "",
  productType: "平台",
  status: "enabled",
};

export function AdminProductsPage() {
  const { products, addProduct, updateProduct } = useAdminStore();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const edit = (product?: Product) => {
    setId(product?.id ?? null);
    setForm(product ? { name: product.name, productType: product.productType, status: product.status } : emptyForm);
    setErrors({});
    setOpen(true);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "請輸入產品名稱";
    if (!form.productType) nextErrors.productType = "請選擇產品類型";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    id ? updateProduct(id, form) : addProduct(form);
    setOpen(false);
  };

  return (
    <>
      <PageTitle
        title="產品管理"
        description="維護可建立專案的產品與產品類型。"
        actions={<Button onClick={() => edit()}><Plus size={16} />新增產品</Button>}
      />

      <DataTable headers={["ID", "產品名稱", "產品類型", "狀態", "操作"]}>
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-blue-50/35">
            <td className="table-cell text-slate-500">{product.id}</td>
            <td className="table-cell font-medium text-slate-800">{product.name}</td>
            <td className="table-cell">{product.productType}</td>
            <td className="table-cell"><StatusBadge status={product.status} /></td>
            <td className="table-cell">
              <Button
                variant="ghost"
                size="icon"
                title="編輯"
                aria-label="編輯"
                className="table-action-icon table-action-icon-edit"
                onClick={() => edit(product)}
              >
                <Pencil size={16} />
              </Button>
            </td>
          </tr>
        ))}
      </DataTable>

      <Dialog open={open} onClose={() => setOpen(false)} title={id ? "編輯產品" : "新增產品"}>
        <form onSubmit={submit} noValidate className="space-y-5 p-6">
          <section className="status-switch-card flex h-12 items-center justify-between gap-4 rounded-xl border border-slate-200 px-4">
            <div className="flex items-center">
              <p className="field-label m-0">啟用狀態</p>
            </div>
            <Switch
              checked={form.status === "enabled"}
              onChange={(checked) => setForm((current) => ({ ...current, status: checked ? "enabled" : "disabled" }))}
            />
          </section>

          <Field label="產品名稱" required error={errors.name}>
            <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          </Field>

          <Field label="產品類型" required error={errors.productType}>
            <Select value={form.productType} onChange={(event) => setForm((current) => ({ ...current, productType: event.target.value }))}>
              {productTypes.map((productType) => <option key={productType}>{productType}</option>)}
            </Select>
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
