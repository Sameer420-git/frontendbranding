
import React, { useState, useCallback, useEffect } from 'react';
import { BrandingData } from './types';
import BrandingForm from './components/BrandingForm';
import LivePreview from './components/LivePreview';
import ThemeToggle from './components/ThemeToggle';
import { getBrandingSuggestion } from './services/geminiService';
import { SparklesIcon } from './components/icons';

const initialBrandingData: BrandingData = {
  projectName: "My Awesome Project",
  projectDescription: "A description of my awesome project.",
  brandName: "AwesomeBrand",
  lightTheme: {
    colors: {
      primary: "#6366f1",
      secondary: "#ec4899",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      background: "#f8fafc",
      text: "#0f172a",
    },
    typography: {
      primaryFont: "Inter",
      secondaryFont: "Lora",
    },
  },
  darkTheme: {
    colors: {
      primary: "#818cf8",
      secondary: "#f472b6",
      success: "#4ade80",
      warning: "#fbbf24",
      error: "#f87171",
      background: "#1e293b",
      text: "#f1f5f9",
    },
    typography: {
      primaryFont: "Inter",
      secondaryFont: "Lora",
    },
  },
  globalTypography: {
    fontWeight: "400",
    fontSize: "16px",
  },
};


export default function App() {
  const [appTheme, setAppTheme] = useState<'light' | 'dark'>('dark');
  const [brandingData, setBrandingData] = useState<BrandingData>(initialBrandingData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.className = appTheme;
  }, [appTheme]);

  const handleDataChange = useCallback((path: string, value: any) => {
    setBrandingData(prevData => {
      const keys = path.split('.');
      const newData = JSON.parse(JSON.stringify(prevData));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  }, []);
  
  const handleGenerateSuggestion = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const suggestion = await getBrandingSuggestion(prompt);
      if (suggestion) {
        setBrandingData(suggestion);
      } else {
        setError("Failed to get a valid suggestion from the AI. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-7 w-7 text-indigo-500" />
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AI Branding Studio</h1>
            </div>
            <ThemeToggle theme={appTheme} setTheme={setAppTheme} />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <BrandingForm 
              brandingData={brandingData}
              onDataChange={handleDataChange}
              onGenerateSuggestion={handleGenerateSuggestion}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <LivePreview brandingData={brandingData} />
          </div>
        </div>
      </main>
    </div>
  );
}
   