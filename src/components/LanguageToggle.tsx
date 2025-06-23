
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';

export const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">{t('language')}:</span>
      <Button
        variant={language === 'vi' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('vi')}
        className="text-xs"
      >
        VI
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="text-xs"
      >
        EN
      </Button>
    </div>
  );
};
