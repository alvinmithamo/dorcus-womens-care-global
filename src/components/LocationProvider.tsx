import React, { createContext, useContext, useEffect, useState } from 'react';

interface LocationContextType {
  country: 'Kenya' | 'UK' | null;
  isLoading: boolean;
  setCountry: (country: 'Kenya' | 'UK') => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: React.ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [country, setCountryState] = useState<'Kenya' | 'UK' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setCountry = (newCountry: 'Kenya' | 'UK') => {
    setCountryState(newCountry);
    localStorage.setItem('preferredCountry', newCountry);
  };

  useEffect(() => {
    // Check if user has previously selected a country
    const savedCountry = localStorage.getItem('preferredCountry') as 'Kenya' | 'UK' | null;
    
    if (savedCountry) {
      setCountryState(savedCountry);
      setIsLoading(false);
      return;
    }

    // Simple geolocation detection
    // In a real app, you'd use a service like ipapi.co or similar
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const detectedCountry = data.country_code === 'KE' ? 'Kenya' : 'UK';
        setCountryState(detectedCountry);
        setIsLoading(false);
      })
      .catch(() => {
        // Default to Kenya if detection fails
        setCountryState('Kenya');
        setIsLoading(false);
      });
  }, []);

  return (
    <LocationContext.Provider value={{ country, isLoading, setCountry }}>
      {children}
    </LocationContext.Provider>
  );
};