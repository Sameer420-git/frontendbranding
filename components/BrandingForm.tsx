
import React, { useState } from 'react';
import { BrandingData } from '../types';
import ColorInput from './ColorInput';
import FontSelector from './FontSelector';
import SectionCard from './SectionCard';
import { FONT_WEIGHTS } from '../constants';
import { SuggestionButton } from './SuggestionButton';
import { ChevronDownIcon } from './icons';

interface BrandingFormProps {
  brandingData: BrandingData;
  onDataChange: (path: string, value: any) => void;
  onGenerateSuggestion: (prompt: string) => void;
  isLoading: boolean;
  error: string | null;
}

const ThemeSettings = ({ theme, path, onDataChange, title }: { theme: BrandingData['lightTheme'], path: string, onDataChange: (path: string, value: any) => void, title: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="space-y-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-700 dark:text-slate-300">
        {title}
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="space-y-6 pl-2 border-l-2 border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-2 gap-4">
            <ColorInput label="Primary" value={theme.colors.primary} onChange={e => onDataChange(`${path}.colors.primary`, e.target.value)} />
            <ColorInput label="Secondary" value={theme.colors.secondary} onChange={e => onDataChange(`${path}.colors.secondary`, e.target.value)} />
            <ColorInput label="Success" value={theme.colors.success} onChange={e => onDataChange(`${path}.colors.success`, e.target.value)} />
            <ColorInput label="Warning" value={theme.colors.warning} onChange={e => onDataChange(`${path}.colors.warning`, e.target.value)} />
            <ColorInput label="Error" value={theme.colors.error} onChange={e => onDataChange(`${path}.colors.error`, e.target.value)} />
            <ColorInput label="Background" value={theme.colors.background} onChange={e => onDataChange(`${path}.colors.background`, e.target.value)} />
            <ColorInput label="Text" value={theme.colors.text} onChange={e => onDataChange(`${path}.colors.text`, e.target.value)} />
          </div>
          <div className="space-y-4">
            <FontSelector label="Primary Font" value={theme.typography.primaryFont} onChange={e => onDataChange(`${path}.typography.primaryFont`, e.target.value)} />
            <FontSelector label="Secondary Font" value={theme.typography.secondaryFont} onChange={e => onDataChange(`${path}.typography.secondaryFont`, e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function BrandingForm({ brandingData, onDataChange, onGenerateSuggestion, isLoading, error }: BrandingFormProps) {
  const [suggestionPrompt, setSuggestionPrompt] = useState('A tech startup focused on renewable energy solutions');

  return (
    <div className="sticky top-24 space-y-6">
      <SectionCard title="AI Branding Assistant">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Describe your brand, and our AI assistant will generate a complete branding guideline for you.
        </p>
        <textarea
          value={suggestionPrompt}
          onChange={(e) => setSuggestionPrompt(e.target.value)}
          placeholder="e.g., A cozy coffee shop with a rustic vibe"
          className="w-full p-2 border rounded-md bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          rows={3}
        />
        <SuggestionButton onClick={() => onGenerateSuggestion(suggestionPrompt)} isLoading={isLoading} />
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </SectionCard>
      
      <SectionCard title="Project Details">
        <div className="space-y-4">
           <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Brand Name</label>
            <input type="text" value={brandingData.brandName} onChange={e => onDataChange('brandName', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Project Name</label>
            <input type="text" value={brandingData.projectName} onChange={e => onDataChange('projectName', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Theme Customization">
        <div className="space-y-8">
          <ThemeSettings theme={brandingData.lightTheme} path="lightTheme" onDataChange={onDataChange} title="Light Theme" />
          <ThemeSettings theme={brandingData.darkTheme} path="darkTheme" onDataChange={onDataChange} title="Dark Theme" />
        </div>
      </SectionCard>
      
      <SectionCard title="Global Typography">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Font Weight</label>
            <select value={brandingData.globalTypography.fontWeight} onChange={e => onDataChange('globalTypography.fontWeight', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
              {Object.entries(FONT_WEIGHTS).map(([value, name]) => (
                <option key={value} value={value}>{name} ({value})</option>
              ))}
            </select>
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Base Font Size</label>
            <input type="text" value={brandingData.globalTypography.fontSize} onChange={e => onDataChange('globalTypography.fontSize', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
   