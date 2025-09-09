import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-soft text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-primary">Dr. Dorcus Muchiri</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dedicated to providing compassionate, evidence-based women's health care 
              across Kenya and the United Kingdom.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/appointments" className="btn-medical-soft text-sm">
                <Calendar className="h-4 w-5 mr-2" />
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Dr. Dorcus</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/appointments" className="text-muted-foreground hover:text-primary transition-colors">Book Appointment</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">Health Resources</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Kenya Location */}
          <div className="space-y-4">
            <h4 className="font-medium text-primary">Kenya Practice</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <p>Nairobi Women's Hospital</p>
                  <p>Adams Arcade, Ngong Road</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>info@drdorcusmuchiri.com</span>
              </div>
            </div>
          </div>

          {/* UK Location */}
          <div className="space-y-4">
            <h4 className="font-medium text-primary">UK Practice</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <p>Office 112, 94 London Road,</p>
                  <p>Headington, Oxford,</p>
                  <p>OX3 9FN, UK</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+44 7729 241050</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>info@drdorcusmuchiri.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 Dr. Dorcus Wamaitha Muchiri. All rights reserved.
            </div>
             
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Developed by <a href="https://alvinnganga.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Alvin Mithamo </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;