import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { toast } from '@/hooks/use-toast';

interface CalculatorCardProps {
  type: 'percentOf' | 'whatPercent' | 'percentIncrease' | 'percentDifference' | 'valueFromPercent';
  onCalculate: (result: CalculationResult) => void;
  voiceEnabled: boolean;
}

interface CalculationResult {
  type: string;
  inputs: Record<string, number>;
  result: number;
  formula: string;
  explanation: string;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ type, onCalculate, voiceEnabled }) => {
  const { t, language } = useLanguage();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const speakResult = (text: string) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'vi' ? 'vi-VN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const validateInputs = (values: Record<string, number>): boolean => {
    for (const [key, value] of Object.entries(values)) {
      if (isNaN(value) || !isFinite(value)) {
        toast({
          title: t('errorInvalidNumber'),
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const calculate = async () => {
    setIsCalculating(true);
    
    // Small delay for loading animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const values = Object.fromEntries(
        Object.entries(inputs).map(([key, value]) => [key, parseFloat(value) || 0])
      );

      if (!validateInputs(values)) {
        setIsCalculating(false);
        return;
      }

      let result: number;
      let formula: string;
      let explanation: string;

      switch (type) {
        case 'percentOf':
          if (!values.percentage || !values.value) {
            toast({ title: t('errorInvalidNumber'), variant: "destructive" });
            setIsCalculating(false);
            return;
          }
          result = (values.percentage / 100) * values.value;
          formula = t('formulaPercentOf');
          explanation = `${values.percentage}% ${t('percentOf').toLowerCase()} ${values.value} = ${result}`;
          break;

        case 'whatPercent':
          if (!values.partValue || !values.totalValue || values.totalValue === 0) {
            toast({ title: values.totalValue === 0 ? t('errorDivisionByZero') : t('errorInvalidNumber'), variant: "destructive" });
            setIsCalculating(false);
            return;
          }
          result = (values.partValue / values.totalValue) * 100;
          formula = t('formulaWhatPercent');
          explanation = `${values.partValue} ${t('whatPercent').toLowerCase()} ${values.totalValue} = ${result.toFixed(2)}%`;
          break;

        case 'percentIncrease':
          if (!values.originalValue || !values.percentage) {
            toast({ title: t('errorInvalidNumber'), variant: "destructive" });
            setIsCalculating(false);
            return;
          }
          const isIncrease = values.percentage > 0;
          result = values.originalValue * (1 + values.percentage / 100);
          formula = isIncrease ? t('formulaIncrease') : t('formulaDecrease');
          explanation = `${values.originalValue} ${isIncrease ? '+' : ''}${values.percentage}% = ${result}`;
          break;

        case 'percentDifference':
          if (!values.firstValue || !values.secondValue || values.firstValue === 0) {
            toast({ title: values.firstValue === 0 ? t('errorDivisionByZero') : t('errorInvalidNumber'), variant: "destructive" });
            setIsCalculating(false);
            return;
          }
          result = Math.abs((values.secondValue - values.firstValue) / values.firstValue) * 100;
          formula = t('formulaDifference');
          explanation = `${t('percentDifference')}: ${values.firstValue} → ${values.secondValue} = ${result.toFixed(2)}%`;
          break;

        case 'valueFromPercent':
          if (!values.percentage || !values.totalValue) {
            toast({ title: t('errorInvalidNumber'), variant: "destructive" });
            setIsCalculating(false);
            return;
          }
          result = (values.percentage / 100) * values.totalValue;
          formula = t('formulaValueFrom');
          explanation = `${values.percentage}% ${t('valueFromPercent').toLowerCase()} ${values.totalValue} = ${result}`;
          break;

        default:
          setIsCalculating(false);
          return;
      }

      const calculationResult: CalculationResult = {
        type: t(type),
        inputs: values,
        result,
        formula,
        explanation
      };

      onCalculate(calculationResult);
      
      // Speak result if voice is enabled
      if (voiceEnabled) {
        speakResult(`${t('result')}: ${result.toLocaleString()}. ${explanation}`);
      }
      
      toast({
        title: t('result'),
        description: `${result.toLocaleString()} - ${explanation}`,
      });

    } catch (error) {
      toast({
        title: t('errorInvalidNumber'),
        variant: "destructive"
      });
    }
    
    setIsCalculating(false);
  };

  const clear = () => {
    setInputs({});
  };

  const renderInputs = () => {
    switch (type) {
      case 'percentOf':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="percentage">{t('percentage')} (%)</Label>
              <Input
                id="percentage"
                type="number"
                value={inputs.percentage || ''}
                onChange={(e) => handleInputChange('percentage', e.target.value)}
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">{t('value')}</Label>
              <Input
                id="value"
                type="number"
                value={inputs.value || ''}
                onChange={(e) => handleInputChange('value', e.target.value)}
                placeholder="200"
              />
            </div>
          </>
        );

      case 'whatPercent':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="partValue">{t('partValue')}</Label>
              <Input
                id="partValue"
                type="number"
                value={inputs.partValue || ''}
                onChange={(e) => handleInputChange('partValue', e.target.value)}
                placeholder="50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalValue">{t('totalValue')}</Label>
              <Input
                id="totalValue"
                type="number"
                value={inputs.totalValue || ''}
                onChange={(e) => handleInputChange('totalValue', e.target.value)}
                placeholder="200"
              />
            </div>
          </>
        );

      case 'percentIncrease':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="originalValue">{t('originalValue')}</Label>
              <Input
                id="originalValue"
                type="number"
                value={inputs.originalValue || ''}
                onChange={(e) => handleInputChange('originalValue', e.target.value)}
                placeholder="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">{t('percentage')} (% +/-)</Label>
              <Input
                id="percentage"
                type="number"
                value={inputs.percentage || ''}
                onChange={(e) => handleInputChange('percentage', e.target.value)}
                placeholder="15"
              />
            </div>
          </>
        );

      case 'percentDifference':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="firstValue">{t('firstValue')}</Label>
              <Input
                id="firstValue"
                type="number"
                value={inputs.firstValue || ''}
                onChange={(e) => handleInputChange('firstValue', e.target.value)}
                placeholder="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondValue">{t('secondValue')}</Label>
              <Input
                id="secondValue"
                type="number"
                value={inputs.secondValue || ''}
                onChange={(e) => handleInputChange('secondValue', e.target.value)}
                placeholder="120"
              />
            </div>
          </>
        );

      case 'valueFromPercent':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="percentage">{t('percentage')} (%)</Label>
              <Input
                id="percentage"
                type="number"
                value={inputs.percentage || ''}
                onChange={(e) => handleInputChange('percentage', e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalValue">{t('totalValue')}</Label>
              <Input
                id="totalValue"
                type="number"
                value={inputs.totalValue || ''}
                onChange={(e) => handleInputChange('totalValue', e.target.value)}
                placeholder="500"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          {t(type)}
        </CardTitle>
        <CardDescription>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {t('formula')}: {showFormula ? t(`formula${type.charAt(0).toUpperCase() + type.slice(1)}` as any) : '...'}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowFormula(!showFormula)}
              className="text-xs"
            >
              {showFormula ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {showFormula ? 'Hide' : 'Show'} Formula
            </Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderInputs()}
        
        <div className="flex gap-2">
          <Button 
            onClick={calculate} 
            disabled={isCalculating}
            className="flex-1"
          >
            {isCalculating ? "..." : t('calculate')}
          </Button>
          <Button variant="outline" onClick={clear}>
            {t('clear')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
