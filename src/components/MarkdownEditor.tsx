import { useMemo, useState } from "react";
import MDEditor, { commands, type ICommand } from "@uiw/react-md-editor";
import rehypeRaw from "rehype-raw";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  ariaLabel?: string;
  placeholder?: string;
  height?: number;
  minHeight?: number;
};

const withLabel = (command: ICommand, label: string): ICommand => ({
  ...command,
  buttonProps: { ...command.buttonProps, "aria-label": label, title: label },
});

export function MarkdownEditor({ value, onChange, label = "更新內容", required, ariaLabel, placeholder, height = 420, minHeight = 320 }: MarkdownEditorProps) {
  const [color, setColor] = useState("#1890FF");

  const colorCommand = useMemo<ICommand>(() => commands.group([], {
    name: "text-color",
    groupName: "text-color",
    buttonProps: { "aria-label": "文字顏色", title: "文字顏色" },
    icon: <span className="text-sm font-bold text-blue-600">A</span>,
    children: ({ close, getState, textApi }) => <div className="w-52 space-y-3 p-3">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">文字顏色</span>
        <div className="flex items-center gap-3">
          <input aria-label="選擇文字顏色" type="color" value={color} onChange={(event) => setColor(event.target.value)} className="h-8 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white p-1" />
          <span className="font-mono text-sm text-slate-600">{color.toUpperCase()}</span>
        </div>
      </label>
      <button type="button" className="h-8 w-full rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700" onClick={() => {
        const state = getState?.();
        const selectedText = state && state.selectedText ? state.selectedText : "文字";
        textApi?.replaceSelection(`<span style="color: ${color}">${selectedText}</span>`);
        close();
      }}>套用顏色</button>
    </div>,
  }), [color]);

  const editorCommands = useMemo<ICommand[]>(() => [
    commands.group(
      [commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6],
      { name: "title", groupName: "title", buttonProps: { "aria-label": "H1 至 H6 標題", title: "H1 至 H6 標題" } },
    ),
    commands.divider,
    withLabel(commands.bold, "粗體"),
    withLabel(commands.italic, "斜體"),
    commands.divider,
    withLabel(commands.link, "插入連結"),
    withLabel(commands.image, "插入圖片"),
    withLabel(commands.table, "插入表格"),
    commands.divider,
    withLabel(commands.unorderedListCommand, "項目符號"),
    withLabel(commands.orderedListCommand, "序號"),
    commands.divider,
    colorCommand,
  ], [colorCommand]);

  return <div>
    {label && <span className={`field-label ${required ? "field-required" : ""}`}>{label}</span>}
    <div data-color-mode="light" className="markdown-editor-shell">
      <MDEditor
        value={value}
        onChange={(nextValue) => onChange(nextValue ?? "")}
        commands={editorCommands}
        extraCommands={[commands.codeEdit, commands.codeLive, commands.codePreview, commands.fullscreen]}
        preview="live"
        height={height}
        minHeight={minHeight}
        visibleDragbar
        textareaProps={{
          "aria-label": ariaLabel ?? `${label} Markdown 內容`,
          placeholder,
          onCopy: (event) => {
            const target = event.currentTarget;
            const selectedText = target.value.slice(target.selectionStart, target.selectionEnd);
            if (!selectedText) return;
            event.clipboardData.setData("text/markdown", selectedText);
            event.clipboardData.setData("text/plain", selectedText);
            event.preventDefault();
          },
          onPaste: (event) => {
            const markdownText = event.clipboardData.getData("text/markdown") || event.clipboardData.getData("text/plain");
            if (!markdownText) return;
            event.preventDefault();
            const target = event.currentTarget;
            const insertionStart = target.selectionStart;
            const nextValue = `${target.value.slice(0, insertionStart)}${markdownText}${target.value.slice(target.selectionEnd)}`;
            onChange(nextValue);
            requestAnimationFrame(() => {
              const cursor = insertionStart + markdownText.length;
              target.setSelectionRange(cursor, cursor);
            });
          },
        }}
        previewOptions={{ rehypePlugins: [rehypeRaw] }}
      />
    </div>
    <p className="mt-2 text-[12px] leading-5 text-slate-500">支援 Markdown 即時預覽；可先選取文字，再使用工具列套用格式。</p>
  </div>;
}
