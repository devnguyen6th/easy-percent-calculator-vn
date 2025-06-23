
import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { CalculatorCard } from '@/components/CalculatorCard';
import { ResultDisplay } from '@/components/ResultDisplay';
import { RecentCalculations } from '@/components/RecentCalculations';
import { AdBanner } from '@/components/AdBanner';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface CalculationResult {
  type: string;
  inputs: Record<string, number>;
  result: number;
  formula: string;
  explanation: string;
  timestamp: number;
}

const CalculatorApp = () => {
  const { t } = useLanguage();
  const [results, setResults] = useState<Record<string, CalculationResult | null>>({
    percentOf: null,
    whatPercent: null,
    percentIncrease: null,
    percentDifference: null,
    valueFromPercent: null
  });
  const [isDark, setIsDark] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = saved === 'dark' || (!saved && prefersDark);
    
    setIsDark(useDark);
    if (useDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleCalculate = (type: string, calculationResult: Omit<CalculationResult, 'timestamp'>) => {
    const resultWithTimestamp = { ...calculationResult, timestamp: Date.now() };
    setResults(prev => ({ ...prev, [type]: resultWithTimestamp }));
  };

  const getLatestResult = (): CalculationResult | null => {
    const allResults = Object.values(results).filter(Boolean) as CalculationResult[];
    if (allResults.length === 0) return null;
    return allResults.reduce((latest, current) => 
      current.timestamp > latest.timestamp ? current : latest
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div> {/* Spacer */}
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={voiceEnabled ? 'bg-green-100 dark:bg-green-900' : ''}
              >
                🔊 {voiceEnabled ? 'ON' : 'OFF'}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            {t('appTitle')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('appSubtitle')}
          </p>
        </div>

        {/* Ad Banner - Header */}
        <div className="mb-8">
          <AdBanner />
        </div>

        {/* Calculator Sections */}
        <div className="space-y-12">
          {/* Section 1: Calculate X% of Y */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">{t('percentOf')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <CalculatorCard 
                type="percentOf" 
                onCalculate={(result) => handleCalculate('percentOf', result)}
                voiceEnabled={voiceEnabled}
              />
              <ResultDisplay result={results.percentOf} voiceEnabled={voiceEnabled} />
            </div>
            <AdBanner />
          </section>

          {/* Section 2: Find what percent Y is of X */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">{t('whatPercent')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <CalculatorCard 
                type="whatPercent" 
                onCalculate={(result) => handleCalculate('whatPercent', result)}
                voiceEnabled={voiceEnabled}
              />
              <ResultDisplay result={results.whatPercent} voiceEnabled={voiceEnabled} />
            </div>
            <AdBanner />
          </section>

          {/* Section 3: Increase/Decrease a number by X% */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">{t('percentIncrease')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <CalculatorCard 
                type="percentIncrease" 
                onCalculate={(result) => handleCalculate('percentIncrease', result)}
                voiceEnabled={voiceEnabled}
              />
              <ResultDisplay result={results.percentIncrease} voiceEnabled={voiceEnabled} />
            </div>
            <AdBanner />
          </section>

          {/* Section 4: Calculate percent change between two numbers */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">{t('percentDifference')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <CalculatorCard 
                type="percentDifference" 
                onCalculate={(result) => handleCalculate('percentDifference', result)}
                voiceEnabled={voiceEnabled}
              />
              <ResultDisplay result={results.percentDifference} voiceEnabled={voiceEnabled} />
            </div>
            <AdBanner />
          </section>

          {/* Section 5: Find original number given X% equals Y */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">{t('valueFromPercent')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <CalculatorCard 
                type="valueFromPercent" 
                onCalculate={(result) => handleCalculate('valueFromPercent', result)}
                voiceEnabled={voiceEnabled}
              />
              <ResultDisplay result={results.valueFromPercent} voiceEnabled={voiceEnabled} />
            </div>
            <AdBanner />
          </section>

          {/* Section 6: Recent calculation history */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">{t('recentCalculations')}</h2>
            <div className="flex justify-center">
              <RecentCalculations latestResult={getLatestResult()} />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          <AdBanner />
          <div className="mt-4">
            <p>{t('appTitle')} © 2024</p>
            <p className="mt-2">{t('metaDescription')}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <CalculatorApp />
    </LanguageProvider>
  );
};

export default Index;
