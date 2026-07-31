import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeRaw from "rehype-raw";

type MarkdownViewerProps = {
  value?: string;
  height?: number;
};

export function MarkdownViewer({ value, height }: MarkdownViewerProps) {
  if (!value?.trim()) return <p className="text-sm text-slate-500">—</p>;

  return <div data-color-mode="light" className="markdown-viewer-shell rounded-xl border border-slate-200 bg-white p-4" style={height ? { height, overflow: "auto" } : undefined}>
    <MarkdownPreview source={value} rehypePlugins={[rehypeRaw]} />
  </div>;
}
