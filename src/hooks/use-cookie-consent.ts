import { useState, useEffect } from 'react';

export type CookieCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
  consentDate?: string;
}

const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  hasConsented: false,
};

const STORAGE_KEY = 'cookie-consent';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load consent from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setConsent(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading cookie consent:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent: CookieConsent = {
      ...consent,
      ...newConsent,
      hasConsented: true,
      consentDate: new Date().toISOString(),
    };

    setConsent(updatedConsent);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConsent));
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }

    return updatedConsent;
  };

  const acceptAll = () => {
    return updateConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    return updateConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const acceptSelected = (categories: CookieCategory[]) => {
    const newConsent: CookieConsent = {
      necessary: true,
      functional: categories.includes('functional'),
      analytics: categories.includes('analytics'),
      marketing: categories.includes('marketing'),
      hasConsented: false,
    };
    return updateConsent(newConsent);
  };

  const resetConsent = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error removing cookie consent:', error);
    }
    setConsent(DEFAULT_CONSENT);
  };

  const hasCategoryConsent = (category: CookieCategory) => {
    return consent[category];
  };

  return {
    consent,
    isLoading,
    acceptAll,
    rejectAll,
    acceptSelected,
    resetConsent,
    hasCategoryConsent,
    updateConsent,
  };
};
