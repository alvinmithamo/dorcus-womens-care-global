import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCookieConsent, CookieCategory } from '@/hooks/use-cookie-consent';
import { Cookie, RefreshCw, CheckCircle, XCircle, Settings } from 'lucide-react';

const CookiePolicy = () => {
  const { consent, acceptAll, rejectAll, acceptSelected, resetConsent, hasCategoryConsent } = useCookieConsent();
  const [selectedCategories, setSelectedCategories] = useState<CookieCategory[]>([
    'necessary',
    consent.functional ? 'functional' : null,
    consent.analytics ? 'analytics' : null,
    consent.marketing ? 'marketing' : null,
  ].filter(Boolean) as CookieCategory[]);

  const cookieCategories = [
    {
      id: 'necessary' as CookieCategory,
      name: 'Necessary Cookies',
      description: 'Essential cookies that enable basic website functionality. Without these cookies, the website cannot function properly.',
      cookies: [
        { name: 'cookie-consent', purpose: 'Stores your cookie consent preferences', duration: '1 year' },
        { name: 'session', purpose: 'Maintains user session during website navigation', duration: 'Session' },
      ],
      required: true,
    },
    {
      id: 'functional' as CookieCategory,
      name: 'Functional Cookies',
      description: 'Cookies that enable enhanced functionality and personalization, such as remembering your location preference and form data.',
      cookies: [
        { name: 'user-location', purpose: 'Remembers your selected country/region for location-specific content', duration: '30 days' },
        { name: 'form-data', purpose: 'Remembers form data for convenience during booking', duration: 'Session' },
      ],
      required: false,
    },
    {
      id: 'analytics' as CookieCategory,
      name: 'Analytics Cookies',
      description: 'Cookies that help us understand how visitors use our website by collecting information about pages visited, time spent, and errors encountered.',
      cookies: [
        { name: '_ga', purpose: 'Google Analytics - Identifies unique users', duration: '2 years' },
        { name: '_gid', purpose: 'Google Analytics - Distinguishes users', duration: '24 hours' },
        { name: '_gat', purpose: 'Google Analytics - Throttles request rate', duration: '1 minute' },
      ],
      required: false,
    },
    {
      id: 'marketing' as CookieCategory,
      name: 'Marketing Cookies',
      description: 'Cookies used to deliver relevant advertisements and track marketing campaigns across different websites.',
      cookies: [
        { name: 'ad_storage', purpose: 'Enables ad-related storage', duration: 'Variable' },
        { name: 'ad_personalization', purpose: 'Enables ad personalization', duration: 'Variable' },
      ],
      required: false,
    },
  ];

  const handleCategoryToggle = (category: CookieCategory, checked: boolean) => {
    if (category === 'necessary') return;

    setSelectedCategories(prev =>
      checked
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
  };

  const handleSavePreferences = () => {
    acceptSelected(selectedCategories);
  };

  const handleResetConsent = () => {
    resetConsent();
    setSelectedCategories(['necessary']);
  };

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="heading-primary mb-4">Cookie Policy</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cookie className="h-5 w-5 text-primary" />
                <span>What Are Cookies?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Cookies are small text files that are stored on your device when you visit our website. 
                They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
              <p>
                This Cookie Policy explains the different types of cookies we use, why we use them, 
                and how you can control your cookie preferences in compliance with GDPR requirements.
              </p>
            </CardContent>
          </Card>

          {/* Current Consent Status */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Your Current Cookie Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cookieCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center space-x-2 p-3 rounded-lg border ${
                      hasCategoryConsent(category.id)
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    {hasCategoryConsent(category.id) ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <RefreshCw className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  You can update your preferences at any time using the controls below.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Categories */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cookie className="h-5 w-5 text-primary" />
                <span>Cookie Categories and Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {cookieCategories.map((category) => (
                <div key={category.id} className="space-y-4 p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={category.required || selectedCategories.includes(category.id)}
                        disabled={category.required}
                        onCheckedChange={(checked) => handleCategoryToggle(category.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`category-${category.id}`} className="font-semibold text-base flex items-center gap-2">
                          {category.name}
                          {category.required && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Required</span>
                          )}
                        </Label>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-7 space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Cookies in this category:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-3 font-medium">Cookie Name</th>
                            <th className="text-left py-2 px-3 font-medium">Purpose</th>
                            <th className="text-left py-2 px-3 font-medium">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.cookies.map((cookie, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-2 px-3 font-mono text-xs">{cookie.name}</td>
                              <td className="py-2 px-3 text-muted-foreground">{cookie.purpose}</td>
                              <td className="py-2 px-3 text-muted-foreground">{cookie.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* How We Use Cookies */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cookie className="h-5 w-5 text-primary" />
                <span>How We Use Cookies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>Necessary cookies:</strong> Ensure the website functions properly, including secure booking forms and session management
                </li>
                <li>
                  <strong>Functional cookies:</strong> Remember your preferences (like location) to provide a personalized experience
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us improve our website by understanding how visitors use it
                </li>
                <li>
                  <strong>Marketing cookies:</strong> Used to deliver relevant advertisements (only with your consent)
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Cookies */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cookie className="h-5 w-5 text-primary" />
                <span>Third-Party Cookies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We use the following third-party services that may set cookies on your device:
              </p>
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Google Analytics</h4>
                  <p className="text-sm">
                    Used for website analytics. You can opt out by visiting{' '}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      Google's opt-out page
                    </a>.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">LeadConnector</h4>
                  <p className="text-sm">
                    Used for appointment booking forms. Their privacy policy is available on their website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Managing Your Cookie Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                You have several options to manage cookies:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>Use our cookie consent banner:</strong> Accept or reject cookie categories when you first visit our site
                </li>
                <li>
                  <strong>Update preferences on this page:</strong> Use the controls above to change your settings at any time
                </li>
                <li>
                  <strong>Browser settings:</strong> Most browsers allow you to block or delete cookies through their settings
                </li>
                <li>
                  <strong>Reset consent:</strong> Click the button below to clear your consent and see the banner again
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handleResetConsent}
                  className="flex-1 sm:flex-none"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Consent
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1 sm:flex-none btn-medical"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Browser-Specific Instructions */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Browser-Specific Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="font-medium text-foreground">To manage cookies in your browser:</p>
              <div className="space-y-3 ml-4 text-sm">
                <div>
                  <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                </div>
                <div>
                  <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                </div>
                <div>
                  <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                </div>
                <div>
                  <strong>Edge:</strong> Settings → Cookies and site permissions → Manage cookies
                </div>
              </div>
              <p className="text-sm mt-4">
                <strong>Note:</strong> Disabling necessary cookies may prevent the website from functioning properly, 
                including the ability to book appointments.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Contact Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@dorcuswomenscare.com</p>
                <p><strong>Phone (Kenya):</strong> +254 720 996444</p>
                <p><strong>Phone (UK):</strong> +44 20 7123 4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
