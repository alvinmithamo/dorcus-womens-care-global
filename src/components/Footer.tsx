import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white">Dr. Dorcus Muchiri</h3>
            <p className="text-sm text-white leading-relaxed">
              Dedicated to providing compassionate, evidence-based women's health care
              across Kenya and the United Kingdom.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/book-appointment" className="btn-medical-soft bg-white text-primary hover:text-white hover:bg-primary/90">
                <Calendar className="h-4 w-5 mr-2" />
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-white hover:text-black transition-colors">About Dr. Dorcus</Link></li>
              <li><Link to="/services" className="text-white hover:text-black transition-colors">Services</Link></li>
              <li><Link to="/book-appointment" className="text-white hover:text-black transition-colors">Book Appointment</Link></li>
              <li><Link to="/public-speaking" className="text-white hover:text-black transition-colors">Public Speaking</Link></li>
              <li><Link to="/contact" className="text-white hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Kenya Location */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Kenya Practice</h4>
            <div className="space-y-3 text-sm text-white">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-white shrink-0" />
                <div>
                  <p>Nairobi Women's Hospital</p>
                  <p>Adams Arcade, Ngong Road</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white shrink-0" />
                <span>+254 720 996444</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white shrink-0" />
                <span>info@drdorcusmuchiri.com</span>
              </div>
            </div>
          </div>

          {/* UK Location */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">UK Practice</h4>
            <div className="space-y-3 text-sm text-white">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-white shrink-0" />
                <div>
                  <p>Office 112, 94 London Road,</p>
                  <p>Headington, Oxford,</p>
                  <p>OX3 9FN, UK</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white shrink-0" />
                <span>+44 7729 241050</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white shrink-0" />
                <span>info@drdorcusmuchiri.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white">
              © 2026 Dr. Dorcus Muchiri. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-white hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookie-policy" className="text-white hover:text-black transition-colors">
                Cookie Policy
              </Link>
              {/* <Link to="/terms" className="text-white hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-white hover:text-primary transition-colors">
                Accessibility
              </Link> */}
            </div>
            <div className="text-sm text-white">
              Developed by <a href="https://sleeksolutions.africa" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><u>Sleek Solutions Africa</u> </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;