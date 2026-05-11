import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import doki from '@/assets/IMG_0049.jpeg'
import { 
  Mic, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Calendar,
  ArrowRight,
  Clock,
  User,
  MapPin,
  Award,
  Target,
  Heart,
} from 'lucide-react';
import { FaSpotify, FaApple, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

const PublicSpeaking = () => {
  const speakingEngagements = [
    {
      title: "Women's Health Summit 2024",
      excerpt: "Keynote presentation on 'Empowering Women Through Health Education' at the annual Women's Health Summit, bringing together healthcare professionals and advocates.",
      category: "Conference",
      duration: "45 min keynote",
      date: "March 15, 2024",
      location: "Nairobi, Kenya",
      icon: Mic,
      color: "text-accent-green",
      bgColor: "bg-accent-green-light"
    },
    {
      title: "Medical Education Workshop Series",
      excerpt: "Interactive workshop series for healthcare providers on advanced women's health topics and patient communication strategies.",
      category: "Workshop",
      duration: "3-hour session",
      date: "February 8, 2024",
      location: "Virtual",
      icon: GraduationCap,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light"
    },
    {
      title: "Corporate Wellness Program",
      excerpt: "Healthcare advocacy presentation for corporate employees on women's health awareness and workplace wellness initiatives.",
      category: "Corporate",
      duration: "60 min presentation",
      date: "January 22, 2024",
      location: "Mombasa, Kenya",
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "Girls' Education Initiative",
      excerpt: "Panel discussion on adolescent health education and empowerment for young women in secondary schools across the region.",
      category: "Education",
      duration: "90 min panel",
      date: "December 10, 2023",
      location: "Kisumu, Kenya",
      icon: Users,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light"
    },
    {
      title: "Healthcare Policy Forum",
      excerpt: "Expert panel discussion on healthcare policy reform and women's health advocacy at the national healthcare forum.",
      category: "Policy",
      duration: "2-hour forum",
      date: "November 15, 2023",
      location: "Nairobi, Kenya",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "International Women's Day Conference",
      excerpt: "Celebratory keynote on women's health achievements and future challenges in global healthcare delivery.",
      category: "Conference",
      duration: "50 min keynote",
      date: "March 8, 2023",
      location: "Virtual",
      icon: Award,
      color: "text-accent-green", 
      bgColor: "bg-accent-green-light"
    }
  ];

  const speakingFormats = [
    {
      title: "Keynote Speeches",
      description: "Inspirational and educational presentations for conferences and large events",
      items: ["45-60 minute presentations", "Customizable topics", "Q&A sessions included", "Professional slide deck"]
    },
    {
      title: "Workshops & Training",
      description: "Interactive sessions designed for hands-on learning and skill development",
      items: ["2-4 hour sessions", "Small group settings", "Practical exercises", "Resource materials provided"]
    },
    {
      title: "Panel Discussions",
      description: "Expert insights and perspectives on healthcare topics and policy issues",
      items: ["Moderated discussions", "Multi-expert panels", "Audience engagement", "Current topics focus"]
    }
  ];

  const categories = [
    { name: "All", count: 6 },
    { name: "Conference", count: 2 },
    { name: "Workshop", count: 1 },
    { name: "Corporate", count: 1 },
    { name: "Education", count: 1 },
    { name: "Policy", count: 1 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent-purple/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-6 text-sm">
                <Mic className="h-4 w-4 mr-2" />
                Professional Speaker
              </Badge>
              <h1 className="heading-primary mb-6">
                Dr. Dorcus Muchiri
              </h1>
              <h2 className="heading-secondary mb-6 text-3xl">
                <span className="text-medical-accent">Inspiring Change</span> Through Public Speaking
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Bringing expertise in women's health, medical education, and healthcare advocacy 
                to audiences worldwide through powerful keynote speeches, interactive workshops, and thought leadership panels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                <Button size="lg" className="btn-medical" asChild>
                  <Link to="https://api.leadconnectorhq.com/widget/form/Zm6pM49oNBw5TcB21Pt7" target='_blank'>
                    <Calendar className="h-5 w-5 mr-2" />
                    Book For Speaking
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                   Reach Out Today
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent-purple/20 shadow-2xl">
                <img 
                  src={doki}
                  alt="Dr. Dorcus Muchiri - Professional Speaker" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">50+ Events</p>
                    <p className="text-xs text-muted-foreground">Speaking Engagements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Speaking Topics</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert insights on critical healthcare topics that matter to your audience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="group overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-background">
              
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 p-4 rounded-full bg-accent-green-light">
                  <Heart className="h-8 w-8 text-accent-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Women's Health</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive insights on reproductive health, preventive care, and wellness strategies for women at all life stages.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Reproductive Health</li>
                  <li>• Preventive Care</li>
                  <li>• Menopause Management</li>
                  <li>• Mental Health & Wellness</li>
                </ul>
              </div>
            </Card>
            
            <Card className="group overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-background">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 p-4 rounded-full bg-accent-purple-light">
                  <GraduationCap className="h-8 w-8 text-accent-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Medical Education</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced training and knowledge sharing for healthcare professionals and medical students.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Clinical Best Practices</li>
                  <li>• Patient Communication</li>
                  <li>• Medical Technology</li>
                  <li>• Healthcare Innovation</li>
                </ul>
              </div>
            </Card>
            
            <Card className="group overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-background">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 p-4 rounded-full bg-primary-light">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Healthcare Advocacy</h3>
                <p className="text-muted-foreground mb-4">
                  Championing policy reform, patient rights, and equitable healthcare access for all communities.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Healthcare Policy</li>
                  <li>• Patient Advocacy</li>
                  <li>• Health Equity</li>
                  <li>• Community Outreach</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Engagements */}
      {/* <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Featured Speaking Engagements</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Recent appearances at leading conferences and events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {speakingEngagements.slice(0, 6).map((engagement, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full ${engagement.bgColor}`}>
                      <engagement.icon className={`h-5 w-5 ${engagement.color}`} />
                    </div>
                    <Badge variant="outline">{engagement.category}</Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">{engagement.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{engagement.excerpt}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{engagement.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{engagement.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{engagement.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="btn-medical-soft">
                      Book
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          
        </div>
      </section> */}


      {/* Filling The Gap Podcast Section */}
      <section className="py-20 bg-gradient-to-br from-accent-purple/5 to-accent-green/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Mic className="h-4 w-4 mr-2" />
              Podcast
            </Badge>
            <h2 className="heading-secondary mb-4">Filling The Gap</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Honest, accessible, and empowering women's health conversations
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Video Side */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/XVjfCo-ivok"
                  title="Filling The Gap Podcast - Latest Episode"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">New Episodes</p>
                    <p className="text-xs text-muted-foreground">Weekly Release</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">About Filling The Gap</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Filling The Gap is a women's health podcast hosted by Dr. Dorcus Muchiri, OB/GYN and reproductive health specialist, dedicated to making women's health information honest, accessible and empowering.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through real conversations and expert interviews, we unpack everything you were never taught about your body. From hormonal health and fertility to perimenopause, menopause, and reproductive care across every stage of life.
                </p>
              </div>
              
              {/* <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                <h4 className="font-semibold mb-3">Who This Is For</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                    Women in their 20s navigating their cycle
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                    Those trying to conceive
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                    Women approaching menopause
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                    Anyone supporting loved ones through hormonal changes
                  </li>
                </ul>
              </div> */}
              
              <div>
                <h4 className="font-semibold mb-4">Subscribe & Follow</h4>
                <div className="grid grid-cols-4 gap-4">
                  <Link to="https://open.spotify.com/show/2bd3alyvGjvRwwSXQGFHx5" target="_blank" className="group flex flex-col items-center space-y-2 p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-300">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <FaSpotify className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Spotify</span>
                  </Link>
                  
                  <Link to="https://www.tiktok.com/@fillingthegap.podcast?is_from_webapp=1&sender_device=pc" target="_blank" className="group flex flex-col items-center space-y-2 p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-300">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <FaTiktok className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">TikTok</span>
                  </Link>
                  
                  <Link to="https://www.youtube.com/@fillingthegap.podcast" target="_blank" className="group flex flex-col items-center space-y-2 p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-300">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <FaYoutube className="w-6 h-6 text-red-500" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">YouTube</span>
                  </Link>
                  
                  <Link to="https://www.instagram.com/fillingthegappodcast/" target="_blank" className="group flex flex-col items-center space-y-2 p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-300">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <FaInstagram className="w-6 h-6 text-pink-500" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Instagram</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* CTA Section */}
      <section className="py-20 bg-primary-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-secondary mb-6">
              Ready to Inspire Your Audience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bring Dr. Dorcus's expertise in women's health, medical education, and healthcare advocacy 
              to your next event. Contact us to discuss your speaking engagement needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="btn-medical" asChild>
                <Link to="/contact">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Me Today
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  Download Speaker Kit
                </Link>
              </Button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicSpeaking;