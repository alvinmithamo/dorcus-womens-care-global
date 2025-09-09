import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  MessageSquare,
  Globe,

  
} from 'lucide-react';

const Contact = () => {
  const locations = [
    {
      country: "Kenya",
      flag: "🇰🇪",
      clinicName: "Nairobi Women's Hospital",
      address: "Adams Arcade, Ngong Road\nNairobi, Kenya",
      phone: "+44 7729 241050",
      email: "info@drdorcusmuchiri.com",
      hours: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM",
      emergencyPhone: "+44 7729 241050",
      mapEmbedId: "kenya-clinic"
    },
    {
      country: "United Kingdom", 
      flag: "🇬🇧",
      clinicName: "London Women's Clinic",
      address: "123 Harley Street\nLondon W1G 6BA\nUnited Kingdom",
      phone: "+44 7729 241050",
      email: "info@drdorcusmuchiri.com", 
      hours: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM",
      emergencyPhone: "+44 20 7999 0000",
      mapEmbedId: "uk-clinic"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Consultation",
      description: "Speak directly with Dr. Dorcus for urgent concerns or follow-up care",
      action: "Call Now",
      color: "text-accent-green"
    },
    {
      icon: MessageSquare,
      title: "Online Inquiry",
      description: "Send your questions or concerns via our secure contact form",
      action: "Send Message",
      color: "text-primary"
    },
    {
      icon: Calendar,
      title: "Schedule Appointment",
      description: "Book your consultation through our online booking system",
      action: "Book Now",
      color: "text-accent-purple"
    }
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Globe className="h-4 w-4 mr-2" />
            Get in Touch
          </Badge>
          <h1 className="heading-primary mb-6">
            <span className="text-medical-accent">Contact</span> Dr. Dorcus
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Reach out for consultations, inquiries, or to schedule your appointment. 
            We're here to support your health journey across Kenya and the United Kingdom.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="mb-16">
          <h2 className="heading-secondary text-center mb-12">How to Reach Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="card-medical-feature group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-background/50">
                    <method.icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="btn-medical-soft w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Location Information */}
        <section className="mb-16">
          <h2 className="heading-secondary text-center mb-12">Our Locations</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {locations.map((location, index) => (
              <Card key={index} className="card-medical">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl">{location.flag}</span>
                    <div>
                      <CardTitle className="text-xl">{location.country}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {location.clinicName}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Address</h4>
                      <p className="text-muted-foreground whitespace-pre-line">{location.address}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Phone</h4>
                      <p className="text-muted-foreground">{location.phone}</p>
                      <p className="text-sm text-muted-foreground">
                        Emergency: {location.emergencyPhone}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground">{location.email}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Operating Hours</h4>
                      <p className="text-muted-foreground whitespace-pre-line">{location.hours}</p>
                    </div>
                  </div>

                  {/* Google Maps Embed */}
                  <div className="rounded-lg overflow-hidden border border-border">
                    <iframe
                      src={location.country === "Kenya" 
                        ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.786087731234!2d36.7817!3d-1.3028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6bf7445dc1%3A0x940b62a3c8efde4c!2sAdams%20Arcade%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s"
                        : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.7535827553333!2d-0.1454!3d51.5174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad554c335c1%3A0x9b7d3f0f8b9a7c8e!2s123%20Harley%20St%2C%20Marylebone%2C%20London%20W1G%206BA%2C%20UK!5e0!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s"
                    }
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${location.clinicName}`}
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button className="btn-medical-outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Chat with Us
                    </Button>
                    <Button className="btn-medical" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <h2 className="heading-secondary text-center mb-12">Send Us a Message</h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="card-medical">
              <CardHeader className="text-center">
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for GHL Form Embed */}
                <div className='rounded-lg-overflow-hidden-border-border-border'>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/SUNeFDz3exRQlN9Th60y"
                    style={{ width:"100%",height:"600px",border:"none",borderRadius:"3px" }}
                    id="inline-SUNeFDz3exRQlN9Th60y" 
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Contact Form"
                    data-height="558"
                    data-layout-iframe-id="inline-SUNeFDz3exRQlN9Th60y"
                    data-form-id="SUNeFDz3exRQlN9Th60y"
                    title="Contact Form"
                        >
                </iframe>
                <script src="https://link.msgsndr.com/js/form_embed.js"></script>
                </div>

                {/* <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-medium text-foreground mb-4">
                    GoHighLevel Contact Form Embed
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    This area will contain the embedded contact form from GoHighLevel, 
                    allowing patients to send inquiries directly to Dr. Dorcus.
                  </p>
                  <Button className="btn-medical">
                    Load Contact Form
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Emergency Information */}
        {/* <section className="mb-16">
          <Card className="card-medical border-red-200 bg-red-50/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-medium text-foreground mb-4">Emergency Contacts</h3>
                <p className="text-muted-foreground mb-6">
                  For urgent medical situations that require immediate attention, 
                  please contact our emergency lines or visit the nearest emergency department.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <h4 className="font-medium text-foreground mb-2">Kenya Emergency</h4>
                    <p className="text-lg font-semibold text-red-600">+254 700 999 000</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-foreground mb-2">UK Emergency</h4>
                    <p className="text-lg font-semibold text-red-600">+44 20 7999 0000</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-6">
                  Available 24/7 for genuine medical emergencies
                </p>
              </div>
            </CardContent>
          </Card>
        </section> */}

        {/* CTA Section */}
        <section className="text-center">
          <Card className="card-medical bg-primary-soft">
            <CardContent className="pt-12 pb-12">
              <h2 className="heading-secondary mb-6">
                Ready to Start Your Health Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don't wait to prioritize your health. Contact us today to schedule your 
                consultation and take the first step towards comprehensive women's health care.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="btn-medical">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Appointment
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;