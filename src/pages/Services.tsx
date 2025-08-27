import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
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
  Clock
} from 'lucide-react';

const Services = () => {
  const { country } = useLocation();

  const services = [
    {
      icon: Baby,
      title: "Obstetrics & Pregnancy Care",
      description: "Comprehensive care throughout your pregnancy journey",
      color: "text-accent-green",
      bgColor: "bg-accent-green-light",
      details: [
        "Prenatal consultations and monitoring",
        "High-risk pregnancy management",
        "Delivery planning and support",
        "Postnatal care and recovery",
        "Breastfeeding guidance",
        "Family planning after delivery"
      ],
      pricing: {
        Kenya: "KES 8,000 - 15,000",
        UK: "£150 - £300"
      }
    },
    {
      icon: Stethoscope,
      title: "Gynecological Examinations",
      description: "Regular screenings and diagnostic procedures",
      color: "text-primary",
      bgColor: "bg-primary-light",
      details: [
        "Annual gynecological check-ups",
        "Pap smear and cervical screening",
        "HPV testing and prevention",
        "Breast examination and counseling",
        "Pelvic examination and assessment",
        "STI screening and treatment"
      ],
      pricing: {
        Kenya: "KES 5,000 - 12,000",
        UK: "£120 - £250"
      }
    },
    {
      icon: Heart,
      title: "Fertility & Reproductive Health",
      description: "Support for your fertility journey and reproductive wellness",
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light",
      details: [
        "Fertility assessment and counseling",
        "Ovulation monitoring and tracking",
        "Hormonal evaluation and treatment",
        "Pre-conception counseling",
        "Infertility investigation and management",
        "Reproductive endocrinology consultation"
      ],
      pricing: {
        Kenya: "KES 10,000 - 25,000",
        UK: "£200 - £500"
      }
    },
    {
      icon: Users,
      title: "Family Planning & Contraception",
      description: "Personalized contraceptive solutions and family planning",
      color: "text-accent-green",
      bgColor: "bg-accent-green-light",
      details: [
        "Contraceptive counseling and selection",
        "IUD insertion and removal",
        "Hormonal contraception management",
        "Emergency contraception",
        "Sterilization procedures",
        "Natural family planning methods"
      ],
      pricing: {
        Kenya: "KES 3,000 - 8,000",
        UK: "£80 - £200"
      }
    },
    {
      icon: Activity,
      title: "Menopause & Hormonal Health",
      description: "Comprehensive support through life transitions",
      color: "text-primary",
      bgColor: "bg-primary-light",
      details: [
        "Menopause assessment and management",
        "Hormone replacement therapy (HRT)",
        "Bone health evaluation",
        "Cardiovascular risk assessment",
        "Mood and wellness support",
        "Lifestyle modification guidance"
      ],
      pricing: {
        Kenya: "KES 6,000 - 15,000",
        UK: "£150 - £350"
      }
    },
    {
      icon: Shield,
      title: "Preventive Care & Wellness",
      description: "Proactive health maintenance and disease prevention",
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light",
      details: [
        "Regular health screenings",
        "Lifestyle and nutrition counseling",
        "Exercise and wellness planning",
        "Mental health support",
        "Chronic disease prevention",
        "Health education and empowerment"
      ],
      pricing: {
        Kenya: "KES 4,000 - 10,000",
        UK: "£100 - £250"
      }
    }
  ];

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
            Comprehensive Women's Health Services
          </Badge>
          <h1 className="heading-primary mb-6">
            <span className="text-medical-accent">Complete Care</span> for Every Stage of Life
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From adolescence through menopause and beyond, I provide personalized, 
            evidence-based care tailored to your unique health needs and life circumstances.
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
                  
                  {country && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Consultation Fee:</span>
                        <span className="text-lg font-semibold text-primary">
                          {service.pricing[country]}
                        </span>
                      </div>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-accent-green mt-1 shrink-0" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
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

        {/* Emergency Services */}
        <section className="mb-16">
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
        </section>

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