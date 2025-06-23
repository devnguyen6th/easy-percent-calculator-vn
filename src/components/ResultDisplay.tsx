
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface CalculationResult {
  type: string;
  inputs: Record<string, number>;
  result: number;
  formula: string;
  explanation: string;
}

interface ResultDisplayProps {
  result: CalculationResult | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const { t, language } = useLanguage();

  const speakResult = () => {
    if (result && 'speechSynthesis' in window) {
      const text = `${t('result')}: ${result.result.toLocaleString()}. ${result.explanation}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'vi' ? 'vi-VN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  if (!result) {
    return (
      <Card className="w-full max-w-md mx-auto opacity-50">
        <CardHeader>
          <CardTitle>{t('result')}</CardTitle>
          <CardDescription>{t('noRecentCalculations')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-16 flex items-center justify-center text-muted-foreground">
            {t('calculate').toLowerCase()}...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-800 dark:text-green-200">{t('result')}</CardTitle>
          <Button variant="ghost" size="sm" onClick={speakResult}>
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          <Badge variant="secondary">{result.type}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-800 dark:text-green-200">
            {result.result.toLocaleString(undefined, { 
              maximumFractionDigits: 2,
              minimumFractionDigits: 0
            })}
          </div>
          {result.type.includes('%') && <span className="text-xl text-green-600">%</span>}
        </div>
        
        <div className="space-y-2">
          <div className="text-sm">
            <strong>{t('formula')}:</strong>
            <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded border mt-1">
              {result.formula}
            </div>
          </div>
          
          <div className="text-sm">
            <strong>{t('explanation')}:</strong>
            <div className="text-muted-foreground mt-1">
              {result.explanation}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
