import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Heart, 
  Baby, 
  Users, 
  Calendar,
  ArrowRight,
  Clock,
  User
} from 'lucide-react';

const Resources = () => {
  const blogPosts = [
    {
      title: "Understanding Pregnancy: Your First Trimester Guide",
      excerpt: "Essential information for expectant mothers navigating the early stages of pregnancy, including what to expect and how to maintain optimal health.",
      category: "Pregnancy",
      readTime: "8 min read",
      date: "December 15, 2024",
      icon: Baby,
      color: "text-accent-green",
      bgColor: "bg-accent-green-light"
    },
    {
      title: "Fertility and Age: What Every Woman Should Know",
      excerpt: "Understanding how age affects fertility and what steps you can take to optimize your reproductive health at any stage of life.",
      category: "Fertility",
      readTime: "6 min read", 
      date: "December 10, 2024",
      icon: Heart,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light"
    },
    {
      title: "Choosing the Right Contraception: A Comprehensive Guide",
      excerpt: "Navigate the various contraceptive options available today, with insights on effectiveness, side effects, and suitability for different lifestyles.",
      category: "Family Planning",
      readTime: "10 min read",
      date: "December 5, 2024",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "Menopause: Embracing Change with Confidence",
      excerpt: "A complete guide to understanding menopause, managing symptoms, and maintaining health and vitality during this life transition.",
      category: "Menopause",
      readTime: "12 min read",
      date: "November 28, 2024",
      icon: Heart,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light"
    },
    {
      title: "The Importance of Regular Gynecological Check-ups",
      excerpt: "Why routine screenings are crucial for women's health and what to expect during your gynecological examination.",
      category: "Preventive Care",
      readTime: "5 min read",
      date: "November 20, 2024",
      icon: Heart,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "Digital Health: Leveraging Technology for Women's Wellness",
      excerpt: "How modern technology and digital tools can support your health journey, from period tracking to telemedicine consultations.",
      category: "Digital Health",
      readTime: "7 min read",
      date: "November 15, 2024",
      icon: BookOpen,
      color: "text-accent-green", 
      bgColor: "bg-accent-green-light"
    }
  ];

  const healthResources = [
    {
      title: "Women's Health Toolkit",
      description: "Downloadable guides covering essential topics in women's health",
      items: ["Pregnancy Planning Checklist", "Menstrual Health Guide", "Menopause Symptom Tracker"]
    },
    {
      title: "Educational Videos",
      description: "Visual guides to help you understand various procedures and health topics",
      items: ["Understanding Pap Smears", "Fertility Awareness Methods", "Managing Menopause Symptoms"]
    },
    {
      title: "Health Tracking Tools",
      description: "Resources to help you monitor and track your health journey",
      items: ["Period Tracking Template", "Symptom Diary", "Medication Schedule"]
    }
  ];

  const categories = [
    { name: "All", count: 6 },
    { name: "Pregnancy", count: 1 },
    { name: "Fertility", count: 1 },
    { name: "Family Planning", count: 1 },
    { name: "Menopause", count: 1 },
    { name: "Preventive Care", count: 1 },
    { name: "Digital Health", count: 1 }
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="h-4 w-4 mr-2" />
            Educational Resources
          </Badge>
          <h1 className="heading-primary mb-6">
            Women's Health <span className="text-medical-accent">Resources</span> & Education
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Access evidence-based information, practical guides, and educational content 
            to empower your health decisions and enhance your well-being at every stage of life.
          </p>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={category.name === "All" ? "default" : "outline"}
                size="sm"
                className={category.name === "All" ? "btn-medical" : ""}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="mb-16">
          <h2 className="heading-secondary text-center mb-12">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="card-medical group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-full ${post.bgColor}`}>
                      <post.icon className={`h-5 w-5 ${post.color}`} />
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Dr. Dorcus</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-4">{post.date}</div>
                  
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="bg-primary-soft rounded-lg p-3 text-center">
                      <p className="text-sm text-primary font-medium mb-2">
                        Need personalized care?
                      </p>
                      <Button size="sm" className="btn-medical-soft" asChild>
                        <Link to="/appointments">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Appointment
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="btn-medical" size="lg">
              Load More Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Health Resources */}
        <section className="mb-16">
          <h2 className="heading-secondary text-center mb-12">Health Tools & Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {healthResources.map((resource, index) => (
              <Card key={index} className="card-medical-feature">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {resource.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    Access Resources
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <Card className="card-medical bg-gradient-soft">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="heading-secondary mb-6">Stay Informed</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest women's health insights, 
                tips, and updates delivered to your inbox monthly.
              </p>
              
              <div className="max-w-md mx-auto">
                {/* Placeholder for GHL Form Embed */}
                <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8">
                  <p className="text-muted-foreground mb-4">
                    GoHighLevel Newsletter Signup Form
                  </p>
                  <Button className="btn-medical">
                    Subscribe to Newsletter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="card-medical bg-primary-soft">
            <CardContent className="pt-12 pb-12">
              <h2 className="heading-secondary mb-6">
                Have Specific Health Questions?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                While these resources provide general information, personalized medical advice 
                is always best. Schedule a consultation for individualized care.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="btn-medical" asChild>
                  <Link to="/appointments">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Consultation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Contact Dr. Dorcus
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

export default Resources;