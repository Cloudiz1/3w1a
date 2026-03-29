"use client";

import { useState } from "react";

type Props = {
  options: Array<string>;
  onChange: (value: string) => void;
};

export default function Categorical({ options, onChange }: Props) {
  const [selected, setSelected] = useState("");

  return (
    <select
      value={selected}
      onChange={(e) => {
        const value = e.target.value;
        setSelected(value);
        onChange(value);
      }}
      className="w-full p-2 border border-black rounded bg-white"
    >
      <option value="" disabled>
        Select an option
      </option>

      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
