import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Telion Foods</h3>
            <p className="text-sm">
              Revolutionizing the rice industry through technology and community engagement.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="hover:text-secondary">Shop</Link></li>
              <li><Link to="/ricevest" className="hover:text-secondary">RiceVest</Link></li>
              <li><Link to="/competitions" className="hover:text-secondary">Competitions</Link></li>
              <li><Link to="/subscriptions" className="hover:text-secondary">Subscriptions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-secondary">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-secondary">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-secondary">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-secondary">Returns Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Telion Foods. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};