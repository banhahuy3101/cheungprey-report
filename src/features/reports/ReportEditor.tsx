"use client";

import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Table as TableIcon,
  Plus,
  Trash2,
  ChevronDown,
  Quote,
} from "lucide-react";

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value, 10);
      if (level === 1 || level === 2 || level === 3) {
        editor.chain().focus().toggleHeading({ level }).run();
      }
    }
  };

  const getCurrentHeadingValue = () => {
    if (editor.isActive("heading", { level: 1 })) return "1";
    if (editor.isActive("heading", { level: 2 })) return "2";
    if (editor.isActive("heading", { level: 3 })) return "3";
    return "paragraph";
  };

  const btnClass = (active: boolean) =>
    `p-1.5 rounded hover:bg-slate-100 text-slate-700 transition-all flex items-center justify-center ${
      active ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : ""
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 border-b border-slate-200 bg-[#f8f9fa] sticky top-0 z-10 shadow-sm">
      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-40 transition-all"
          title="Undo"
        >
          <Undo2 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-40 transition-all"
          title="Redo"
        >
          <Redo2 size={16} />
        </button>
      </div>

      <div className="w-[1px] h-5 bg-slate-200 mx-1" />

      {/* Styles/Headings Dropdown */}
      <div className="flex items-center gap-1">
        <div className="relative">
          <select
            value={getCurrentHeadingValue()}
            onChange={handleHeadingChange}
            className="appearance-none bg-white border border-slate-200 rounded px-3 py-1 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer hover:bg-slate-50 transition-all"
          >
            <option value="paragraph">Normal text</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-2 text-slate-500 pointer-events-none" />
        </div>
      </div>

      <div className="w-[1px] h-5 bg-slate-200 mx-1" />

      {/* Text Formatting */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Italic (Ctrl+I)"
        >
          <ItelicIcon editor={editor} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btnClass(editor.isActive("underline"))}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon size={16} />
        </button>
        
        {/* Text Color */}
        <div className="relative flex items-center p-1 rounded hover:bg-slate-100 transition-all" title="Text color">
          <input
            type="color"
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()
            }
            value={editor.isActive("textStyle") ? editor.getAttributes("textStyle").color || "#000000" : "#000000"}
            className="w-5 h-5 cursor-pointer rounded border-0 bg-transparent"
          />
        </div>
      </div>

      <div className="w-[1px] h-5 bg-slate-200 mx-1" />

      {/* Alignment */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btnClass(editor.isActive({ textAlign: "left" }))}
          title="Align left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btnClass(editor.isActive({ textAlign: "center" }))}
          title="Align center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btnClass(editor.isActive({ textAlign: "right" }))}
          title="Align right"
        >
          <AlignRight size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={btnClass(editor.isActive({ textAlign: "justify" }))}
          title="Align justify"
        >
          <AlignJustify size={16} />
        </button>
      </div>

      <div className="w-[1px] h-5 bg-slate-200 mx-1" />

      {/* Lists & Blocks */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
          title="Bullet list"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
          title="Numbered list"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>
      </div>

      <div className="w-[1px] h-5 bg-slate-200 mx-1" />

      {/* Table Controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition-all flex items-center justify-center"
          title="Insert table (3x3)"
        >
          <TableIcon size={16} />
        </button>

        {editor.isActive("table") && (
          <div className="flex items-center gap-1 bg-blue-50/50 p-0.5 rounded border border-blue-100">
            <button
              type="button"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="p-1 rounded hover:bg-blue-100 text-blue-700 transition-all flex items-center justify-center"
              title="Add column after"
            >
              <Plus size={14} className="mr-0.5" />
              <span className="text-[10px] font-bold">Col</span>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className="p-1 rounded hover:bg-blue-100 text-blue-700 transition-all flex items-center justify-center"
              title="Add row after"
            >
              <Plus size={14} className="mr-0.5" />
              <span className="text-[10px] font-bold">Row</span>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteColumn().run()}
              className="p-1 rounded hover:bg-red-100 text-red-600 transition-all flex items-center justify-center"
              title="Delete column"
            >
              <Trash2 size={14} className="mr-0.5" />
              <span className="text-[10px] font-bold">Col</span>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteRow().run()}
              className="p-1 rounded hover:bg-red-100 text-red-600 transition-all flex items-center justify-center"
              title="Delete row"
            >
              <Trash2 size={14} className="mr-0.5" />
              <span className="text-[10px] font-bold">Row</span>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="p-1 rounded hover:bg-red-200 text-red-700 transition-all flex items-center justify-center"
              title="Delete table"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ItelicIcon = ({ editor }: { editor: any }) => {
  return <Italic size={16} />;
};

interface ReportEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const ReportEditor: React.FC<ReportEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none text-black prose-headings:text-black prose-p:text-black prose-li:text-black prose-td:text-black prose-th:text-black",
        style:
          "font-family: 'Kantumruy Pro', 'Khmer OS', sans-serif; line-height: 1.6; font-size: 14px; min-height: 297mm; padding: 20mm 20mm 20mm 20mm;",
      },
    },
  });

  // Automatically update content if it changes externally
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="flex flex-col border border-slate-200 rounded-xl bg-slate-100 shadow-inner overflow-hidden">
      {/* Google Docs style toolbar */}
      <Toolbar editor={editor} />

      {/* Google Docs style page layout */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-[#f0f1f3] min-h-[500px]">
        <div className="w-full max-w-[816px] bg-white shadow-[0_4px_16px_rgba(17,17,26,0.05),_0_8px_32px_rgba(17,17,26,0.05)] border border-slate-200/60 rounded-sm hover:shadow-[0_4px_24px_rgba(17,17,26,0.08),_0_8px_48px_rgba(17,17,26,0.08)] transition-shadow duration-300">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default ReportEditor;
