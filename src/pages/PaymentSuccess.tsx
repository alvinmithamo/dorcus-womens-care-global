import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock, Mail, Phone } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    // Parse booking details from URL parameters
    const details = {
      appointmentType: searchParams.get("appointmentType") || "Consultation",
      date: searchParams.get("date") || "",
      time: searchParams.get("time") || "",
      amount: searchParams.get("amount") || "",
      currency: searchParams.get("currency") || "KES",
      email: searchParams.get("email") || "",
      phone: searchParams.get("phone") || "",
    };
    setBookingDetails(details);
  }, [searchParams]);

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="mb-8 border-green-200 bg-green-50/50">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-900">Payment Successful!</CardTitle>
              <CardDescription className="text-green-700">
                Your appointment has been confirmed
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Booking Confirmation */}
          {bookingDetails && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Booking Confirmation</CardTitle>
                <CardDescription>
                  Here are the details of your confirmed appointment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Service Type</span>
                  <span className="font-medium">{bookingDetails.appointmentType}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{bookingDetails.date}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{bookingDetails.time}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-medium text-green-600">
                    {bookingDetails.currency} {bookingDetails.amount}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to your email address with all the details.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Reminder Notification</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a reminder before your appointment.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Arrival Instructions</p>
                  <p className="text-sm text-muted-foreground">
                    Please arrive 15 minutes early for registration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" onClick={() => navigate("/")}>
              Return to Home
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>

          {/* Need to Reschedule */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need to reschedule or cancel your appointment?
            </p>
            <Button variant="link" asChild>
              <a href="/contact">Contact our support team</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
