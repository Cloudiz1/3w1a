"use client";

import { useState, useRef, useEffect } from "react";

type Props = {
  options: string[];
  onChange: (values: string[]) => void;
};

export default function MultiSelect({ options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleOption = (option: string) => {
    let newSelected;

    if (selected.includes(option)) {
      newSelected = selected.filter((o) => o !== option);
    } else {
      newSelected = [...selected, option];
    }

    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-2 border border-black rounded bg-white text-left"
      >
        {selected.length > 0
          ? selected.join(", ")
          : "Select options"}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-black rounded shadow max-h-40 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
