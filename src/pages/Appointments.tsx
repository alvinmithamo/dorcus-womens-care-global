import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/components/LocationProvider";
import LocationSelector from "@/components/LocationSelector";
import {
  Clock,
  MapPin,
  Phone,
  CreditCard,
  CheckCircle,
  Info,
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Add TypeScript interface for LeadConnector
declare global {
  interface Window {
    LeadConnector?: {
      showForm?: (formId: string) => void;
    };
  }
}

const Appointments = () => {
  const { country, isLoading } = useLocation();
  const [expandedForms, setExpandedForms] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Load GHL form script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleForm = (formKey: string) => {
    setExpandedForms(prev => ({
      ...prev,
      [formKey]: !prev[formKey]
    }));
  };

  const ExpandableForm = ({
    title,
    description,
    formKey,
    formId,
    formName,
    height,
    children
  }: {
    title: string;
    description: string;
    formKey: string;
    formId: string;
    formName?: string;
    height: string;
    children?: React.ReactNode;
  }) => {
    const isExpanded = expandedForms[formKey] || false;

    return (
      <Card className="card-medical">
        <CardHeader>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleForm(formKey)}
          >
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {isExpanded ? 'Click to Collapse' : 'Click to Expand'}
              </Badge>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-primary transition-transform" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary transition-transform" />
              )}
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0">
            <div className="rounded-lg overflow-hidden border border-border">
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
                style={{ width: "100%", height: height, border: "none", borderRadius: "3px" }}
                id={`inline-${formId}`}
                // sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={formName || title}
                data-height={height}
                data-layout-iframe-id={`inline-${formId}`}
                data-form-id={formId}
                title={formName || title}
              />
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  const consultationTypes = {
    Kenya: [
      {
        type: "Appointment Booking",
        duration: "45 minutes",
        // price: "KES 8,000",
        description: "Schedule a comprehensive women's health consultation with Dr. Dorcus for personalized medical care and treatment",
        formId: "QVFD1h4UYg5DoTUidM9J",
        formName: "Consultation Appointment booking Form  - New Website",
      },
      {
        type: "Public Speaking Booking",
        duration: "60 minutes",
        // price: "KES 12,000",
        description: "Book Dr. Dorcus for speaking engagements, workshops, or educational events on women's health and wellness topics",
        formId: "Zm6pM49oNBw5TcB21Pt7",
      },
    ],
    UK: [
      {
        type: "Appointment Booking",
        duration: "45 minutes",
        // price: "£180",
        description: "Schedule a comprehensive women's health consultation with Dr. Dorcus for personalized medical care and treatment",
        formId: "QVFD1h4UYg5DoTUidM9J",
        formName: "Consultation Appointment booking Form  - New Website",
      },
      {
        type: "Public Speaking Booking",
        duration: "60 minutes",
        // price: "£250",
        description: "Book Dr. Dorcus for speaking engagements, workshops, or educational events on women's health and wellness topics",
        formId: "Zm6pM49oNBw5TcB21Pt7",
      },
    ],
  };

  const appointmentInfo = {
    Kenya: {
      location: "Nairobi Women's Hospital",
      address: "Adams Arcade, Ngong Road, Nairobi",
      phone: "+254 720 996444",
      hours: "Mon–Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 2:00 PM",
      paymentMethods: [
        "Cash",
        "M-Pesa",
        "Bank Transfer",
        "Insurance (SHA, Private)",
      ],
    },
    UK: {
      location: "London Women's Clinic",
      address: "123 Harley Street, London W1G 6BA",
      phone: "+44 20 7123 4567",
      hours: "Mon–Fri: 9:00 AM – 5:00 PM\nSat: 10:00 AM – 2:00 PM",
      paymentMethods: [
        "Credit/Debit Card",
        "Bank Transfer"
      ],
    },
  };

  const preparationTips = [
    "Bring a list of current medications and supplements",
    "Note down your questions and concerns beforehand",
    "Bring your medical history and previous test results",
    "Arrive 15 minutes early for registration",
    "Wear comfortable, loose-fitting clothing",
    "Bring a support person if desired",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 lg:py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading appointment information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="heading-primary mb-6">
            Book Your <span className="text-medical-accent">Appointment</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Schedule your consultation with Dr. Dorcus for personalized women's
            health care. Choose your preferred location and find the appointment
            type that suits your needs.
          </p>
        </section>

        {/* Location Selection */}
        {!country && (
          <section className="mb-16">
            <LocationSelector />
          </section>
        )}

        {country && (
          <>
            {/* Consultation Types */}
            <section className="mb-16">
              <h2 className="heading-secondary text-center mb-12">
                Consultation Options – {country}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {consultationTypes[country].map((consultation, index) => (
                  <ExpandableForm
                    key={index}
                    title={consultation.type}
                    description={consultation.description}
                    formKey={`form-${index}`}
                    formId={consultation.formId}
                    formName={consultation.formName}
                    height={consultation.type.includes("Appointment") ? "1227px" : "1656px"}
                  />
                ))}
              </div>
            </section>

            {/* Clinic Information */}
            <section className="mb-16">
              <h2 className="heading-secondary text-center mb-12">
                Clinic Information – {country}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-medical">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Location & Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        {appointmentInfo[country].location}
                      </h4>
                      <p className="text-muted-foreground">
                        {appointmentInfo[country].address}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Operating Hours
                      </h4>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {appointmentInfo[country].hours}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Contact
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                          {appointmentInfo[country].phone}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-medical">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span>Payment Methods</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {appointmentInfo[country].paymentMethods.map(
                        (method, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="h-4 w-4 text-accent-green" />
                            <span className="text-muted-foreground">
                              {method}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                    <div className="mt-6 p-4 bg-accent-green-light rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-accent-green mt-0.5" />
                        <div>
                          <h5 className="font-medium text-foreground mb-1">
                            Payment Policy
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Payment is required at the time of service. We
                            accept various payment methods for your convenience.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Preparation Tips */}
            {/* <section className="mb-16">
              <Card className="card-medical bg-gradient-soft">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span>Prepare for Your Visit</span>
                  </CardTitle>
                  <CardDescription>
                    Tips to help you make the most of your consultation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {preparationTips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-accent-green mt-1 shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section> */}

            {/* Emergency Notice */}
            {/* <section>
              <Card className="card-medical border-yellow-200 bg-yellow-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        Emergency Situations
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        For urgent medical concerns that cannot wait for a
                        scheduled appointment, please contact our emergency line
                        or visit the nearest emergency department.
                      </p>
                      <span className="text-sm font-medium text-foreground">
                        Emergency Contact: {appointmentInfo[country].phone}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section> */}
          </>
        )}
      </div>

          </div>
  );
};

export default Appointments;



















