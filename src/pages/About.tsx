import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  Globe, 
  Heart, 
  BookOpen, 
  Plane,
  Calendar,
  ArrowRight
} from 'lucide-react';
import heroImage from '@/assets/dr-dorcus-hero.jpg';

const About = () => {
  const education = [
    {
      degree: "M.MED Obstetrics & Gynaecology",
      institution: "University of Nairobi",
      year: "2018",
      description: "Specialized postgraduate training in comprehensive women's health"
    },
    {
      degree: "MBChB Medicine & Surgery",
      institution: "University of Nairobi",
      year: "2014",
      description: "Bachelor of Medicine and Bachelor of Surgery"
    }
  ];

  const experience = [
    {
      title: "Senior Consultant Gynecologist",
      location: "London Women's Clinic, UK",
      period: "2020 - Present",
      description: "Leading women's health services with focus on fertility and reproductive health"
    },
    {
      title: "Consultant Obstetrician & Gynecologist",
      location: "Nairobi Women's Hospital, Kenya",
      period: "2019 - Present",
      description: "Comprehensive obstetric and gynecological care including high-risk pregnancies"
    },
    {
      title: "NHS Training Program",
      location: "Royal London Hospital, UK",
      period: "2018 - 2020",
      description: "Advanced training in UK healthcare system and international standards"
    }
  ];

  const interests = [
    {
      icon: BookOpen,
      title: "Medical Research",
      description: "Published research in women's health and fertility treatment innovations"
    },
    {
      icon: Plane,
      title: "Travel & Culture",
      description: "Passionate about experiencing diverse cultures and understanding global health perspectives"
    },
    {
      icon: Heart,
      title: "Wellness & Fitness",
      description: "Advocate for holistic health approach including physical and mental well-being"
    }
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Globe className="h-4 w-4 mr-2" />
                  International Medical Professional
                </Badge>
                <h1 className="heading-primary mb-6">
                  About <span className="text-medical-accent">Dr. Dorcus</span> Wamaitha Muchiri
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A dedicated women's health specialist with international training and a passion 
                  for providing evidence-based, compassionate care to women across different 
                  stages of their lives.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="btn-medical" asChild>
                  <Link to="/appointments">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Consultation
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/services">
                    View Services
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroImage}
                alt="Dr. Dorcus Wamaitha Muchiri"
                className="w-full h-auto rounded-2xl shadow-large"
              />
            </div>
          </div>
        </section>

        {/* Biography */}
        <section className="mb-16">
          <Card className="card-medical">
            <CardContent className="pt-8">
              <h2 className="heading-secondary mb-6">My Journey in Medicine</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  My journey in medicine began with a deep-seated desire to make a meaningful 
                  difference in women's lives. After completing my medical education at the 
                  University of Nairobi, I specialized in Obstetrics and Gynaecology, driven 
                  by the profound impact that quality reproductive healthcare can have on 
                  families and communities.
                </p>
                <p>
                  The opportunity to train within the NHS in the United Kingdom expanded my 
                  perspective on global healthcare standards and exposed me to diverse 
                  approaches to women's health. This international experience has been 
                  invaluable in shaping my practice philosophy of combining evidence-based 
                  medicine with culturally sensitive, patient-centered care.
                </p>
                <p>
                  Today, I am privileged to serve women in both Kenya and the UK, bringing 
                  together the best of both healthcare systems. My approach emphasizes not 
                  just treating conditions, but empowering women with knowledge and support 
                  to make informed decisions about their health throughout every stage of life.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="heading-secondary text-center mb-12">Education & Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="card-medical-feature">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline">{edu.year}</Badge>
                  </div>
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {edu.institution}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-16">
          <h2 className="heading-secondary text-center mb-12">Professional Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={index} className="card-medical">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.location}</p>
                    </div>
                    <Badge variant="outline" className="self-start lg:self-center mt-2 lg:mt-0">
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Professional Affiliations */}
        <section className="mb-16">
          <Card className="card-medical bg-gradient-soft">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Award className="h-6 w-6 text-primary" />
                <span>Professional Affiliations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-medium text-foreground mb-2">Kenya Medical Association</h4>
                  <p className="text-sm text-muted-foreground">Active Member</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-foreground mb-2">Royal College of Obstetricians</h4>
                  <p className="text-sm text-muted-foreground">Associate Member</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-foreground mb-2">International Federation of Gynecology</h4>
                  <p className="text-sm text-muted-foreground">Research Contributor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Personal Interests */}
        <section className="mb-16">
          <h2 className="heading-secondary text-center mb-12">Beyond Medicine</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <Card key={index} className="card-medical-feature">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                    <interest.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{interest.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {interest.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="card-medical bg-primary-soft">
            <CardContent className="pt-12 pb-12">
              <h2 className="heading-secondary mb-6">
                Experience Personalized Women's Health Care
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's work together to address your health needs with the expertise, 
                compassion, and international standards you deserve.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="btn-medical" asChild>
                  <Link to="/appointments">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Consultation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Get in Touch
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

export default About;