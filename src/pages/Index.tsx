
import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { CalculatorCard } from '@/components/CalculatorCard';
import { ResultDisplay } from '@/components/ResultDisplay';
import { RecentCalculations } from '@/components/RecentCalculations';
import { AdBanner } from '@/components/AdBanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface CalculationResult {
  type: string;
  inputs: Record<string, number>;
  result: number;
  formula: string;
  explanation: string;
}

const CalculatorApp = () => {
  const { t } = useLanguage();
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isDark, setIsDark] = useState(false);

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

  const handleCalculate = (calculationResult: CalculationResult) => {
    setResult(calculationResult);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div> {/* Spacer */}
            <div className="flex items-center gap-4">
              <LanguageToggle />
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

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Calculator Section */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="percentOf" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="percentOf" className="text-xs">{t('percentOf')}</TabsTrigger>
                <TabsTrigger value="whatPercent" className="text-xs">{t('whatPercent')}</TabsTrigger>
              </TabsList>
              
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="percentIncrease" className="text-xs">{t('percentIncrease')}</TabsTrigger>
                <TabsTrigger value="percentDifference" className="text-xs">{t('percentDifference')}</TabsTrigger>
                <TabsTrigger value="valueFromPercent" className="text-xs">{t('valueFromPercent')}</TabsTrigger>
              </TabsList>

              <TabsContent value="percentOf">
                <CalculatorCard type="percentOf" onCalculate={handleCalculate} />
              </TabsContent>
              
              <TabsContent value="whatPercent">
                <CalculatorCard type="whatPercent" onCalculate={handleCalculate} />
              </TabsContent>
              
              <TabsContent value="percentIncrease">
                <CalculatorCard type="percentIncrease" onCalculate={handleCalculate} />
              </TabsContent>
              
              <TabsContent value="percentDifference">
                <CalculatorCard type="percentDifference" onCalculate={handleCalculate} />
              </TabsContent>
              
              <TabsContent value="valueFromPercent">
                <CalculatorCard type="valueFromPercent" onCalculate={handleCalculate} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <ResultDisplay result={result} />
            <AdBanner />
          </div>

          {/* History Section */}
          <div className="lg:col-span-2 xl:col-span-1">
            <RecentCalculations latestResult={result} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          <p>{t('appTitle')} © 2024</p>
          <p className="mt-2">{t('metaDescription')}</p>
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
