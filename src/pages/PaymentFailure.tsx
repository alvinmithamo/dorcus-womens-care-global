import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Phone } from "lucide-react";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Failure Message */}
          <Card className="mb-8 border-red-200 bg-red-50/50">
            <CardHeader className="text-center">
              <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-red-900">Payment Failed</CardTitle>
              <CardDescription className="text-red-700">
                We couldn't process your payment
              </CardDescription>
            </CardHeader>
          </Card>

          {/* What Happened */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What Happened?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Your payment could not be processed. This could be due to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Insufficient funds in your M-PESA account</li>
                <li>Network connectivity issues</li>
                <li>Payment method verification failed</li>
                <li>Transaction timeout</li>
              </ul>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What You Can Do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Try Again</p>
                  <p className="text-sm text-muted-foreground">
                    You can retry the payment by clicking the button below.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Contact Support</p>
                  <p className="text-sm text-muted-foreground">
                    If the problem persists, please contact our support team for assistance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" onClick={() => navigate(-1)}>
              Try Payment Again
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href="/book-appointment">Book New Appointment</a>
            </Button>
          </div>

          {/* Contact Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need help with your payment?
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

export default PaymentFailure;
