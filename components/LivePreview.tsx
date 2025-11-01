
import React, { useState, useMemo } from 'react';
import { BrandingData } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface LivePreviewProps {
  brandingData: BrandingData;
}

const PreviewCard = ({ theme, globalTypography }: { theme: BrandingData['lightTheme'], globalTypography: BrandingData['globalTypography'] }) => {
  const primaryFont = { fontFamily: `'${theme.typography.primaryFont}', sans-serif` };
  const secondaryFont = { fontFamily: `'${theme.typography.secondaryFont}', serif` };
  
  return (
    <div
      className="p-8 rounded-lg transition-colors duration-300 w-full"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontSize: globalTypography.fontSize,
        fontWeight: globalTypography.fontWeight,
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2" style={{...primaryFont, color: theme.colors.primary }}>
          The quick brown fox jumps over the lazy dog
        </h1>
        <h2 className="text-2xl mb-6" style={secondaryFont}>
          A Heading for Your Sections
        </h2>
        <p className="mb-6" style={primaryFont}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <button
              className="w-full py-2 px-4 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
              style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }}
            >
              Primary Button
            </button>
             <button
              className="w-full py-2 px-4 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
              style={{ backgroundColor: theme.colors.secondary, color: theme.colors.background }}
            >
              Secondary Button
            </button>
            <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.success, color: theme.colors.background }}>
              <p className="font-semibold">Success Message</p>
              <p className="text-sm">Your operation was completed successfully.</p>
            </div>
          </div>
          <div className="space-y-4">
             <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.warning, color: theme.colors.background }}>
              <p className="font-semibold">Warning Message</p>
              <p className="text-sm">Please double check your input.</p>
            </div>
             <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.error, color: theme.colors.background }}>
              <p className="font-semibold">Error Message</p>
              <p className="text-sm">An error has occurred.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function LivePreview({ brandingData }: LivePreviewProps) {
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  
  const selectedThemeData = useMemo(() => {
    return previewTheme === 'light' ? brandingData.lightTheme : brandingData.darkTheme;
  }, [previewTheme, brandingData]);

  return (
    <div className="sticky top-24">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        <div className="flex items-center space-x-2 p-1 rounded-full bg-slate-200 dark:bg-slate-700">
          <button
            onClick={() => setPreviewTheme('light')}
            className={`p-2 rounded-full transition-colors ${previewTheme === 'light' ? 'bg-white dark:bg-slate-900 shadow' : ''}`}
          >
            <SunIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button
            onClick={() => setPreviewTheme('dark')}
            className={`p-2 rounded-full transition-colors ${previewTheme === 'dark' ? 'bg-white dark:bg-slate-900 shadow' : ''}`}
          >
            <MoonIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
        <PreviewCard theme={selectedThemeData} globalTypography={brandingData.globalTypography} />
      </div>
    </div>
  );
}
   