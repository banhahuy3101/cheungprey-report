"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

export interface SearchOption {
  value: string;
  label: string;
}

export function SearchSelect({
  options,
  value,
  onChange,
  placeholder,
  className = "",
  onSearch,
  createOption,
}: {
  options: SearchOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  createOption?: SearchOption | null;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = query
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          o.value.includes(query)
      )
    : options;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasValue = !!selected;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <input
        type="text"
        value={open ? query : selected?.label || value || ""}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          onSearch?.(e.target.value);
          if (!e.target.value) onChange("");
        }}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none pr-7"
      />
      {hasValue && !open && (
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange("");
            setQuery("");
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X size={14} />
        </button>
      )}
      {open && (filtered.length > 0 || createOption) && (
        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          {filtered.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(opt.value);
                setOpen(false);
                setQuery("");
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${
                opt.value === value ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
          {createOption && (
            <>
              {filtered.length > 0 && <div className="border-t border-slate-200" />}
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(createOption.value);
                  setOpen(false);
                  setQuery("");
                }}
                className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium flex items-center gap-1.5"
              >
                {createOption.label}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
