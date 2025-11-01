
import React from 'react';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">{title}</h2>
      {children}
    </div>
  );
}
   