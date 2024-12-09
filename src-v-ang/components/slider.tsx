import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number | null;
  label: string;
  step?: number;
  onChange: (value: number | null) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, value, label, step = 1, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-2">{label}: {value !== null ? value.toFixed(2) : 'Any'}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value ?? min}
        step={step}
        onChange={(e) => {
          const newValue = e.target.value === '' ? null : parseFloat(e.target.value);
          onChange(newValue);
        }}
        className="slider"
      />
      <div className="flex justify-between text-sm mt-2">
        <span>{min.toFixed(2)}</span>
        <span>{max.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Slider;