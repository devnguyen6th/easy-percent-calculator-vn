
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, History } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface CalculationResult {
  type: string;
  inputs: Record<string, number>;
  result: number;
  formula: string;
  explanation: string;
  timestamp: number;
}

interface RecentCalculationsProps {
  latestResult: CalculationResult | null;
}

export const RecentCalculations: React.FC<RecentCalculationsProps> = ({ latestResult }) => {
  const { t } = useLanguage();
  const [calculations, setCalculations] = useState<CalculationResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentCalculations');
    if (saved) {
      try {
        setCalculations(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent calculations:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (latestResult) {
      const newCalculation = { ...latestResult, timestamp: Date.now() };
      const updated = [newCalculation, ...calculations.slice(0, 9)]; // Keep only 10 most recent
      setCalculations(updated);
      localStorage.setItem('recentCalculations', JSON.stringify(updated));
    }
  }, [latestResult]);

  const clearHistory = () => {
    setCalculations([]);
    localStorage.removeItem('recentCalculations');
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (calculations.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {t('recentCalculations')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            {t('noRecentCalculations')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {t('recentCalculations')}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearHistory}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          {calculations.length} {calculations.length === 1 ? 'calculation' : 'calculations'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {calculations.map((calc, index) => (
          <div key={index} className="border rounded-lg p-3 space-y-2 bg-muted/30">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {calc.type}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(calc.timestamp)}
              </span>
            </div>
            
            <div className="text-sm">
              <div className="font-semibold">
                {calc.result.toLocaleString(undefined, { 
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0
                })}
              </div>
              <div className="text-xs text-muted-foreground">
                {calc.explanation}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
