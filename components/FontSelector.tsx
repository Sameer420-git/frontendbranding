
import React from 'react';
import { FONT_FACES } from '../constants';

interface FontSelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export default function FontSelector({ label, ...props }: FontSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{label}</label>
      <select
        {...props}
        className="w-full p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      >
        {FONT_FACES.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>
    </div>
  );
}
   