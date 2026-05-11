import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import dorcus from "../assets/doc4.jpg";
import { useLocation } from '@/components/LocationProvider';
import { 
  Baby, 
  Heart, 
  Users, 
  Shield, 
  Activity, 
  Stethoscope,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  BookOpen,
  Microscope,
  Brain,
  Megaphone
} from 'lucide-react';

const Services = () => {
  const { country } = useLocation();

  const services = [
    {
      icon: Heart,
      title: "Fertility Support",
      description: "Comprehensive fertility assessment and personalized treatment plans",
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light",
      details: "Our fertility support services provide comprehensive assessment and counseling, ovulation monitoring, hormonal evaluation, pre-conception planning, infertility investigation, assisted reproductive technology consultation, and lifestyle optimization to help you achieve your family planning goals.",
      pricing: {
        Kenya: "KES 8,000 - 20,000",
        UK: "£180 - £450"
      }
    },
    {
      icon: Activity,
      title: "Menopause Support",
      description: "Expert guidance and treatment through menopausal transition",
      color: "text-primary",
      bgColor: "bg-primary-light",
      details: "We offer specialized menopause assessment and symptom management, hormone replacement therapy consultation, bone health evaluation, cardiovascular risk assessment, mood and wellness support, sleep disorder management, and lifestyle guidance to ensure a smooth transition through this important life stage.",
      pricing: {
        Kenya: "KES 6,000 - 15,000",
        UK: "£150 - £350"
      }
    },
    {
      icon: Brain,
      title: "Reproductive Hormone Health",
      description: "Specialized care for hormonal balance and reproductive wellness",
      color: "text-accent-green",
      bgColor: "bg-accent-green-light",
      details: "Our reproductive hormone health services include comprehensive hormone testing, thyroid and adrenal assessment, PCOS management, endometriosis treatment, menstrual disorder care, hormonal acne treatment, and personalized balancing protocols to restore optimal hormonal function.",
      pricing: {
        Kenya: "KES 7,000 - 18,000",
        UK: "£160 - £400"
      }
    },
    {
      icon: BookOpen,
      title: "Education & Research",
      description: "Empowering women through education and advancing knowledge in women's health",
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light",
      details: "We empower women through health literacy workshops, reproductive health education, preventive care training, nutrition guidance, and mental health awareness. Our research initiatives offer clinical study participation, women's health trials, hormone advancement programs, and evidence-based treatment development to advance women's health knowledge and care standards globally.",
      pricing: {
        Kenya: "KES 3,000 - 8,000",
        UK: "£80 - £200"
      }
    }
  ];

  const speakingAndConsulting = {
    icon: Megaphone,
    title: "Speaking & Consulting",
    description: "Expert speaking engagements and consulting for conferences, forums, and workshops",
    color: "text-accent-purple",
    bgColor: "bg-accent-purple-light",
    details: [
      "Conference keynote presentations",
      "Professional forum speaking",
      "Educational workshop facilitation",
      "Corporate wellness consulting",
      "Healthcare policy advisory",
      "Media expert commentary",
      "Custom training program development"
    ],
    pricing: {
      Kenya: "Variable (Event-Based)",
      UK: "Variable (Event-Based)"
    }
  };

  const emergencyServices = [
    "24/7 Emergency consultations",
    "Pregnancy complications management",
    "Gynecological emergencies", 
    "Post-operative care and follow-up"
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Stethoscope className="h-4 w-4 mr-2" />
            Our Core Services
          </Badge>
          <h1 className="heading-primary mb-6">
            <span className="text-medical-accent">Specialized Care</span> for Women's Health & Wellness
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Expert services in fertility support, menopause care, hormone health, education, and research to empower your health journey
          </p>
          
          {country && (
            <div className="mt-8 p-4 bg-primary-soft rounded-lg inline-block">
              <p className="text-primary font-medium">
                Currently viewing {country} practice services and pricing
              </p>
            </div>
          )}
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-medical group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-full ${service.bgColor}`}>
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                  
                  {/* {country && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Consultation Fee:</span>
                        <span className="text-lg font-semibold text-primary">
                          {service.pricing[country]}
                        </span>
                      </div>
                    </div>
                  )} */}
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {service.details}
                  </p>
                  
                  <Button className="w-full btn-medical" asChild>
                    <Link to="/appointments">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book This Service
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Speaking & Consulting Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Photo Side */}
            <div className="relative">
              <img 
                src={dorcus} 
                alt="Dr. Dorcus" 
                className="w-full h-100px rounded-lg object-contain"
              />
            </div>
            
            {/* Description Side */}
            <div>
                  <h3 className="heading-secondary mb-6">
                   Public Speaking
                 </h3>
                  <p className="text-foreground mb-6 leading-relaxed">
                    Dr. Dorcus brings extensive expertise in women's health to conferences, forums, and workshops worldwide. 
                    As a sought-after speaker, she delivers compelling keynote presentations on fertility support, menopause care, 
                    reproductive hormone health, and women's health education. Her consulting services extend to corporate wellness programs, 
                    healthcare policy advisory, media expert commentary, and custom training program development. 
                    Whether you're organizing a professional conference, educational workshop, or seeking specialized consulting for your organization, 
                    Dr. Dorcus provides evidence-based insights that empower and educate audiences on critical women's health topics.
                  </p>
                  
                  {/* {country && (
                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-foreground">Pricing:</span>
                        <span className="text-lg font-semibold text-primary ml-2">
                          {speakingAndConsulting.pricing[country]}
                        </span>
                      </div>
                    </div>
                  )} */}
                  
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button variant="outline" asChild>
                      <Link to="/public-speaking">
                        Learn More 
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
            
            
            </div>
          </div>
        </section>

        {/* Emergency Services */}
        {/* <section className="mb-16">
          <Card className="card-medical bg-gradient-soft">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                <Clock className="h-6 w-6 text-primary" />
                <span>Emergency & Urgent Care</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Available for urgent women's health concerns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencyServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent-green shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  For urgent concerns, please contact our emergency line or visit the nearest emergency department.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    Emergency Contact Information
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section> */}

        {/* Treatment Philosophy */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="card-medical-feature">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Patient-Centered</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Every treatment plan is tailored to your individual needs, preferences, and life circumstances.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="card-medical-feature">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-accent-purple/10">
                  <Shield className="h-8 w-8 text-accent-purple" />
                </div>
                <CardTitle>Evidence-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  All treatments are based on the latest medical research and international best practices.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="card-medical-feature">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-accent-green/10">
                  <Users className="h-8 w-8 text-accent-green" />
                </div>
                <CardTitle>Holistic Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We consider your physical, emotional, and social well-being in every aspect of care.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="card-medical bg-primary-soft">
            <CardContent className="pt-12 pb-12">
              <h2 className="heading-secondary mb-6">
                Ready to Begin Your Health Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book your consultation today and take the first step towards comprehensive, 
                personalized women's health care.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="btn-medical" asChild>
                  <Link to="/appointments">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Have Questions? Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Services;