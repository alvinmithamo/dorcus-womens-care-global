import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocation } from '@/components/LocationProvider';
import { 
  Calendar, 
  Heart, 
  Baby, 
  Users, 
  Award, 
  Globe, 
  Star,
  CheckCircle,
  ArrowRight,
  Quote
} from 'lucide-react';
import heroImage from '@/assets/dr-dorcus-hero.jpg';
import clinicImage from '@/assets/clinic-interior.jpg';

const Home = () => {
  const { country } = useLocation();

  const services = [
    {
      icon: Baby,
      title: "Pregnancy Care",
      description: "Comprehensive prenatal, delivery, and postnatal care for a healthy pregnancy journey.",
      color: "text-accent-green"
    },
    {
      icon: Heart,
      title: "Fertility Support",
      description: "Expert guidance and treatment for couples on their fertility journey.",
      color: "text-accent-purple"
    },
    {
      icon: Users,
      title: "Family Planning",
      description: "Personalized contraception and family planning solutions.",
      color: "text-primary"
    },
    {
      icon: Award,
      title: "Preventive Care",
      description: "Regular screenings and preventive health measures for optimal well-being.",
      color: "text-accent-green"
    }
  ];

  const qualifications = [
    "M.MED Obstetrics & Gynaecology, University of Nairobi",
    "MBChB Medicine & Surgery, University of Nairobi", 
    "NHS Training & Certification, United Kingdom",
    "Member, Kenya Medical Association",
    "International Women's Health Research"
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Nairobi",
      text: "Dr. Dorcus made my pregnancy journey so much easier. Her expertise and compassionate care gave me confidence throughout.",
      rating: 5
    },
    {
      name: "Emma L.",
      location: "London",
      text: "Outstanding care and attention to detail. Dr. Dorcus took time to understand my concerns and provided excellent treatment.",
      rating: 5
    },
    {
      name: "Grace K.",
      location: "Mombasa",
      text: "Professional, knowledgeable, and caring. I recommend Dr. Dorcus to all women seeking quality healthcare.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="mb-4">
                  <Globe className="h-4 w-4 mr-2" />
                  International Women's Health Specialist
                </Badge>
                <h1 className="heading-primary">
                  Dedicated to <span className="text-medical-accent">Women's Health</span> in Kenya & the UK
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Providing compassionate, evidence-based gynecological care with international expertise. 
                  Your health journey deserves personalized attention and world-class medical care.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="btn-medical" asChild>
                  <Link to="/appointments">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Consultation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services">
                    Learn About Services
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>

              {country && (
                <div className="p-4 bg-primary-soft rounded-lg border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    🌍 Currently viewing {country} practice information
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src={heroImage}
                  alt="Dr. Dorcus Wamaitha Muchiri"
                  className="w-full h-auto rounded-2xl shadow-large"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-primary rounded-2xl opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">
              Comprehensive Women's Health Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From pregnancy care to menopause support, I provide personalized treatment 
              plans tailored to your unique health needs and life stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-medical-feature group cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-full bg-background/50 ${service.color}`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="btn-medical" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Dr. Dorcus */}
      <section className="py-16 lg:py-24 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={clinicImage}
                alt="Modern medical clinic interior"
                className="w-full h-auto rounded-2xl shadow-medium"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="heading-secondary mb-6">
                  Why Choose Dr. Dorcus?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  With extensive training in both Kenya and the UK, I bring international 
                  standards of care combined with deep understanding of diverse women's health needs.
                </p>
              </div>

              <div className="space-y-4">
                {qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent-green mt-1 shrink-0" />
                    <span className="text-foreground">{qualification}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-light text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-primary mb-2">2</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-primary mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">Patients Served</div>
                </div>
              </div>

              <Button className="btn-medical" asChild>
                <Link to="/about">
                  Learn More About Dr. Dorcus
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">What Patients Say</h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from women who have trusted their health to our care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-medical">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div>
                    <div className="font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-soft">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="heading-secondary">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-muted-foreground">
              Book your consultation today and experience personalized, compassionate care 
              from an internationally trained women's health specialist.
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
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;