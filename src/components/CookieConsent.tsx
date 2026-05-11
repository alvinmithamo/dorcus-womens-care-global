import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCookieConsent, CookieCategory } from '@/hooks/use-cookie-consent';
import { X, Cookie, ChevronDown, ChevronUp, Info } from 'lucide-react';

const CookieConsent = () => {
  const { consent, isLoading, acceptAll, rejectAll, acceptSelected, hasCategoryConsent } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CookieCategory[]>(['necessary']);

  if (isLoading || consent.hasConsented) {
    return null;
  }

  const cookieCategories = [
    {
      id: 'necessary' as CookieCategory,
      name: 'Necessary Cookies',
      description: 'Required for the website to function properly. Cannot be disabled.',
      required: true,
    },
    {
      id: 'functional' as CookieCategory,
      name: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization features.',
      required: false,
    },
    {
      id: 'analytics' as CookieCategory,
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website to improve performance.',
      required: false,
    },
    {
      id: 'marketing' as CookieCategory,
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track marketing campaigns.',
      required: false,
    },
  ];

  const handleCategoryToggle = (category: CookieCategory, checked: boolean) => {
    if (category === 'necessary') return; // Cannot toggle necessary cookies

    setSelectedCategories(prev =>
      checked
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
  };

  const handleAcceptSelected = () => {
    acceptSelected(selectedCategories);
  };

  const handleRejectAll = () => {
    rejectAll();
  };

  const handleAcceptAll = () => {
    acceptAll();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Cookie className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <CardTitle className="text-lg">Cookie Consent</CardTitle>
                <CardDescription className="text-sm">
                  We use cookies to enhance your experience and comply with GDPR regulations. 
                  Please choose which cookies you allow us to use.
                </CardDescription>
              </div>
            </div>
            {/* <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button> */}
          </div>
        </CardHeader>

        {showDetails && (
          <CardContent className="space-y-4 pt-0">
            <div className="space-y-3">
              {cookieCategories.map((category) => (
                <div key={category.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/50">
                  <Checkbox
                    id={category.id}
                    checked={category.required || selectedCategories.includes(category.id)}
                    disabled={category.required}
                    onCheckedChange={(checked) => handleCategoryToggle(category.id, checked as boolean)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor={category.id} className="font-medium flex items-center gap-2">
                      {category.name}
                      {category.required && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Required</span>
                      )}
                    </Label>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start space-x-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                You can change your cookie preferences at any time by visiting our Cookie Policy page.
                Your consent is valid for 12 months.
              </p>
            </div>
          </CardContent>
        )}

        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectAll}
              className="flex-1 sm:flex-none"
            >
              Reject All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAcceptSelected}
              className="flex-1 sm:flex-none"
            >
              Accept Selected
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none btn-medical"
            >
              Accept All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
