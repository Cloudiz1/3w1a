import { useState, useRef } from "react";

type Props = {
  min: number;
  max: number;
  step?: number;
  onChange?: (range: [number, number]) => void;
};

export default function RangeSlider({ min, max, step = 1, onChange }: Props) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const trackRef = useRef<HTMLDivElement>(null);

  const percent = (v: number) => ((v - min) / (max - min)) * 100;

  const getValueFromPosition = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const x = clientX - rect.left;
    const ratio = x / rect.width;
    const raw = min + ratio * (max - min);
    return Math.round(raw / step) * step;
  };

  const handleDrag = (type: "min" | "max") => (e: React.MouseEvent) => {
    const move = (e: MouseEvent) => {
      const value = getValueFromPosition(e.clientX);
	  const clamp = (v: number, min: number, max: number) =>
		Math.min(Math.max(v, min), max);

      if (type === "min") {
		const clamped = clamp(value, min, maxVal);
        setMinVal(clamped);
        onChange?.([clamped, maxVal]);
      } else {
		const clamped = clamp(value, minVal, max);
        setMaxVal(clamped);
        onChange?.([minVal, clamped]);
      }
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <div className="w-full max-w-md select-none">
      {/* Labels */}
      <div className="flex justify-between text-xl mb-2">
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 bg-gray-300 rounded"
      >
        {/* Active range */}
        <div
          className="absolute h-2 bg-blue-500 rounded"
          style={{
            left: `${percent(minVal)}%`,
            width: `${percent(maxVal) - percent(minVal)}%`,
          }}
        />

        {/* Min thumb */}
        <div
          onMouseDown={handleDrag("min")}
          className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer -top-1"
          style={{ left: `calc(${percent(minVal)}% - 8px)` }}
        />

        {/* Max thumb */}
        <div
          onMouseDown={handleDrag("max")}
          className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer -top-1"
          style={{ left: `calc(${percent(maxVal)}% - 8px)` }}
        />
      </div>
    </div>
  );
}
