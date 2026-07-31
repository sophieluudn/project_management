import { Children, isValidElement, type ButtonHTMLAttributes, type ChangeEvent, type HTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Button as AntButton, Card as AntCard, DatePicker as AntDatePicker, Input as AntInput, Modal, Select as AntSelect, Switch as AntSwitch } from "antd";
import dayjs from "dayjs";
import { Eye, Pencil } from "lucide-react";
import { cn } from "../lib/utils";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  variant?: "default" | "outline" | "ghost" | "danger";
  size?: "default" | "sm" | "icon";
};

export function Button({ className, variant = "default", size = "default", children, type, ...props }: ButtonProps) {
  const items = Children.toArray(children);
  let renderedChildren: ReactNode = children;
  let renderedSize = size;
  if (items.length > 1 && isValidElement(items[0])) renderedChildren = items.slice(1);
  if (items.length === 1 && isValidElement(items[0]) && (items[0].type === Pencil || items[0].type === Eye) && !props["aria-label"] && !props.title) {
    renderedChildren = props.title || (items[0].type === Pencil ? "編輯" : "檢視");
    renderedSize = "sm";
  }

  return <AntButton
    htmlType={type}
    type={variant === "default" || variant === "danger" ? "primary" : variant === "ghost" ? "text" : "default"}
    danger={variant === "danger"}
    size={renderedSize === "sm" ? "small" : "middle"}
    className={className}
    {...props}
  >
    {renderedChildren}
  </AntButton>;
}

export function Input({ className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, "size">) {
  if (props.type === "date") {
    const value = typeof props.value === "string" && props.value ? dayjs(props.value, "YYYY-MM-DD") : null;
    return <AntDatePicker
      className={cn("w-full", className)}
      value={value}
      format="YYYY-MM-DD"
      placeholder={props.placeholder}
      disabled={props.disabled}
      onChange={(_, dateString) => props.onChange?.({ target: { value: Array.isArray(dateString) ? dateString[0] : dateString } } as ChangeEvent<HTMLInputElement>)}
    />;
  }

  if (props.type === "datetime-local") {
    const value = typeof props.value === "string" && props.value ? dayjs(props.value, "YYYY-MM-DDTHH:mm") : null;
    return <AntDatePicker
      showTime={{ format: "HH:mm" }}
      className={cn("w-full", className)}
      value={value}
      format="YYYY-MM-DD HH:mm"
      placeholder={props.placeholder}
      disabled={props.disabled}
      onChange={(date) => props.onChange?.({ target: { value: date ? date.format("YYYY-MM-DDTHH:mm") : "" } } as ChangeEvent<HTMLInputElement>)}
    />;
  }

  return <AntInput className={className} {...props} />;
}

export function Select({ className, children, value, onChange, ...props }: Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">) {
  const options = Children.toArray(children)
    .filter(isValidElement)
    .map((child) => {
      const optionProps = child.props as { value?: string; children?: ReactNode; disabled?: boolean };
      const label = typeof optionProps.children === "string" ? optionProps.children : optionProps.value ?? "";
      return {
        value: optionProps.value ?? label,
        label,
        disabled: optionProps.disabled,
      };
    });

  return <AntSelect
    className={cn("w-full", className)}
    value={value as string}
    options={options}
    disabled={props.disabled}
    onChange={(nextValue) => onChange?.({ target: { value: nextValue } } as ChangeEvent<HTMLSelectElement>)}
  />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <AntInput.TextArea className={className} autoSize={{ minRows: 4 }} {...props} />;
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <AntCard className={cn("app-card", className)} variant="outlined" {...props} />;
}

export function Dialog({ open, onClose, title, description, children, wide = false }: { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode; wide?: boolean }) {
  return <Modal
    open={open}
    onCancel={onClose}
    className="app-modal"
    title={<div><span>{title}</span>{description && <p className="mt-1 text-sm font-normal text-slate-500">{description}</p>}</div>}
    footer={null}
    width={wide ? 720 : 520}
    destroyOnHidden
  >
    {children}
  </Modal>;
}

export function Switch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return <AntSwitch checked={checked} onChange={onChange} />;
}
