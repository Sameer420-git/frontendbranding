
import React from 'react';

interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function ColorInput({ label, value, ...props }: ColorInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{label}</label>
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          {...props}
          className="w-full p-2 pl-10 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md border border-slate-300 dark:border-slate-600">
           <input
            type="color"
            value={value}
            {...props}
            className="w-full h-full cursor-pointer opacity-0 absolute inset-0"
          />
          <div
            className="w-full h-full rounded"
            style={{ backgroundColor: value as string }}
          />
        </div>
      </div>
    </div>
  );
}
   