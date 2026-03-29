import { useState } from "react";

type Props = {
  min: number;
  max: number;
  step?: number;
  onChange?: (range: [number, number]) => void;
};

export default function RangeSlider({
  min,
  max,
  step = 1,
  onChange,
}: Props) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const percent = (value: number) =>
    ((value - min) / (max - min)) * 100;

  const handleMinChange = (value: number) => {
    if (value > maxVal) return;
    setMinVal(value);
    onChange?.([value, maxVal]);
  };

  const handleMaxChange = (value: number) => {
    if (value < minVal) return;
    setMaxVal(value);
    onChange?.([minVal, value]);
  };

  return (
    <div className="w-full max-w-md">
      {/* Labels */}
      <div className="flex justify-between text-sm mb-2">
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>

      <div className="relative h-6">
        {/* Track */}
        <div className="absolute w-full h-1 bg-gray-300 rounded top-1/2 -translate-y-1/2" />

        {/* Active range */}
        <div
          className="absolute h-1 bg-blue-500 rounded top-1/2 -translate-y-1/2"
          style={{
            left: `${percent(minVal)}%`,
            width: `${percent(maxVal) - percent(minVal)}%`,
          }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => handleMinChange(+e.target.value)}
          className="absolute w-full pointer-events-none appearance-none bg-transparent"
          style={{ zIndex: 3 }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => handleMaxChange(+e.target.value)}
          className="absolute w-full pointer-events-none appearance-none bg-transparent"
          style={{ zIndex: 4 }}
        />

        {/* Thumb styling */}
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            pointer-events: all;
            width: 16px;
            height: 16px;
            background: white;
            border: 2px solid #3b82f6;
            border-radius: 9999px;
            cursor: pointer;
            -webkit-appearance: none;
          }
        `}</style>
      </div>
    </div>
  );
}
