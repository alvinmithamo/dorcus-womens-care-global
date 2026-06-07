import React, { useState } from 'react';
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
  const [filter, setFilter] = useState('All');
  
  const speakingEngagements = [
    {
      title: "Drunken Lectures Nairobi",
      excerpt: "Upcoming speaking engagement on women's health and hormonal wellness.",
      category: "Upcoming",
      duration: "Lecture",
      date: "August 23, 2026",
      location: "Nairobi, Kenya",
      icon: Mic,
      color: "text-accent-green",
      bgColor: "bg-accent-green-light"
    },
    {
      title: "Private Speaking Engagement",
      excerpt: "Exclusive private session on women's health topics.",
      category: "Upcoming",
      duration: "Private Session",
      date: "August 21, 2026",
      location: "Private",
      icon: Calendar,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light"
    },
    {
      title: "Women's Health Event",
      excerpt: "Special speaking engagement focused on women's health and wellness.",
      category: "Upcoming",
      duration: "Keynote",
      date: "August 29, 2026",
      location: "TBD",
      icon: Award,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "Doctor Mums Facebook Webinar",
      excerpt: "Online webinar discussing women's health topics for mothers and healthcare professionals.",
      category: "Webinar",
      duration: "Webinar",
      date: "2025",
      location: "Virtual",
      icon: GraduationCap,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light"
    },
    {
      title: "Milton Keynes Women's Health Event",
      excerpt: "Women's health presentation in the UK.",
      category: "Conference",
      duration: "Presentation",
      date: "2025",
      location: "Milton Keynes, UK",
      icon: Mic,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "London Church Event",
      excerpt: "Community health education session at London Church.",
      category: "Community",
      duration: "Talk",
      date: "2025",
      location: "London, UK",
      icon: Heart,
      color: "text-accent-green", 
      bgColor: "bg-accent-green-light"
    },
    {
      title: "Pipeline PCEA Church",
      excerpt: "Health awareness talk at Pipeline PCEA Church.",
      category: "Community",
      duration: "Talk",
      date: "2025",
      location: "Nairobi, Kenya",
      icon: Users,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light"
    },
    {
      title: "Makadara Church",
      excerpt: "Women's health education session at Makadara Church.",
      category: "Community",
      duration: "Talk",
      date: "2025",
      location: "Nairobi, Kenya",
      icon: Heart,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "BLOOM Event",
      excerpt: "Speaking engagement at BLOOM women's empowerment event.",
      category: "Conference",
      duration: "Presentation",
      date: "2025",
      location: "Kenya",
      icon: Award,
      color: "text-accent-green",
      bgColor: "bg-accent-green-light"
    },
    {
      title: "PETALS Event",
      excerpt: "Women's health presentation at PETALS gathering.",
      category: "Conference",
      duration: "Presentation",
      date: "2025",
      location: "Kenya",
      icon: Target,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple-light"
    },
    {
      title: "UWEPA Event",
      excerpt: "Speaking engagement at UWEPA conference.",
      category: "Conference",
      duration: "Presentation",
      date: "2024",
      location: "Kenya",
      icon: Mic,
      color: "text-primary",
      bgColor: "bg-primary-light"
    }
  ];

  const speakingFormats = [
    {
      title: "Keynote Speeches",
      description: "Inspirational and educational presentations for conferences and large events",
      items: ["45-60 minute presentations", "Customizable topics", "Q&A sessions included", "Professional slide deck"]
    },
    {
      title: "Webinars",
      description: "Online sessions reaching global audiences with interactive engagement",
      items: ["Virtual delivery", "Global reach", "Interactive Q&A", "Recording available"]
    },
    {
      title: "Panel Discussions",
      description: "Expert insights and perspectives on healthcare topics and policy issues",
      items: ["Moderated discussions", "Multi-expert panels", "Audience engagement", "Current topics focus"]
    },
    {
      title: "Lectures",
      description: "Educational presentations for academic and professional settings",
      items: ["Research-based content", "Academic institutions", "Professional development", "Evidence-based"]
    },
    {
      title: "Workshops",
      description: "Interactive sessions designed for hands-on learning and skill development",
      items: ["2-4 hour sessions", "Small group settings", "Practical exercises", "Resource materials provided"]
    }
  ];

  const categories = [
    { name: "All", count: 11 },
    { name: "Upcoming", count: 3 },
    { name: "Past events", count: 8 }
  ];

  const filteredEngagements = filter === 'All' 
    ? speakingEngagements 
    : filter === 'Upcoming' 
      ? speakingEngagements.filter(e => e.category === 'Upcoming')
      : speakingEngagements.filter(e => e.category !== 'Upcoming');

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
                  className="w-full h-full object-cover object-top"
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
                  <li>• Obstetrics & Gynaecology</li>
                  <li>• Infertility</li>
                  <li>• Reproductive Hormones</li>
                  <li>• Menopause Management</li>
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
                  <li>• Contraception</li>
                  <li>• General Well-being</li>
                  <li>• Hormonal Health</li>
                  <li>• Working with Hormones</li>
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
                  <li>• Living Your Full Best Life</li>
                  <li>• Women's Health Advocacy</li>
                  <li>• Healthcare Education</li>
                  <li>• Community Empowerment</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Target Audience</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored presentations for diverse audiences across healthcare and community sectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Medical Professionals</h3>
              <p className="text-sm text-muted-foreground">Healthcare providers, specialists, and medical practitioners</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mx-auto mb-4 p-3 rounded-full bg-accent-green/10 w-fit">
                <Users className="h-6 w-6 text-accent-green" />
              </div>
              <h3 className="font-semibold mb-2">General Public</h3>
              <p className="text-sm text-muted-foreground">Community members seeking health education and awareness</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mx-auto mb-4 p-3 rounded-full bg-accent-purple/10 w-fit">
                <Briefcase className="h-6 w-6 text-accent-purple" />
              </div>
              <h3 className="font-semibold mb-2">Corporate Wellness</h3>
              <p className="text-sm text-muted-foreground">Organizations focused on employee health and wellness programs</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Students</h3>
              <p className="text-sm text-muted-foreground">Medical students and future healthcare professionals</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Credentials & Expertise */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Award className="h-4 w-4 mr-2" />
              Expertise
            </Badge>
            <h2 className="heading-secondary mb-4">Credentials & Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Established authority through extensive research, international presentations, and professional certifications
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <div className="p-4 rounded-full bg-accent-green-light w-fit mb-6">
                <Award className="h-8 w-8 text-accent-green" />
              </div>
              <h3 className="text-xl font-semibold mb-4">International Conference Speaker</h3>
              <p className="text-muted-foreground leading-relaxed">
                Presented research findings at major international conferences every year since 2004, establishing a strong track record of thought leadership in women's health.
              </p>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <div className="p-4 rounded-full bg-accent-purple-light w-fit mb-6">
                <GraduationCap className="h-8 w-8 text-accent-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trainer Certification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing advanced Trainer's certification with expected graduation in November 2026, enhancing ability to deliver impactful educational sessions.
              </p>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <div className="p-4 rounded-full bg-primary-light w-fit mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Certified Women's Coach</h3>
              <p className="text-muted-foreground leading-relaxed">
                Certified One of Many Women's Coach, bringing specialized coaching expertise to empower women in their personal and professional journeys.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Engagements */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Speaking Engagements</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Past and upcoming speaking events. Find more on <Link to="https://www.instagram.com/drdorcusmuchiri" target="_blank" className="text-primary hover:underline">@drdorcusmuchiri</Link>
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={filter === cat.name ? "default" : "outline"}
                onClick={() => setFilter(cat.name)}
                className={filter === cat.name ? "btn-medical" : ""}
              >
                {cat.name} ({cat.count})
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredEngagements.map((engagement, index) => (
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
                  
                  {/* <Button size="sm" className="btn-medical-soft w-full">
                    Book Similar Event
                  </Button> */}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


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