import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Clock,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://dorcus-womens-care-global.onrender.com";

interface ServicePackage {
  id: string;
  name: string;
  amount: number;
  currency: string;
  durationMinutes: number;
}

interface BookingDetails {
  appointmentType: string;
  date: string;
  time: string;
  email: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  contactId?: string;
  city?: string;
  country?: string;
  service?: String;
}

const hasUnresolvedPlaceholder = (value?: string | String) => {
  const normalizedValue = String(value || "").trim();
  return normalizedValue.startsWith("{") && normalizedValue.endsWith("}");
};

const normalizeServiceValue = (value?: string | String) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === selectedPackageId),
    [packages, selectedPackageId]
  );

  useEffect(() => {
    const details: BookingDetails = {
      appointmentType: searchParams.get("appointmentType") || "Consultation",
      date: searchParams.get("date") || "",
      time: searchParams.get("time") || "",
      email: searchParams.get("email") || "",
      phone: searchParams.get("phone") || "",
      first_name: searchParams.get("first_name") || "",
      last_name: searchParams.get("last_name") || "",
      contactId: searchParams.get("contactId") || searchParams.get("contactid") || "",
      city: searchParams.get("city") || "",
      country: searchParams.get("country") || "",
      service: searchParams.get("service") || "",
    };

    if (!details.email) {
      setError("Missing required contact information. Please try booking again.");
    } else if ([details.email, details.phone, details.first_name, details.last_name].some(hasUnresolvedPlaceholder)) {
      setError("GHL is still sending placeholder values instead of real contact details. Please update the form redirect URL to use the exact field keys from your GHL form.");
    } else {
      setBookingDetails(details);
      setSelectedDate(hasUnresolvedPlaceholder(details.date) ? "" : details.date);
      setSelectedTime(hasUnresolvedPlaceholder(details.time) ? "" : details.time);
    }
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    const loadPackages = async () => {
      if (!bookingDetails) {
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/packages`);

        if (!response.ok) {
          throw new Error("Unable to load packages");
        }

        const data = await response.json();
        setPackages(data);
        const normalizedService = normalizeServiceValue(bookingDetails.service || bookingDetails.appointmentType || "Appointment Booking");
        const matchedPackage = data.find((item: ServicePackage) =>
          normalizeServiceValue(item.name).includes(normalizedService) ||
          normalizedService.includes(normalizeServiceValue(item.name))
        );
        setSelectedPackageId(matchedPackage?.id || data[0]?.id || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load packages");
      }
    };

    loadPackages();
  }, [bookingDetails]);

  const initiatePayment = async () => {
    if (!bookingDetails || !selectedPackage) return;

    if (!selectedDate || !selectedTime) {
      setError("Please select your preferred appointment date and time before payment.");
      return;
    }

    setPaymentLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          first_name: bookingDetails.first_name,
          last_name: bookingDetails.last_name,
          name: [bookingDetails.first_name, bookingDetails.last_name].filter(Boolean).join(" "),
          date: selectedDate,
          time: selectedTime,
          contactId: bookingDetails.contactId,

          metadata: {
            appointmentType: bookingDetails.appointmentType,
            source: "ghl_form_redirect",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await response.json();

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else if (data.paymentId) {
        console.log("Payment ID:", data.paymentId);
      } else {
        throw new Error("Invalid payment response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment initiation failed");
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 lg:py-24 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error && !bookingDetails) {
    return (
      <div className="min-h-screen py-16 lg:py-24 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Booking Information Missing</CardTitle>
            <CardDescription>
              {error}. Please return to the appointments page and try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <a href="/book-appointment">Return to Appointments</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-primary mb-4">Complete Your Booking</h1>
            <p className="text-muted-foreground">
              Choose your service package, then pay securely to confirm your appointment
            </p>
          </div>

          {bookingDetails && (
            <>
              {/* Booking Summary */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Appointment Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Service Type</span>
                    <span className="font-medium">{bookingDetails.service || bookingDetails.appointmentType || "Appointment Booking"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{bookingDetails.email}</span>
                  </div>
                  {bookingDetails.phone && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium">{bookingDetails.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Choose Appointment Slot</span>
                  </CardTitle>
                  <CardDescription>
                    Select your preferred appointment date and time before payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-date">Preferred Date</Label>
                    <Input
                      id="appointment-date"
                      type="date"
                      value={selectedDate}
                      onChange={(event) => setSelectedDate(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-time">Preferred Time</Label>
                    <Input
                      id="appointment-time"
                      type="time"
                      value={selectedTime}
                      onChange={(event) => setSelectedTime(event.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Choose Package</CardTitle>
                  <CardDescription>
                    Your appointment is only booked after PesaSwap confirms payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {packages.map((servicePackage) => (
                    <button
                      key={servicePackage.id}
                      type="button"
                      onClick={() => setSelectedPackageId(servicePackage.id)}
                      className={`w-full rounded-lg border p-4 text-left transition-colors ${
                        selectedPackageId === servicePackage.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{servicePackage.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {servicePackage.durationMinutes} minutes
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {servicePackage.currency} {servicePackage.amount.toLocaleString()}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Payment Method</span>
                  </CardTitle>
                  <CardDescription>
                    Secure payment powered by Pesaswap
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-accent-green" />
                      <span className="font-medium">M-PESA</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pay securely using your M-PESA mobile wallet
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-accent-green" />
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pay directly from your bank account
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Error Message */}
              {error && (
                <Card className="mb-6 border-destructive">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Payment Error</p>
                        <p className="text-sm text-muted-foreground">{error}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Button */}
              <Button
                className="w-full btn-medical h-12 text-lg"
                onClick={initiatePayment}
                disabled={paymentLoading || !selectedPackage}
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay {selectedPackage ? `${selectedPackage.currency} ${selectedPackage.amount.toLocaleString()}` : ""}
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                By proceeding, you agree to our{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/cookie-policy" className="text-primary hover:underline">
                  Terms of Service
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
