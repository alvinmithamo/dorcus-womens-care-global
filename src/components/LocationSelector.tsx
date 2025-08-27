import React from 'react';
import { useLocation } from '@/components/LocationProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationSelectorProps {
  showTitle?: boolean;
  className?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  showTitle = true, 
  className = "" 
}) => {
  const { country, isLoading, setCountry } = useLocation();

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Detecting your location...</span>
      </div>
    );
  }

  return (
    <Card className={`card-medical ${className}`}>
      <CardHeader className="text-center">
        {showTitle && (
          <>
            <CardTitle className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Select Your Location</span>
            </CardTitle>
            <CardDescription>
              Choose your location to see relevant pricing and booking options
            </CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={country === 'Kenya' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setCountry('Kenya')}
            className={`h-20 flex flex-col items-center space-y-2 ${
              country === 'Kenya' ? 'btn-medical' : ''
            }`}
          >
            <div className="text-2xl">🇰🇪</div>
            <div className="text-sm font-medium">Kenya Practice</div>
            <div className="text-xs text-muted-foreground">Nairobi</div>
          </Button>
          
          <Button
            variant={country === 'UK' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setCountry('UK')}
            className={`h-20 flex flex-col items-center space-y-2 ${
              country === 'UK' ? 'btn-medical' : ''
            }`}
          >
            <div className="text-2xl">🇬🇧</div>
            <div className="text-sm font-medium">UK Practice</div>
            <div className="text-xs text-muted-foreground">London</div>
          </Button>
        </div>
        
        {country && (
          <div className="mt-4 p-4 bg-primary-soft rounded-lg text-center">
            <p className="text-sm text-primary font-medium">
              Currently viewing: {country} practice information
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSelector;