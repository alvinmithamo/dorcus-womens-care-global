import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Trash2, Mail, FileText, User } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="heading-primary mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Introduction</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Dr. Dorcus Wamaitha Muchiri ("we", "our", or "us") is committed to protecting your privacy and 
                ensuring the security of your personal data. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website and use our appointment booking services.
              </p>
              <p>
                We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws. 
                By using our website and services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Data Controller */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Data Controller</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p><strong>Data Controller:</strong> Dr. Dorcus Wamaitha Muchiri</p>
              <p><strong>Contact Email:</strong> info@drdorcusmuchiri.com</p>
              <p><strong>Practice Locations:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Nairobi Women's Hospital, Adams Arcade, Ngong Road, Nairobi, Kenya</li>
                <li>London Women's Clinic, 123 Harley Street, London W1G 6BA, United Kingdom</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Name and contact details (email, phone number)</li>
                  <li>Address and location information</li>
                  <li>Date of birth</li>
                  <li>Medical history and health-related information</li>
                  <li>Appointment preferences and booking details</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Technical Information</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Cookie Data</h3>
                <p>
                  Information collected through cookies and similar technologies as described in our Cookie Policy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>How We Use Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Providing and managing healthcare services and appointments</li>
                <li>Communicating with you about your appointments and medical care</li>
                <li>Maintaining medical records and treatment history</li>
                <li>Improving our website and services</li>
                <li>Complying with legal and regulatory requirements</li>
                <li>Responding to your inquiries and requests</li>
                <li>Sending relevant health information and updates (with your consent)</li>
              </ul>
              <p>
                <strong>Legal Basis for Processing:</strong> We process your data based on your explicit consent, 
                contractual necessity for healthcare services, legal obligations, and legitimate interests in 
                providing quality healthcare.
              </p>
            </CardContent>
          </Card>

          {/* Data Sharing and Disclosure */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Data Sharing and Disclosure</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>We may share your personal data with the following parties:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Healthcare providers and medical professionals involved in your care</li>
                <li>Hospitals and clinics where appointments are scheduled</li>
                <li>Payment processors for transaction processing</li>
                <li>Service providers who assist in operating our website (e.g., booking platforms)</li>
                <li>Regulatory authorities when required by law</li>
              </ul>
              <p>
                We do not sell your personal data to third parties for marketing purposes. 
                All third-party service providers are contractually obligated to protect your data 
                and only use it for specified purposes.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Data Retention</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We retain your personal data for as long as necessary to provide our services and 
                comply with legal obligations:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Medical Records:</strong> Retained for the period required by applicable law (typically 8-25 years)</li>
                <li><strong>Appointment Data:</strong> Retained for 7 years from the last appointment</li>
                <li><strong>Website Data:</strong> Retained for 2 years or until you request deletion</li>
                <li><strong>Marketing Communications:</strong> Retained until you unsubscribe</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights Under GDPR */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Your Rights Under GDPR</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Under the GDPR, you have the following rights:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>Right to Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Request correction of inaccurate data
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> Request limitation of how we use your data
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Request transfer of your data to another service
                </li>
                <li>
                  <strong>Right to Object:</strong> Object to processing based on legitimate interests
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time
                </li>
              </ul>
              <p>
                To exercise these rights, please contact us at privacy@dorcuswomenscare.com. 
                We will respond to your request within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Data Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Secure servers with access controls</li>
                <li>Regular security assessments and updates</li>
                <li>Staff training on data protection practices</li>
                <li>Secure third-party service providers</li>
              </ul>
              <p>
                While we take reasonable precautions to protect your information, no method of transmission 
                over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          {/* International Data Transfers */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>International Data Transfers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                As we operate in both Kenya and the United Kingdom, your data may be transferred between 
                these countries. We ensure that:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Appropriate safeguards are in place for international transfers</li>
                <li>Data is protected according to GDPR standards</li>
                <li>Transfers are necessary for providing healthcare services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to This Policy */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Changes to This Privacy Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant 
                changes by:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Posting the updated policy on our website</li>
                <li>Sending an email notification (if you've provided consent)</li>
                <li>Displaying a prominent notice on our website</li>
              </ul>
              <p>
                Your continued use of our services after changes constitute acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Contact Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
                practices, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> info@drdorcusmuchiri.com</p>
                <p><strong>Phone (Kenya):</strong> +254 720 996444</p>
                <p><strong>Phone (UK):</strong> +44 20 7123 4567</p>
                <p><strong>Address:</strong> Nairobi Women's Hospital, Adams Arcade, Ngong Road, Nairobi, Kenya</p>
              </div>
              <p>
                If you believe we have not complied with your data protection rights, you also have the 
                right to lodge a complaint with the relevant data protection authority:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Kenya:</strong> Office of the Data Protection Commissioner (ODPC)</li>
                <li><strong>UK:</strong> Information Commissioner's Office (ICO)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
